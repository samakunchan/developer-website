import React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Trans } from '@lingui/react/macro';
import { useServerFn } from '@tanstack/react-start';
import { signOutAction } from '../features/auth/utils/auth-actions.functions';
import { Button } from './Button';
import packageJson from '../../package.json';
import { RouteNameType } from '../core/types/routes-name';
import { UnReadBadge } from '../features/messages/components/UnReadBadge';

type AdminPageType = {
  to: string;
  icon: string;
  label: React.ReactNode;
  exact?: boolean;
};

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

  const adminPages: AdminPageType[] = [
    {
      to: RouteNameType.AdminDashboard.toString(),
      icon: 'dashboard',
      label: <Trans>Dashboard</Trans>,
      exact: true,
    },
    {
      to: RouteNameType.AdminMessages.toString(),
      icon: 'message',
      label: <Trans>Messages</Trans>,
    },
    {
      to: RouteNameType.AdminProfileOverview.toString(),
      icon: 'account_circle',
      label: <Trans>Profiles</Trans>,
    },
    {
      to: RouteNameType.AdminProjects.toString(),
      icon: 'folder_special',
      label: <Trans>Projects</Trans>,
    },
    {
      to: RouteNameType.AdminAnalytics.toString(),
      icon: 'monitoring',
      label: <Trans>Analytics</Trans>,
    },
    {
      to: RouteNameType.AdminThemes.toString(),
      icon: 'settings',
      label: <Trans>Settings</Trans>,
    },
  ];
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__header">
        <Link to={RouteNameType.AdminDashboard.toString()} className="admin-sidebar__logo-container">
          <span className="material-symbols-outlined admin-sidebar__logo-icon">terminal</span>
          <h1 className="admin-sidebar__logo-text">PapangueSoft</h1>
        </Link>
        <p className="admin-sidebar__version">
          V {packageJson.version} {import.meta.env.MODE === 'production' ? '' : '- Dev'}
        </p>
      </div>

      <nav className="admin-sidebar__nav">
        {adminPages.map((page) => (
          <Link
            key={page.to}
            to={page.to}
            className="admin-sidebar__nav-link"
            activeProps={{ className: 'admin-sidebar__nav-link--active' }}
            activeOptions={page.exact ? { exact: true } : undefined}
          >
            <span className="material-symbols-outlined">{page.icon}</span>
            <span>{page.label}</span>
            {page.to === RouteNameType.AdminMessages.toString() && <UnReadBadge />}
          </Link>
        ))}
      </nav>

      <div className="admin-sidebar__footer">
        <div>
          <Button className="admin-sidebar__cta" onClick={handleLogout}>
            <Trans>Logout</Trans>
          </Button>
        </div>
      </div>
    </aside>
  );
};
