import React from 'react';
import { Container } from './Container';
import { useInView } from 'react-intersection-observer';

interface ServiceCardProps {
  icon: string;
  title: React.ReactNode;
  description: React.ReactNode;
  badges?: string[];
  features?: string[];
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  badges,
  features,
}: ServiceCardProps) => {
  return (
    <div className="service-card" aria-labelledby={'service-card-title-' + icon}>
      <div className="service-card__icon-wrapper">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div className="service-card__content">
        <h3 className="service-card__title" id={'service-card-title-' + icon}>
          {title}
        </h3>
        <p className="service-card__description">{description}</p>

        {badges && badges.length > 0 && (
          <div className="service-card__badges">
            {badges.map((badge, index) => (
              <span key={index} className="service-card__badge">
                {badge}
              </span>
            ))}
          </div>
        )}

        {features && features.length > 0 && (
          <ul className="service-card__features" role="list">
            {features.map((feature, index) => (
              <li key={index} className="service-card__feature">
                <span className="material-symbols-outlined" aria-hidden="true">
                  check_circle
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

interface ServicesProps {
  subtitle?: React.ReactNode;
  title?: React.ReactNode;
  children: React.ReactNode;
  id?: string;
}

export const Services: React.FC<ServicesProps> = ({ subtitle, title, children, id }: ServicesProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="services" id={id} aria-labelledby="services-title">
      <Container className="services__container">
        {(subtitle || title) && (
          <div className="services__header">
            {subtitle && <span className="services__subtitle">{subtitle}</span>}
            {title && (
              <h2 id="services-title" className="services__title">
                {title}
              </h2>
            )}
          </div>
        )}
        <div className={`services__grid ${inView ? 'is-visible' : ''}`} ref={ref}>
          {children}
        </div>
      </Container>
    </section>
  );
};
