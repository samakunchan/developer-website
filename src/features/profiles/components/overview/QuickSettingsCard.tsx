import React from 'react';

export const QuickSettingsCard: React.FC = () => {
  return (
    <div className="card card--glass">
      <h4 className="card__subtitle card__item-spacing card__no-margin-top">Réglages rapides</h4>
      <div className="card__v-stack">
        <div className="settings-toggle">
          <span className="settings-toggle__label">Visibilité publique</span>
          <div className="settings-toggle__switch">
            <div className="settings-toggle__handle"></div>
          </div>
        </div>
        <div className="settings-toggle">
          <span className="settings-toggle__label">Disponible pour les missions</span>
          <div className="settings-toggle__switch">
            <div className="settings-toggle__handle"></div>
          </div>
        </div>
        <div className="settings-toggle settings-toggle--disabled">
          <span className="settings-toggle__label">Mode Développeur</span>
          <div className="settings-toggle__switch">
            <div className="settings-toggle__handle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
