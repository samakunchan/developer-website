import React, { useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trans } from '@lingui/react/macro';
import { projectSchema, ProjectInput } from '../../utils/schemas';
import { Button } from '../../../../components/Button';
import { uploadProjectImage, updateProject } from '../../utils/projects-actions.functions';
import { AdminSidebarImage } from './AdminSidebarImage';
import { IdentitySection, DetailsSection, VisualsSection, cleanProjectData, StatusBadge } from './ProjectFormSections';
import '../../../../styles/components/project-editor.css';

interface ProjectEditFormProps {
  initialData: ProjectInput & { id: number };
  onSuccess: () => void;
  onCancel: () => void;
}

export const ProjectEditForm: React.FC<ProjectEditFormProps> = ({ initialData, onSuccess, onCancel }) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    control,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      ...initialData,
      techIcons: initialData.techIcons || [],
      image: initialData.image || {
        medium: { url: '', alt: '' },
        raw: { url: '', alt: '' },
      },
    },
  });

  const uploadMutation = useMutation({
    mutationFn: uploadProjectImage,
    onSuccess: (result) => {
      if (result.success && result.urls) {
        setValue('image.medium.url', result.urls.medium.url, { shouldValidate: true });
        setValue('image.raw.url', result.urls.raw.url, { shouldValidate: true });

        const currentTitle = getValues('title');
        if (!getValues('image.medium.alt') && currentTitle) {
          setValue('image.medium.alt', currentTitle, { shouldValidate: true });
          setValue('image.raw.alt', currentTitle, { shouldValidate: true });
        }
      }
    },
    onError: (error) => {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['projects'] }),
        queryClient.invalidateQueries({ queryKey: ['projects', initialData.id] }),
      ]);
      onSuccess();
    },
    onError: (error) => {
      console.error('Error saving project:', error);
      alert('Error saving project');
    },
  });

  const status = useWatch({ control, name: 'status' });
  const mediumUrl = useWatch({ control, name: 'image.medium.url' });

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    uploadMutation.mutate({ data: formData });
  };

  const handleSave = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    const data = cleanProjectData(getValues());
    updateMutation.mutate({ data: { id: initialData.id, project: data } });
  };

  const isSubmitting = updateMutation.isPending;
  const isUploading = uploadMutation.isPending;

  return (
    <section className="card card--auto card--admin project-editor__container--main">
      <div className="project-editor__edit-layout">
        <div className="project-editor__form-column">
          <section>
            <h3 className="project-editor__section-title">
              <Trans>Project Identity</Trans>
            </h3>
            <IdentitySection register={register} errors={errors} setValue={setValue} />
          </section>
          <section>
            <h3 className="project-editor__section-title">
              <Trans>Technical Details</Trans>
            </h3>
            <DetailsSection register={register} errors={errors} setValue={setValue} control={control} />
          </section>
          <section>
            <h3 className="project-editor__section-title">
              <Trans>Status & Visibility</Trans>
            </h3>
            <VisualsSection register={register} errors={errors} setValue={setValue} />
          </section>
        </div>

        <AdminSidebarImage
          mediumUrl={mediumUrl || null}
          isUploading={isUploading}
          onUploadClick={handleUploadClick}
          onFileChange={handleFileChange}
          fileInputRef={fileInputRef}
        />
      </div>

      <div className="project-editor__actions-bar">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          <Trans>Cancel</Trans>
        </Button>

        <div className="project-editor__actions-right">
          <StatusBadge status={status || 'draft'} />
          <Button type="button" onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? <Trans>Saving...</Trans> : <Trans>Save Changes</Trans>}
          </Button>
        </div>
      </div>
    </section>
  );
};
