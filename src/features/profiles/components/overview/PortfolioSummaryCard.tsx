import React from 'react';
import { Link } from '@tanstack/react-router';

export const PortfolioSummaryCard: React.FC = () => {
  return (
    <div className="card card--primary card--auto">
      <span className="material-symbols-outlined card__subtitle card__icon-bg">grid_view</span>
      <div className="card__header">
        <span className="card__subtitle">Portfolio Overview</span>
        <h3 className="card__title card__title--large">Showcase Your Work</h3>
        <p className="card__description">
          Highlight your best projects and demonstrate your expertise to potential clients and partners.
        </p>
      </div>
      <div className="card__footer">
        <Link to="/admin/projects" className="btn btn--secondary btn--white">
          Manage Portfolio
          <span className="material-symbols-outlined card__icon-sm" style={{ marginLeft: '0.5rem' }}>
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
};
