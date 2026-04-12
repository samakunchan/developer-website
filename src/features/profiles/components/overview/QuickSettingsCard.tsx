import React from 'react';

export const QuickSettingsCard: React.FC = () => {
  return (
    <div className="card card--glass">
      <h4 className="card__subtitle card__item-spacing card__no-margin-top">Quick Settings</h4>
      <div className="card__v-stack">
        <div className="settings-toggle">
          <span className="settings-toggle__label">Public Visibility</span>
          <div className="settings-toggle__switch">
            <div className="settings-toggle__handle"></div>
          </div>
        </div>
        <div className="settings-toggle">
          <span className="settings-toggle__label">Open to Freelance</span>
          <div className="settings-toggle__switch">
            <div className="settings-toggle__handle"></div>
          </div>
        </div>
        <div className="settings-toggle settings-toggle--disabled">
          <span className="settings-toggle__label">Developer Mode</span>
          <div className="settings-toggle__switch">
            <div className="settings-toggle__handle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
