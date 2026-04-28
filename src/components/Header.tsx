import React from 'react';
import { Button } from './Button';
import { Link, UseNavigateResult, useNavigate } from '@tanstack/react-router';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';

export const Header: React.FC<{ isConnected?: boolean }> = ({ isConnected = false }) => {
  const navigate: UseNavigateResult<string> = useNavigate();
  return (
    <header className="header" role="banner">
      <div className="header__inner">
        <Link to="/" className="header__logo-container" aria-label={t`Freelance home page`} viewTransition>
          <span className="material-symbols-outlined header__logo-icon">terminal</span>
          <span className="header__logo-text">Freelance Dev</span>
        </Link>

        <nav aria-label={t`Main navigation`} className="header__nav" role="navigation">
          <ul className="header__nav-list">
            <li>
              <Link
                to="/projects"
                className="header__nav-link"
                activeProps={{
                  className: 'header__nav-link--active',
                }}
                viewTransition
              >
                <Trans>Projects</Trans>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="header__nav-link"
                activeProps={{ className: 'header__nav-link--active' }}
                viewTransition
              >
                <Trans>About</Trans>
              </Link>
            </li>

            {/* Route disabled until the backend is ready
            <li>
              <Link
                to="/services"
                className="header__nav-link"
                activeProps={{ className: 'header__nav-link--active' }}
                viewTransition
              >
                <Trans>Service&pricing</Trans>
              </Link>
            </li> */}
          </ul>
        </nav>

        <div className="header__actions">
          {isConnected && (
            <Button
              className="btn btn--secondary  hero__btn"
              name={t`Admin Dashboard`}
              onClick={() => navigate({ to: '/admin/dashboard' })}
            >
              <span className="material-symbols-outlined">admin_panel_settings</span>
            </Button>
          )}
          {/* {!isConnected && (
            <Link
              to="/login"
              className="header__nav-link"
              activeProps={{ className: 'header__nav-link--active' }}
              viewTransition
            >
              <Trans>Login</Trans>
            </Link>
          )} */}

          <Button variant="primary" aria-label={t`Contact me`}>
            <Trans>Contact</Trans>
          </Button>
        </div>
      </div>
    </header>
  );
};
