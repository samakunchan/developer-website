import React from 'react';
import { t } from '@lingui/core/macro';
import { Button } from './Button';
import { useNavigate, type UseNavigateResult } from '@tanstack/react-router';
// import { ImageNetwork } from './ImageNetwork';
// import { ImageStatic } from './ImageStatic';

import { AdminSearchbar } from './AdminSearchbar';

interface AdminToolbarProps {
  tinyImage: string;
  fullName: string;
}

export const AdminToolbar: React.FC<AdminToolbarProps> = ({ tinyImage, fullName }) => {
  const navigate: UseNavigateResult<string> = useNavigate();

  return (
    <header className="admin-toolbar">
      <AdminSearchbar />

      <div className="admin-toolbar__actions">
        <Button name={t`Home`} onClick={() => navigate({ to: '/' })}>
          <span className="material-symbols-outlined">home</span>
        </Button>

        <div className="admin-toolbar__icons">
          <button className="admin-toolbar__icon-btn" aria-label={t`Notifications`}>
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="admin-toolbar__icon-btn" aria-label={t`Apps`}>
            <span className="material-symbols-outlined">apps</span>
          </button>
        </div>

        <div className="admin-toolbar__divider"></div>

        <div className="admin-toolbar__user">
          <span className="admin-toolbar__user-name">{fullName}</span>
          {tinyImage ? (
            <img src={tinyImage} alt={t`User profile`} className="admin-toolbar__avatar" width={40} height={40} />
          ) : (
            <div className="admin-toolbar__avatar-placeholder">
              <span className="material-symbols-outlined">person</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
