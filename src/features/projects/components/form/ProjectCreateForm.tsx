import React, { useState, useRef, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const [projectId, setProjectId] = useState<number | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useMutation({
    mutationFn: (data: FormData) => uploadProjectImage({ data }),
  });

  const createMutation = useMutation({
    mutationFn: (data: ProjectInput) => createProject({ data }),
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setProjectId(newProject.id);
      onProjectCreated?.(newProject as unknown as ProjectType);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (args: { id: number; project: ProjectInput }) => updateProject({ data: args }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

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

  const isPending = uploadMutation.isPending || createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (!projectId && title) {
      setValue('slug', slugify(title), { shouldValidate: true });
    }
  }, [title, setValue, projectId]);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      const result = await uploadMutation.mutateAsync(formData);

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

    try {
      const data = cleanProjectData(getValues());

      if (step === 1) {
        if (!projectId) {
          await createMutation.mutateAsync({ ...data, status: 'draft' });
        } else {
          await updateMutation.mutateAsync({ id: projectId, project: data });
        }
        setStep(2);
      } else if (step === 2) {
        if (projectId) {
          await updateMutation.mutateAsync({ id: projectId, project: data });
        }
        setStep(3);
      }
    } catch (error) {
      console.error('Error in stepper transition:', error);
      alert('Failed to save step progress.');
    }
  };

  const handleFinalSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    try {
      const data = cleanProjectData(getValues());
      if (projectId) {
        await updateMutation.mutateAsync({ id: projectId, project: data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project');
    }
  };

  return (
    <section className="card card--auto card--light project-editor__container--main">
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
              isUploading={uploadMutation.isPending}
              onUploadClick={handleUploadClick}
              onFileChange={handleFileChange}
              fileInputRef={fileInputRef}
            />
          </div>
        )}
      </div>

      <div className="project-editor__actions-bar">
        <div className="project-editor__actions-group">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={() => setStep(step - 1)} disabled={isPending}>
              <Trans>Back</Trans>
            </Button>
          ) : (
            <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
              <Trans>Cancel</Trans>
            </Button>
          )}
        </div>

        <div className="project-editor__actions-right">
          {projectId && <StatusBadge status={status || 'draft'} />}
          {step < 3 ? (
            <Button type="button" onClick={goToNextStep} disabled={isPending}>
              {isPending ? <Trans>Saving...</Trans> : <Trans>Save & Next</Trans>}
            </Button>
          ) : (
            <Button type="button" onClick={handleFinalSubmit} disabled={isPending}>
              {isPending ? <Trans>Completing...</Trans> : <Trans>Complete & Save</Trans>}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
