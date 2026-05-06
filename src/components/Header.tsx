import React, { useState } from 'react';
import { Button } from './Button';
import { Link, UseNavigateResult, useNavigate } from '@tanstack/react-router';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';
import { RouteNameType } from '../core/types/routes-name';

export const Header: React.FC<{ isConnected?: boolean }> = ({ isConnected = false }) => {
  const navigate: UseNavigateResult<string> = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = (
    <ul className="header__nav-list">
      <li>
        <Link
          to={RouteNameType.Projects.toString()}
          className="header__nav-link"
          activeProps={{
            className: 'header__nav-link--active',
          }}
          viewTransition
          onClick={closeMenu}
        >
          <Trans>Projects</Trans>
        </Link>
      </li>
      <li>
        <Link
          to={RouteNameType.AboutMe.toString()}
          className="header__nav-link"
          activeProps={{ className: 'header__nav-link--active' }}
          viewTransition
          onClick={closeMenu}
        >
          <Trans>About</Trans>
        </Link>
      </li>
    </ul>
  );

  const actions = (
    <>
      {isConnected && (
        <Button
          className="btn btn--secondary hero__btn"
          name={t`Admin Dashboard`}
          onClick={() => {
            navigate({ to: RouteNameType.AdminDashboard.toString() });
            closeMenu();
          }}
        >
          <span className="material-symbols-outlined">admin_panel_settings</span>
        </Button>
      )}

      <Link to={RouteNameType.ContactMe.toString()} viewTransition onClick={closeMenu}>
        <Button variant="primary" aria-label={t`Contact me`}>
          <Trans>Contact</Trans>
        </Button>
      </Link>
    </>
  );

  return (
    <header className={`header ${isMenuOpen ? 'header--open' : ''}`} role="banner">
      <div className="header__inner">
        <Link
          to={RouteNameType.Home.toString()}
          className="header__logo-container"
          aria-label={t`Freelance home page`}
          viewTransition
          onClick={closeMenu}
        >
          <span className="material-symbols-outlined header__logo-icon">terminal</span>
          <span className="header__logo-text">{import.meta.env.VITE_APP_NAME}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label={t`Main navigation`} className="header__nav header__nav--desktop" role="navigation">
          {navLinks}
        </nav>

        {/* Desktop Actions */}
        <div className="header__actions header__actions--desktop">{actions}</div>

        {/* Burger Button */}
        <button
          className="header__burger"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? t`Close menu` : t`Open menu`}
        >
          <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`header__mobile-menu ${isMenuOpen ? 'header__mobile-menu--open' : ''}`}>
        <nav aria-label={t`Mobile navigation`} className="header__nav header__nav--mobile">
          {navLinks}
        </nav>
        <div className="header__actions header__actions--mobile">{actions}</div>
      </div>
    </header>
  );
};
