import { createServerFn } from '@tanstack/react-start';
import { ProjectType } from './schemas';
import { getProjectsInternal, getProjectBySlugInternal, getProjectByIdInternal } from './projects-actions.server';

// TanStack Start Server Functions
export const getProjects = createServerFn({ method: 'GET' }).handler(async (): Promise<ProjectType[]> => {
  return await getProjectsInternal();
});

export const getProjectBySlug = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }): Promise<ProjectType | null> => {
    return await getProjectBySlugInternal(slug);
  });

export const getProjectById = createServerFn({ method: 'GET' })
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }): Promise<ProjectType | null> => {
    return await getProjectByIdInternal(id);
  });
