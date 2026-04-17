import React, { useState, useRef, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@tanstack/react-router';
import { Trans } from '@lingui/react/macro';
import { projectSchema, ProjectInput, ProjectType } from '../../utils/schemas';
import { Button } from '../../../../components/Button';
import { slugify } from '../../../../core/utils/string';
import { uploadProjectImage, createProject, updateProject } from '../../utils/projects-actions.functions';
import {
  IdentitySection,
  DetailsSection,
  VisualsSection,
  ImagePreviewColumn,
  cleanProjectData,
  StatusBadge,
} from './ProjectFormSections';
import '../../../../styles/components/project-editor.css';

interface ProjectCreateFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  onProjectCreated?: (project: ProjectType) => void;
}

export const ProjectCreateForm: React.FC<ProjectCreateFormProps> = ({ onSuccess, onCancel, onProjectCreated }) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [projectId, setProjectId] = useState<number | undefined>();
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
      category: 'web',
      status: 'draft',
      techIcons: [],
      techStack: [],
      features: [],
      isFeatured: false,
    },
  });

  const title = useWatch({ control, name: 'title' });
  const status = useWatch({ control, name: 'status' });
  const mediumUrl = useWatch({ control, name: 'image.medium.url' });

  useEffect(() => {
    if (!projectId && title) {
      setValue('slug', slugify(title), { shouldValidate: true });
    }
  }, [title, setValue, projectId]);

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

  const goToNextStep = async () => {
    const fieldsToValidate: Array<keyof ProjectInput> = [];
    if (step === 1) {
      fieldsToValidate.push('title', 'description', 'category', 'categoryLabel', 'slug');
    } else if (step === 2) {
      fieldsToValidate.push('caseStudyNumber', 'techStack', 'features');
    }

    const isValid = await trigger(fieldsToValidate);
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      const data = cleanProjectData(getValues());

      if (step === 1) {
        if (!projectId) {
          const newProject = await createProject({ data: { ...data, status: 'draft' } });
          setProjectId(newProject.id);
          onProjectCreated?.(newProject);
        } else {
          await updateProject({ data: { id: projectId, project: data } });
        }
        await router.invalidate();
        setStep(2);
      } else if (step === 2) {
        if (projectId) {
          await updateProject({ data: { id: projectId, project: data } });
          await router.invalidate();
        }
        setStep(3);
      }
    } catch (error) {
      console.error('Error in stepper transition:', error);
      alert('Failed to save step progress.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinalSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      const data = cleanProjectData(getValues());
      if (projectId) {
        await updateProject({ data: { id: projectId, project: data } });
      } else {
        await createProject({ data });
      }
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
      <div className="project-stepper">
        {[1, 2, 3].map((s) => (
          <div key={s} className="project-stepper__step-container">
            <div
              className={`project-stepper__step ${step === s ? 'project-stepper__step--active' : ''} ${step > s ? 'project-stepper__step--completed' : ''}`}
            >
              {step > s ? <span className="material-symbols-outlined">check</span> : s}
            </div>
            <span className="project-stepper__label">
              {s === 1 && <Trans>Identity</Trans>}
              {s === 2 && <Trans>Details</Trans>}
              {s === 3 && <Trans>Visuals</Trans>}
            </span>
          </div>
        ))}
      </div>

      <div className="project-editor__step-container">
        {step === 1 && <IdentitySection register={register} errors={errors} setValue={setValue} />}
        {step === 2 && <DetailsSection register={register} errors={errors} setValue={setValue} control={control} />}
        {step === 3 && (
          <div className="project-editor__container">
            <section className="card card--auto card--light">
              <VisualsSection register={register} errors={errors} setValue={setValue} />
            </section>
            <ImagePreviewColumn
              mediumUrl={mediumUrl || null}
              isUploading={isUploading}
              onUploadClick={handleUploadClick}
              onFileChange={handleFileChange}
              fileInputRef={fileInputRef}
            />
          </div>
        )}
      </div>

      <div className="project-editor__actions-bar">
        <div style={{ display: 'flex', gap: '1rem' }}>
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={() => setStep(step - 1)} disabled={isSubmitting}>
              <Trans>Back</Trans>
            </Button>
          ) : (
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              <Trans>Cancel</Trans>
            </Button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {projectId && <StatusBadge status={status || 'draft'} />}
          {step < 3 ? (
            <Button type="button" onClick={goToNextStep} disabled={isSubmitting}>
              {isSubmitting ? <Trans>Saving...</Trans> : <Trans>Save & Next</Trans>}
            </Button>
          ) : (
            <Button type="button" onClick={handleFinalSubmit} disabled={isSubmitting}>
              {isSubmitting ? <Trans>Completing...</Trans> : <Trans>Complete & Save</Trans>}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
