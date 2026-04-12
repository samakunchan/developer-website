import React from 'react';
import { Trans } from '@lingui/react/macro';
import { Button } from './Button';

interface PricingTierProps {
  name: React.ReactNode;
  description: React.ReactNode;
  price?: string;
  priceSuffix: React.ReactNode;
  features: { text: React.ReactNode; included: boolean }[];
  buttonText: React.ReactNode;
  isPopular?: boolean;
}

const PricingTier: React.FC<PricingTierProps> = ({
  name,
  description,
  price,
  priceSuffix,
  features,
  buttonText,
  isPopular,
}) => {
  return (
    <div className={`card ${isPopular ? 'card--primary card--popular' : ''}`}>
      {isPopular && (
        <div className="card__badge">
          <Trans>Most Popular</Trans>
        </div>
      )}
      <div className="card__header">
        <h4 className="card__title">{name}</h4>
        <p className="card__description">{description}</p>
      </div>
      <div className="card__body">
        {price != null ? (
          <div className="card__price">
            {price}
            <span>{priceSuffix}</span>
          </div>
        ) : (
          <div className="card__price"></div>
        )}
        <ul className="card__list">
          {features.map((feature, index) => (
            <li key={index} className={`card__list-item ${!feature.included ? 'card__list-item--disabled' : ''}`}>
              <span className="material-symbols-outlined">{feature.included ? 'check_circle' : 'cancel'}</span>
              {feature.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="card__footer">
        <Button variant={isPopular ? 'primary' : 'outline'} fullWidth>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

interface PricingProps {
  id?: string;
  subtitle: React.ReactNode;
  title: React.ReactNode;
  children: React.ReactNode;
}

export const Pricing: React.FC<PricingProps> = ({ id, subtitle, title, children }) => {
  return (
    <section id={id} className="pricing">
      <div className="container pricing__container">
        <div className="pricing__header">
          <span className="pricing__subtitle">{subtitle}</span>
          <h3 className="pricing__title">{title}</h3>
        </div>
        <div className="pricing__grid">{children}</div>
      </div>
    </section>
  );
};

export { PricingTier };
