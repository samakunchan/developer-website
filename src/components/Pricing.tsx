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
    <div className={`pricing-card ${isPopular ? 'pricing-card--popular' : ''}`}>
      {isPopular && (
        <div className="pricing-card__badge">
          <Trans>Most Popular</Trans>
        </div>
      )}
      <h4 className="pricing-card__name">{name}</h4>
      <p className="pricing-card__description">{description}</p>
      {price != null ? (
        <div className="pricing-card__price">
          {price}
          <span className="pricing-card__price-suffix">{priceSuffix}</span>
        </div>
      ) : (
        <div className="pricing-card__price"></div>
      )}
      <ul className="pricing-card__features">
        {features.map((feature, index) => (
          <li
            key={index}
            className={`pricing-card__feature ${
              !feature.included ? 'pricing-card__feature--disabled' : ''
            }`}
          >
            <span className="material-symbols-outlined">
              {feature.included ? 'check_circle' : 'cancel'}
            </span>
            {feature.text}
          </li>
        ))}
      </ul>
      <Button
        variant={isPopular ? 'primary' : 'outline'}
        fullWidth
        className="pricing-card__button"
      >
        {buttonText}
      </Button>
    </div>
  );
};

interface PricingProps {
  id?: string;
  subtitle: React.ReactNode;
  title: React.ReactNode;
  children: React.ReactNode;
}

export const Pricing: React.FC<PricingProps> = ({
  id,
  subtitle,
  title,
  children,
}) => {
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
