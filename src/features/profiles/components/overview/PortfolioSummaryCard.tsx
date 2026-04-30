import React from 'react';
import { Link } from '@tanstack/react-router';
import { RouteNameType } from '../../../../core/types/routes-name';

export const PortfolioSummaryCard: React.FC = () => {
  return (
    <div className="card card--primary card--auto">
      <span className="material-symbols-outlined card__subtitle card__icon-bg">grid_view</span>
      <div className="card__header">
        <span className="card__subtitle">Aperçu des projets</span>
        <h3 className="card__title card__title--large">Présenter votre travail</h3>
        <p className="card__description">
          Mettez en valeur vos meilleurs projets et démontrez votre expertise aux clients et partenaires potentiels.
        </p>
      </div>
      <div className="card__footer">
        <Link to={RouteNameType.AdminProjects.toString()} className="btn btn--secondary btn--white">
          Gérer mes projets
          <span className="material-symbols-outlined card__icon-sm admin-profiles__icon-right">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
};
