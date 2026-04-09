import React from 'react';
import { Link } from '@tanstack/react-router';

export interface AdminSidebarSecondaryLink {
  label: string;
  to: string;
}

interface AdminSidebarSecondaryProps {
  title?: string;
  links: AdminSidebarSecondaryLink[];
}

export const AdminSidebarSecondary: React.FC<AdminSidebarSecondaryProps> = ({ title, links }) => {
  return (
    <aside className="admin-sidebar-secondary">
      {title && <h2 className="admin-sidebar-secondary__title">{title}</h2>}
      <nav className="admin-sidebar-secondary__nav">
        {links.map((link: AdminSidebarSecondaryLink) => (
          <Link
            key={link.to}
            to={link.to}
            className="admin-sidebar-secondary__nav-link"
            activeProps={{ className: 'admin-sidebar-secondary__nav-link--active' }}
          >
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
