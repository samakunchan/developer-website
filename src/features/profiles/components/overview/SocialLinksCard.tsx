import React from 'react';
import { SocialLinkItem } from '../form/SocialLinksManager';

type SocialLinksCardProps = {
  links: SocialLinkItem[];
};

const PLATFORM_ICONS: Record<string, string> = {
  github: 'terminal',
  linkedin: 'share',
  upwork: 'work_history',
  malt: 'verified',
  email: 'alternate_email',
};

export const SocialLinksCard: React.FC<SocialLinksCardProps> = ({ links }) => {
  return (
    <div className="card card--glass">
      <h4 className="card__title">Presence & Connectivity</h4>
      <div className="social-list">
        {links.map((link: SocialLinkItem) => (
          <a key={link.id} href={link.url} className="social-item" target="_blank" rel="noopener noreferrer">
            <div className="social-item__content">
              <div className="social-item__icon-wrapper">
                <span className="material-symbols-outlined card__icon-md">{PLATFORM_ICONS[link.type] || 'link'}</span>
              </div>
              <span className="social-item__name">{link.name}</span>
            </div>
            <span className="material-symbols-outlined social-item__arrow">open_in_new</span>
          </a>
        ))}
        {links.length === 0 && <p className="admin-profiles__empty-state-text">No social links connected.</p>}
      </div>
    </div>
  );
};
