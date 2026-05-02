import React, { useState } from 'react';
import { Container } from './Container';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';

type ServiceType = 'web' | 'mobile' | 'mvp' | 'ai' | 'api' | 'other';

export const ContactMe: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceType>('web');

  const services = [
    { id: 'web' as ServiceType, icon: 'web', label: t`Web Dev` },
    { id: 'mobile' as ServiceType, icon: 'mobile', label: t`Mobile Dev` },
    { id: 'mvp' as ServiceType, icon: 'rocket_launch', label: t`MVP Launch` },
    { id: 'ai' as ServiceType, icon: 'auto_awesome', label: t`AI Integration` },
    { id: 'api' as ServiceType, icon: 'terminal', label: t`API Backend` },
    { id: 'other' as ServiceType, icon: 'more_horiz', label: t`Something Else` },
  ];

  const _prices = ['$5k - $10k', '$10k - $30k', '$30k+'];

  return (
    <section className="contact-me">
      <Container>
        <header className="contact-me__hero">
          <span className="contact-me__badge">
            <Trans>Let's Build Together</Trans>
          </span>
          <h1 className="contact-me__title">
            <Trans>
              Ready to turn your vision into <span className="contact-me__title-highlight">digital reality?</span>
            </Trans>
          </h1>
          <p className="contact-me__description">
            <Trans>
              Whether you have a fully-fledged brief or just a spark of an idea, we're here to engineer the solution.
              Select your path below.
            </Trans>
          </p>
        </header>

        <div className="contact-me__grid">
          {/* Left Column: Form Section */}
          <div className="contact-me__form-column">
            <div className="contact-me__card">
              <h2 className="contact-me__card-title">
                <Trans>What can we help you with?</Trans>
              </h2>

              {/* Service Selector Grid */}
              <div className="contact-me__services">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className={`contact-me__service-btn ${
                      selectedService === service.id ? 'contact-me__service-btn--active' : ''
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <span className="material-symbols-outlined contact-me__service-icon">{service.icon}</span>
                    <span className="contact-me__service-label">{service.label}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Form Fields */}
              <form className="contact-me__form" onSubmit={(e) => e.preventDefault()}>
                <div className="contact-me__form-grid">
                  <div className="contact-me__field">
                    <label className="contact-me__label" htmlFor="contact_name">
                      <Trans>Full Name</Trans>
                    </label>
                    <input id="contact_name" className="contact-me__input" placeholder={t`John Doe`} type="text" />
                  </div>
                  <div className="contact-me__field">
                    <label className="contact-me__label" htmlFor="contact_email">
                      <Trans>Email Address</Trans>
                    </label>
                    <input
                      id="contact_email"
                      className="contact-me__input"
                      placeholder={`john@example.com`}
                      type="email"
                    />
                  </div>
                </div>

                <div className="contact-me__field" style={{ marginBottom: 'var(--spacing-md)' }}>
                  <h5 className="contact-me__label">
                    <Trans>Project Budget Range</Trans>
                  </h5>
                  <div className="contact-me__budget-options">
                    {_prices.map((range: string, index: number) => (
                      <label key={range} className="contact-me__budget-label" htmlFor={'contact_price_range-' + index}>
                        <input
                          id={'contact_price_range-' + index}
                          className="contact-me__budget-input"
                          name="budget"
                          type="radio"
                          defaultChecked={index === 1}
                        />
                        <div className="contact-me__budget-box">{range}</div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="contact-me__field" style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label className="contact-me__label">
                    <Trans>Project Brief</Trans>
                  </label>
                  <textarea
                    className="contact-me__textarea"
                    placeholder={t`Tell us about your project goals, timeline, and any specific technical requirements...`}
                    rows={4}
                  />
                </div>

                <button className="contact-me__submit" type="submit">
                  <Trans>Send Inquiry</Trans>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Info blocks */}
          <div className="contact-me__info-column">
            <div className="contact-me__card contact-me__card--glow">
              <div className="contact-me__info-item">
                <div className="contact-me__info-icon-wrapper">
                  <span className="material-symbols-outlined contact-me__info-icon">speed</span>
                </div>
                <div>
                  <h4 className="contact-me__info-title">
                    <Trans>Rapid Turnaround</Trans>
                  </h4>
                  <p className="contact-me__info-text">
                    <Trans>Response within 12 business hours.</Trans>
                  </p>
                </div>
              </div>

              <div className="contact-me__info-item" style={{ marginTop: 'var(--spacing-md)' }}>
                <div className="contact-me__info-icon-wrapper">
                  <span className="material-symbols-outlined contact-me__info-icon">verified_user</span>
                </div>
                <div>
                  <h4 className="contact-me__info-title">
                    <Trans>Secure Process</Trans>
                  </h4>
                  <p className="contact-me__info-text">
                    <Trans>Full NDAs available for every project.</Trans>
                  </p>
                </div>
              </div>
            </div>

            {/* Location Pin */}
            <div className="contact-me__location-card">
              <img
                className="contact-me__location-img"
                alt={t`Cinematic neon city background`}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuABs4mzLs1Cfg4jFk2fw21_bshsg6rly-vyJIiNUyJQ8n6UsmDySimUT3XMstKLpF8oSl-XiENq_4Q-LFrVM6b_EW3VVNmkIbn-XpMoGUncD4StiN96gu_QCFlTLRCCLhiH3k15CJE9GtViQgca9EJUEs0soGDlS5Lw-eGpddTdb87Vi9WvUSB7qZGdWv0XMN1npR4P9lCvBbMDKSzAffeXWl_Stm6Zv5Y_JlnjGjmobjLOJMQ5E8OKda0FXirHyC71dWeJWW0TE7o3"
              />
              <div className="contact-me__location-gradient" />
              <div className="contact-me__location-content">
                <div className="contact-me__location-pin">
                  <span className="material-symbols-outlined">location_on</span>
                  Montpellier, France
                </div>
                <p className="contact-me__info-text" style={{ fontSize: '0.75rem' }}>
                  <Trans>Serving clients globally from our HQ.</Trans>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
