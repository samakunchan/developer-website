import React from 'react';
import { Trans } from '@lingui/react/macro';
import '../../../../styles/components/project-editor.css';

interface AdminSidebarImageProps {
  mediumUrl: string | null;
  isUploading: boolean;
  onUploadClick: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export const AdminSidebarImage: React.FC<AdminSidebarImageProps> = ({
  mediumUrl,
  isUploading,
  onUploadClick,
  onFileChange,
  fileInputRef,
}) => {
  return (
    <aside className="project-editor__preview-column project-editor__sidebar-right">
      <div className="project-editor__sidebar-card">
        <h3 className="project-editor__sidebar-title">
          <span className="material-symbols-outlined">image</span>
          <Trans>Project Visual</Trans>
        </h3>

        <div className="project-editor__upload-zone" onClick={() => onUploadClick()}>
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
              <div className="project-editor__upload-loading-spinner" />
              <span className="project-editor__upload-loading-text">
                <Trans>Uploading...</Trans>
              </span>
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
            <Trans>Quick Tips</Trans>
          </h4>
          <ul className="project-editor__tips-list">
            <li>
              <Trans>Recommended ratio: 3:2</Trans>
            </li>
            <li>
              <Trans>Max file size: 5MB</Trans>
            </li>
            <li>
              <Trans>Supported: JPG, PNG, WebP</Trans>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};
