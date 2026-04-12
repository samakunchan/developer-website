import React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Trans } from '@lingui/react/macro';
import { useServerFn } from '@tanstack/react-start';
import { signOutAction } from '../features/auth/utils/auth-actions.functions';
import { Button } from './Button';

export const AdminSidebarPrimary: React.FC = () => {
  const signOut = useServerFn(signOutAction);
  const navigate = useNavigate();

  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const result: { success: boolean } = await signOut();

      if (result?.success) {
        // After successful signin, redirect to the dashboard or the requested page
        navigate({ to: '/' });
      }
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__header">
        <Link to="/admin/dashboard" className="admin-sidebar__logo-container">
          <span className="material-symbols-outlined admin-sidebar__logo-icon">terminal</span>
          <h1 className="admin-sidebar__logo-text">DevSuite</h1>
        </Link>
        <p className="admin-sidebar__version">V 1.0.4</p>
      </div>

      <nav className="admin-sidebar__nav">
        <Link
          to="/admin/dashboard"
          className="admin-sidebar__nav-link"
          activeProps={{ className: 'admin-sidebar__nav-link--active' }}
          activeOptions={{ exact: true }}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span>
            <Trans>Dashboard</Trans>
          </span>
        </Link>

        <Link
          to="/admin/profiles/overview"
          className="admin-sidebar__nav-link"
          activeProps={{ className: 'admin-sidebar__nav-link--active' }}
        >
          <span className="material-symbols-outlined">account_circle</span>
          <span>
            <Trans>Profiles</Trans>
          </span>
        </Link>

        <Link
          to="/admin/projects"
          className="admin-sidebar__nav-link"
          activeProps={{ className: 'admin-sidebar__nav-link--active' }}
        >
          <span className="material-symbols-outlined">folder_special</span>
          <span>
            <Trans>Projects</Trans>
          </span>
        </Link>

        <Link
          to="/admin/analytics"
          className="admin-sidebar__nav-link"
          activeProps={{ className: 'admin-sidebar__nav-link--active' }}
        >
          <span className="material-symbols-outlined">monitoring</span>
          <span>
            <Trans>Analytics</Trans>
          </span>
        </Link>

        <Link
          to="/admin/settings/themes"
          className="admin-sidebar__nav-link"
          activeProps={{ className: 'admin-sidebar__nav-link--active' }}
        >
          <span className="material-symbols-outlined">settings</span>
          <span>
            <Trans>Settings</Trans>
          </span>
        </Link>
      </nav>

      <div className="admin-sidebar__footer">
        <div>
          <Button className="admin-sidebar__cta" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};
