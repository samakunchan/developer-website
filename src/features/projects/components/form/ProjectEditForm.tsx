import React, { useState, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@tanstack/react-router';
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
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const status = useWatch({ control, name: 'status' });
  const mediumUrl = useWatch({ control, name: 'image.medium.url' });

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const result = await uploadProjectImage({ data: formData });

      if (result.success && result.urls) {
        setValue('image.medium.url', result.urls.medium.url, { shouldValidate: true });
        setValue('image.raw.url', result.urls.raw.url, { shouldValidate: true });

        const currentTitle = getValues('title');
        if (!getValues('image.medium.alt') && currentTitle) {
          setValue('image.medium.alt', currentTitle, { shouldValidate: true });
          setValue('image.raw.alt', currentTitle, { shouldValidate: true });
        }
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      const data = cleanProjectData(getValues());
      await updateProject({ data: { id: initialData.id, project: data } });
      await router.invalidate();
      onSuccess();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="card card--auto card--light"
      style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}
    >
      <div className="project-editor__edit-layout">
        <div className="project-editor__form-column" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
              <Trans>Project Identity</Trans>
            </h3>
            <IdentitySection register={register} errors={errors} setValue={setValue} />
          </section>
          <section>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
              <Trans>Technical Details</Trans>
            </h3>
            <DetailsSection register={register} errors={errors} setValue={setValue} control={control} />
          </section>
          <section>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <StatusBadge status={status || 'draft'} />
          <Button type="button" onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? <Trans>Saving...</Trans> : <Trans>Save Changes</Trans>}
          </Button>
        </div>
      </div>
    </section>
  );
};
