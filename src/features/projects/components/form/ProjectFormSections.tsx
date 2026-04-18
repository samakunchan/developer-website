import React from 'react';
import { UseFormRegister, FieldErrors, UseFormSetValue, Control, useFieldArray } from 'react-hook-form';
import { Trans } from '@lingui/react/macro';
import { ProjectInput } from '../../utils/schemas';
import { Button } from '../../../../components/Button';

interface SectionProps {
  register: UseFormRegister<ProjectInput>;
  errors: FieldErrors<ProjectInput>;
  setValue: UseFormSetValue<ProjectInput>;
}

export const IdentitySection: React.FC<SectionProps> = ({ register, errors }) => (
  <div className="admin-profiles__form-grid">
    <div className="admin-profiles__form-group">
      <label className="admin-profiles__form-label">
        <Trans>Title</Trans> *
      </label>
      <input {...register('title')} className="admin-profiles__form-input" placeholder="Project name" />
      {errors.title && <span className="text-error text-xs">{errors.title.message}</span>}
    </div>
    <div className="admin-profiles__form-group">
      <label className="admin-profiles__form-label">
        <Trans>Slug</Trans> *
      </label>
      <input {...register('slug')} className="admin-profiles__form-input" />
      {errors.slug && <span className="text-error text-xs">{errors.slug.message}</span>}
    </div>
    <div className="admin-profiles__form-group admin-profiles__form-grid-full">
      <label className="admin-profiles__form-label">
        <Trans>Description</Trans>
      </label>
      <textarea
        {...register('description')}
        className="admin-profiles__form-textarea"
        rows={3}
        placeholder="Project overview..."
      />
      {errors.description && <span className="text-error text-xs">{errors.description.message}</span>}
    </div>
    <div className="admin-profiles__form-group">
      <label className="admin-profiles__form-label">
        <Trans>Category</Trans>
      </label>
      <select {...register('category')} className="admin-profiles__form-select">
        <option value="web">Web</option>
        <option value="mobile">Mobile</option>
        <option value="open_source">Open Source</option>
      </select>
    </div>
    <div className="admin-profiles__form-group">
      <label className="admin-profiles__form-label">
        <Trans>Category Label (Display)</Trans>
      </label>
      <input {...register('categoryLabel')} className="admin-profiles__form-input" placeholder="e.g. Web Apps" />
      {errors.categoryLabel && <span className="text-error text-xs">{errors.categoryLabel.message}</span>}
    </div>
  </div>
);

interface DetailsSectionProps extends SectionProps {
  control: Control<ProjectInput>;
}

export const DetailsSection: React.FC<DetailsSectionProps> = ({ register, control }) => {
  const { fields: techFields, append: appendTech, remove: removeTech } = useFieldArray({ control, name: 'techStack' });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({ control, name: 'features' });

  return (
    <div className="admin-profiles__form-grid">
      <div className="admin-profiles__form-group">
        <label className="admin-profiles__form-label">
          <Trans>Case Study Number</Trans>
        </label>
        <input {...register('caseStudyNumber')} className="admin-profiles__form-input" placeholder="01" />
      </div>

      <div className="admin-profiles__form-grid-full">
        <div className="project-editor__field-array-header">
          <label className="admin-profiles__form-label">
            <Trans>Tech Stack</Trans>
          </label>
          <Button
            type="button"
            variant="outline"
            className="project-editor__field-array-btn"
            onClick={() => appendTech({ name: '', icon: '' })}
          >
            + Add Tech
          </Button>
        </div>
        <div className="project-editor__field-array-container">
          {techFields.map((field, index) => (
            <div key={field.id} className="project-editor__field-array-row">
              <div className="project-editor__field-array-cell">
                <input
                  {...register(`techStack.${index}.name`)}
                  placeholder="Name (e.g. React)"
                  className="admin-profiles__form-input"
                />
              </div>
              <div className="project-editor__field-array-cell">
                <input
                  {...register(`techStack.${index}.icon`)}
                  placeholder="Icon Name"
                  className="admin-profiles__form-input"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                className="project-editor__delete-btn"
                onClick={() => removeTech(index)}
              >
                <span className="material-symbols-outlined">delete</span>
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-profiles__form-grid-full">
        <div className="project-editor__field-array-header">
          <label className="admin-profiles__form-label">
            <Trans>Key Features</Trans>
          </label>
          <Button
            type="button"
            variant="outline"
            className="project-editor__field-array-btn"
            onClick={() => appendFeature({ icon: '', title: '', description: '' })}
          >
            + Add Feature
          </Button>
        </div>
        <div className="project-editor__field-array-container">
          {featureFields.map((field, index) => (
            <div key={field.id} className="card project-editor__feature-card">
              <div className="project-editor__feature-card-header">
                <Button
                  type="button"
                  variant="outline"
                  className="project-editor__delete-btn"
                  onClick={() => removeFeature(index)}
                >
                  <span className="material-symbols-outlined">delete</span>
                </Button>
              </div>
              <div className="admin-profiles__form-grid project-editor__feature-grid">
                <div className="admin-profiles__form-group">
                  <label className="admin-profiles__form-label">Icon</label>
                  <input {...register(`features.${index}.icon`)} className="admin-profiles__form-input" />
                </div>
                <div className="admin-profiles__form-group">
                  <label className="admin-profiles__form-label">Title</label>
                  <input {...register(`features.${index}.title`)} className="admin-profiles__form-input" />
                </div>
                <div className="admin-profiles__form-group admin-profiles__form-grid-full">
                  <label className="admin-profiles__form-label">Description</label>
                  <textarea
                    {...register(`features.${index}.description`)}
                    className="admin-profiles__form-textarea"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const VisualsSection: React.FC<SectionProps> = ({ register, setValue }) => (
  <div className="admin-profiles__form-grid">
    <div className="admin-profiles__form-group">
      <label className="admin-profiles__form-label">
        <Trans>Status</Trans>
      </label>
      <select {...register('status')} className="admin-profiles__form-select">
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="unpublished">Unpublished</option>
        <option value="archived">Archived</option>
      </select>
    </div>
    <div className="admin-profiles__form-group project-editor__checkbox-group">
      <input type="checkbox" {...register('isFeatured')} id="isFeatured" />
      <label htmlFor="isFeatured" className="admin-profiles__form-label project-editor__checkbox-label">
        <Trans>Feature this project</Trans>
      </label>
    </div>
    <div className="admin-profiles__form-group admin-profiles__form-grid-full">
      <label className="admin-profiles__form-label">
        <Trans>Alt Text (SEO)</Trans>
      </label>
      <input
        {...register('image.medium.alt')}
        className="admin-profiles__form-input"
        placeholder="Describe the image..."
        onChange={(e) => {
          setValue('image.medium.alt', e.target.value);
          setValue('image.raw.alt', e.target.value);
        }}
      />
    </div>
  </div>
);

interface ImagePreviewProps {
  mediumUrl: string | null;
  isUploading: boolean;
  onUploadClick: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export const ImagePreviewColumn: React.FC<ImagePreviewProps> = ({
  mediumUrl,
  isUploading,
  onUploadClick,
  onFileChange,
  fileInputRef,
}) => (
  <aside className="project-editor__preview-column">
    <div className="project-editor__upload-zone" onClick={onUploadClick}>
      {mediumUrl ? (
        <img src={mediumUrl} alt="Preview" className="project-editor__preview-image" />
      ) : (
        <>
          <span className="material-symbols-outlined project-editor__upload-icon">add_photo_alternate</span>
          <span className="project-editor__upload-text">
            <Trans>Click to upload image</Trans>
          </span>
        </>
      )}
      {isUploading && (
        <div className="project-editor__upload-loading">
          <span className="material-symbols-outlined project-editor__upload-loading-spinner">sync</span>
        </div>
      )}
      {!isUploading && mediumUrl && (
        <div className="project-editor__upload-overlay">
          <span className="material-symbols-outlined project-editor__upload-icon">edit</span>
          <span className="project-editor__upload-text">
            <Trans>Change Image</Trans>
          </span>
        </div>
      )}
    </div>
    <input
      type="file"
      ref={fileInputRef}
      onChange={onFileChange}
      accept="image/*"
      className="project-editor__file-input"
    />
    <div className="project-editor__tips project-editor__tips-card">
      <h4 className="project-editor__tips-header">
        <span className="material-symbols-outlined project-editor__tips-icon">info</span>
        Quick Tips
      </h4>
      <ul className="project-editor__tips-list">
        <li>Recommended ratio: 3:2</li>
        <li>Max file size: 5MB</li>
        <li>Supported: JPG, PNG, WebP</li>
      </ul>
    </div>
  </aside>
);

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <div className={`project-editor__status-badge project-editor__status-badge--${status}`}>
    <span className="material-symbols-outlined project-editor__status-icon">
      {status === 'published' ? 'check_circle' : 'pending'}
    </span>
    {status}
  </div>
);

export const cleanProjectData = (allValues: ProjectInput): ProjectInput => {
  return {
    ...allValues,
    image: allValues.image?.medium?.url ? allValues.image : undefined,
    techStack: (allValues.techStack || []).filter((t) => t.name.trim() !== '' || t.icon.trim() !== ''),
    features: (allValues.features || []).filter(
      (f) => f.title.trim() !== '' || f.description.trim() !== '' || f.icon.trim() !== '',
    ),
  };
};
