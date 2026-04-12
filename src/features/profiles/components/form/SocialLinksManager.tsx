import React, { useState } from 'react';
import { SocialLinkTypeEnum, SocialLinkInput } from '../../utils/schemas';
import { z } from 'zod';

type SocialLinkType = z.infer<typeof SocialLinkTypeEnum>;

export type SocialLinkItem = {
  id: number;
  name: string;
  url: string;
  icon: string;
  type: SocialLinkType;
};

type SocialLinksManagerProps = {
  links: SocialLinkItem[];
  onAdd: (data: SocialLinkInput) => void;
  onRemove: (id: number) => void;
};

const PLATFORMS: { value: SocialLinkType; label: string; icon: string }[] = [
  { value: 'github', label: 'GitHub', icon: 'terminal' },
  { value: 'linkedin', label: 'LinkedIn', icon: 'share' },
  { value: 'upwork', label: 'Upwork', icon: 'work_history' },
  { value: 'malt', label: 'Malt', icon: 'verified' },
  { value: 'email', label: 'Professional Email', icon: 'alternate_email' },
];

export const SocialLinksManager: React.FC<SocialLinksManagerProps> = ({ links, onAdd, onRemove }) => {
  const [formData, setFormData] = useState<SocialLinkInput>({
    name: '',
    url: '',
    type: 'github',
    icon: 'link',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (formData.name && formData.url) {
      onAdd(formData);
      setFormData({
        name: '',
        url: '',
        type: 'github',
        icon: 'link',
      });
    }
  };

  return (
    <div className="admin-profiles__v-stack">
      {/* Add New Link Card */}
      <section className="card card--light">
        <div className="card__header">
          <h3 className="card__title">Add Professional Link</h3>
        </div>

        <form onSubmit={handleSubmit} className="admin-profiles__form-grid admin-profiles__card-item-spacing">
          <div className="admin-profiles__form-group">
            <label className="admin-profiles__form-label">Link Label</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="admin-profiles__form-input"
              placeholder="e.g. GitHub Profile"
              required
            />
          </div>

          <div className="admin-profiles__form-group">
            <label className="admin-profiles__form-label">Platform Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="admin-profiles__form-select"
            >
              {PLATFORMS.map((platform) => (
                <option key={platform.value} value={platform.value}>
                  {platform.label}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-profiles__form-group admin-profiles__form-grid-full">
            <label className="admin-profiles__form-label">URL</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              className="admin-profiles__form-input"
              placeholder="https://..."
              required
            />
          </div>

          <div className="admin-profiles__form-grid-full admin-profiles__form-actions">
            <button type="submit" className="btn btn--primary">
              <span className="material-symbols-outlined">add</span>
              Save Social Link
            </button>
          </div>
        </form>
      </section>

      {/* List Existing Links */}
      <div className="admin-profiles__grid">
        {links.map((link: SocialLinkItem) => (
          <a key={link.id} href={link.url} className="social-item" target="_blank" rel="noopener noreferrer">
            <div className="social-item__content">
              <div className="social-item__icon-wrapper">
                <span className="material-symbols-outlined card__icon-md">
                  {PLATFORMS.find((p) => p.value === link.type)?.icon || 'link'}
                </span>
              </div>
              <span className="social-item__name">{link.name}</span>
              <span className="material-symbols-outlined social-item__arrow">open_in_new</span>
              <span className="social-item__description">{link.url}</span>
            </div>
            <div>
              <button
                className="material-symbols-outlined social-manager__delete-btn"
                onClick={() => onRemove(link.id)}
              >
                delete
              </button>
            </div>
          </a>
        ))}
        {links.length === 0 && (
          <div className="admin-profiles__form-grid-full admin-profiles__empty-state">
            <span className="material-symbols-outlined social-manager__empty-icon">contact_support</span>
            <p className="social-manager__empty-text">No social links added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
