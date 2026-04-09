import React from 'react';
import { t } from '@lingui/core/macro';
import { Button } from './Button';
import { useNavigate, type UseNavigateResult } from '@tanstack/react-router';

export const AdminToolbar: React.FC = () => {
  const navigate: UseNavigateResult<string> = useNavigate();
  return (
    <header className="admin-toolbar">
      <div className="admin-toolbar__search">
        <span className="material-symbols-outlined admin-toolbar__search-icon">search</span>
        <input
          type="text"
          className="admin-toolbar__search-input"
          placeholder={t`Search tasks, code, or projects...`}
        />
      </div>

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
          <span className="admin-toolbar__user-name">Alex Dev</span>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnxUSu47Vp-I9wnl33B443FbAlIF2hD2MheN_Z1XDSoyDj58l77URcdOJIA1T2_P3lH4g2E8Bjm7UZV0KsbrFeO4aRsSWYaYG8EZc8aHifiGl0_sbzhrvAP0n4qy9CAUOgH_a_MovstDCo152Lw-eSpxwfVIJPVDHWIkoMFC-k9XVM4Iqcj6K8vK0K79NMEQqZkG_pRWWypmBrfTz3MszI2vyrj2xyCo_aXPGN6qMgK_auaUGKtjVIY4A9SSEjg5r6jJG9PA6z4-E"
            alt={t`User profile`}
            className="admin-toolbar__avatar"
          />
        </div>
      </div>
    </header>
  );
};
