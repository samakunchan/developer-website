import React from 'react';
import { Button } from './Button';
import { Link } from '@tanstack/react-router';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <Link
          to="/"
          className="header__logo-container"
          aria-label={t`Freelance home page`}
        >
          <span className="material-symbols-outlined header__logo-icon">
            terminal
          </span>
          <span className="header__logo-text">Freelance Dev</span>
        </Link>

        <nav aria-label={t`Main navigation`} className="header__nav">
          <ul className="header__nav-list">
            <li>
              <Link
                to="/"
                className="header__nav-link"
                activeProps={{
                  className: 'header__nav-link--active',
                }}
                hash={t`Expertise`}
              >
                <Trans>Expertise</Trans>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="header__nav-link"
                activeProps={{ className: 'header__nav-link--active' }}
                hash={t`Projets`}
              >
                <Trans>Projets</Trans>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="header__nav-link"
                activeProps={{ className: 'header__nav-link--active' }}
                hash={t`Process`}
              >
                <Trans>Process</Trans>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          <Button variant="primary" aria-label={t`Contact me`}>
            <Trans>Contact</Trans>
          </Button>
        </div>
      </div>
    </header>
  );
};
