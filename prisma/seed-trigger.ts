import { db } from '../src/features/database/server/db.server';

async function main() {
  console.log('🔄 Applying PostgreSQL functions and triggers for GlobalSearchIndex...');

  try {
    // 1. Projects Trigger
    await db.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION index_project_trigger()
      RETURNS TRIGGER AS $$
      DECLARE
          content_text TEXT;
          tech_stack_text TEXT := '';
          features_text TEXT := '';
      BEGIN
          IF NEW."techStack" IS NOT NULL AND jsonb_typeof(NEW."techStack"::jsonb) = 'array' THEN
            SELECT COALESCE(string_agg(obj->>'name', ' '), '') INTO tech_stack_text
            FROM jsonb_array_elements(NEW."techStack"::jsonb) AS obj
            WHERE obj ? 'name';
          END IF;

          IF NEW.features IS NOT NULL AND jsonb_typeof(NEW.features::jsonb) = 'array' THEN
            SELECT COALESCE(string_agg((obj->>'title') || ' ' || (obj->>'description'), ' '), '') INTO features_text
            FROM jsonb_array_elements(NEW.features::jsonb) AS obj
            WHERE obj ? 'title' AND obj ? 'description';
          END IF;

          content_text := COALESCE(NEW.title, '') || ' ' || COALESCE(NEW.description, '') || ' ' || COALESCE(NEW."categoryLabel", '') || ' ' || tech_stack_text || ' ' || features_text;

          INSERT INTO global_search_indices ("itemId", "itemType", "content", "category", "embedding", "createdAt", "updatedAt")
          VALUES (NEW.id, 'project', content_text, NEW.category::text, NULL, NOW(), NOW())
          ON CONFLICT ("itemId", "itemType")
          DO UPDATE SET content = EXCLUDED.content, category = EXCLUDED.category, embedding = NULL, "updatedAt" = NOW();

          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await db.$executeRawUnsafe(`DROP TRIGGER IF EXISTS project_search_index_on_insert_update ON projects;`);
    await db.$executeRawUnsafe(`
      CREATE TRIGGER project_search_index_on_insert_update
      AFTER INSERT OR UPDATE ON projects
      FOR EACH ROW
      EXECUTE FUNCTION index_project_trigger();
    `);

    console.log('✅ Project triggers applied successfully.');

    // 2. User Profiles Unified Sync Function
    await db.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION update_user_search_index(target_user_id INT)
      RETURNS VOID AS $$
      DECLARE
          content_text TEXT;
          u_name TEXT;
          u_email TEXT;
          u_role TEXT;
          pi_title TEXT;
          pi_bio TEXT;
          tech_stacks_text TEXT;
      BEGIN
          SELECT name, email, role::text INTO u_name, u_email, u_role FROM users WHERE id = target_user_id;
          IF NOT FOUND THEN
              RETURN;
          END IF;

          SELECT "professionalTitle", bio INTO pi_title, pi_bio FROM personal_informations WHERE "userId" = target_user_id;
          
          SELECT COALESCE(string_agg(name, ' '), '') INTO tech_stacks_text FROM tech_stacks WHERE "userId" = target_user_id;

          content_text := COALESCE(u_name, '') || ' ' || COALESCE(u_email, '') || ' ' || COALESCE(u_role, '') || ' ' || COALESCE(pi_title, '') || ' ' || COALESCE(pi_bio, '') || ' ' || COALESCE(tech_stacks_text, '');

          INSERT INTO global_search_indices ("itemId", "itemType", "content", "category", "embedding", "createdAt", "updatedAt")
          VALUES (target_user_id, 'user', content_text, 'profile', NULL, NOW(), NOW())
          ON CONFLICT ("itemId", "itemType")
          DO UPDATE SET content = EXCLUDED.content, embedding = NULL, "updatedAt" = NOW();
      END;
      $$ LANGUAGE plpgsql;
    `);

    // 3. User Trigger
    await db.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION user_search_index_trigger() RETURNS TRIGGER AS $$
      BEGIN
          PERFORM update_user_search_index(NEW.id);
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await db.$executeRawUnsafe(`DROP TRIGGER IF EXISTS user_search_index_on_insert_update ON users;`);
    await db.$executeRawUnsafe(`
      CREATE TRIGGER user_search_index_on_insert_update
      AFTER INSERT OR UPDATE ON users
      FOR EACH ROW
      EXECUTE FUNCTION user_search_index_trigger();
    `);

    console.log('✅ User triggers applied successfully.');

    // 4. Personal Information Trigger
    await db.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION pi_search_index_trigger() RETURNS TRIGGER AS $$
      BEGIN
          PERFORM update_user_search_index(NEW."userId");
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await db.$executeRawUnsafe(`DROP TRIGGER IF EXISTS pi_search_index_on_insert_update ON personal_informations;`);
    await db.$executeRawUnsafe(`
      CREATE TRIGGER pi_search_index_on_insert_update
      AFTER INSERT OR UPDATE ON personal_informations
      FOR EACH ROW
      EXECUTE FUNCTION pi_search_index_trigger();
    `);

    console.log('✅ Personal Information triggers applied successfully.');

    // 5. Tech Stack Trigger
    await db.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION tech_stack_search_trigger() RETURNS TRIGGER AS $$
      BEGIN
          IF TG_OP = 'DELETE' THEN
              PERFORM update_user_search_index(OLD."userId");
              RETURN OLD;
          ELSE
              PERFORM update_user_search_index(NEW."userId");
              RETURN NEW;
          END IF;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await db.$executeRawUnsafe(`DROP TRIGGER IF EXISTS tech_stack_search_on_insert_update_delete ON tech_stacks;`);
    await db.$executeRawUnsafe(`
      CREATE TRIGGER tech_stack_search_on_insert_update_delete
      AFTER INSERT OR UPDATE OR DELETE ON tech_stacks
      FOR EACH ROW
      EXECUTE FUNCTION tech_stack_search_trigger();
    `);

    console.log('✅ Tech Stack triggers applied successfully.');
    console.log('🎉 All search triggers configured successfully!');
  } catch (error) {
    console.error('❌ Error configuring triggers:', error);
  } finally {
    await db.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
