import React from 'react';
import { Button } from './Button';
import { Link } from '@tanstack/react-router';
import { Trans } from '@lingui/react/macro';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-primary"
          aria-label="Freelance Dev Home"
        >
          <span className="material-symbols-outlined text-3xl">terminal</span>
          <span className="text-xl font-bold tracking-tight">
            Freelance Dev
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-10"
        >
          <ul className="flex items-center gap-10">
            <li>
              <Link
                to="/"
                className="text-sm font-medium hover:text-primary transition-colors"
                activeProps={{ className: 'text-primary' }}
              >
                <Trans>Expertise</Trans>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-sm font-medium hover:text-primary transition-colors"
                activeProps={{ className: 'text-primary' }}
              >
                <Trans>Projets</Trans>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-sm font-medium hover:text-primary transition-colors"
                activeProps={{ className: 'text-primary' }}
              >
                <Trans>Process</Trans>
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <Button
            className="bg-primary hover:bg-primary/90 text-background-dark px-6 py-2 rounded-lg text-sm font-bold transition-all"
            aria-label="Contact me"
          >
            <Trans>Contact</Trans>
          </Button>
        </div>
      </div>
    </header>
  );
};
