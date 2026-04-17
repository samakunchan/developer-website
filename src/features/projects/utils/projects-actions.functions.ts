import { createServerFn } from '@tanstack/react-start';
import { ProjectInput, ProjectType } from './schemas';
import {
  getProjectsInternal,
  getProjectBySlugInternal,
  createProjectInternal,
  updateProjectInternal,
  deleteProjectInternal,
  toggleProjectFeaturedInternal,
  uploadProjectImageInternal,
  getProjectByIdInternal,
} from './projects-actions.server';

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

export const createProject = createServerFn({ method: 'POST' })
  .inputValidator((data: ProjectInput) => data)
  .handler(async ({ data }) => {
    return await createProjectInternal(data);
  });

export const updateProject = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: number; project: ProjectInput }) => data)
  .handler(async ({ data }) => {
    return await updateProjectInternal(data.id, data.project);
  });

export const deleteProject = createServerFn({ method: 'POST' })
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }) => {
    return await deleteProjectInternal(id);
  });

export const toggleProjectFeatured = createServerFn({ method: 'POST' })
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }) => {
    return await toggleProjectFeaturedInternal(id);
  });

export const uploadProjectImage = createServerFn({ method: 'POST' })
  .inputValidator((data: FormData) => data)
  .handler(async ({ data }) => {
    return await uploadProjectImageInternal(data);
  });
