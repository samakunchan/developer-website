import React, { useState } from 'react';
import { Container } from './Container';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';
import { submitMessageAction } from '../features/messages';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

type ServiceEnum = 'web' | 'mobile' | 'mvp' | 'ai' | 'api' | 'other';

type ServiceType = {
  id: ServiceEnum;
  icon: string;
  label: string;
};

type PriceRangeType = {
  id: string;
  currency: string;
  label: string;
};

export const ContactMe: React.FC = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [selectedService, setSelectedService] = useState<ServiceEnum>('web');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    projectBrief: '',
  });
  const [selectedPriceId, setSelectedPriceId] = useState('<1k');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const services: ServiceType[] = [
    { id: 'web' as ServiceEnum, icon: 'web', label: t`Web` },
    { id: 'mobile' as ServiceEnum, icon: 'mobile', label: t`Mobile` },
    { id: 'mvp' as ServiceEnum, icon: 'rocket_launch', label: t`MVP` },
    { id: 'ai' as ServiceEnum, icon: 'auto_awesome', label: t`AI` },
    { id: 'api' as ServiceEnum, icon: 'terminal', label: t`API Backend` },
    { id: 'other' as ServiceEnum, icon: 'more_horiz', label: t`Something Else` },
  ];

  const _prices: PriceRangeType[] = [
    { id: '<1k', currency: '€', label: `<1k` },
    { id: '1k-5k', currency: '€', label: `1k - 5k` },
    { id: '5k-10k', currency: '€', label: `5k - 10k` },
    { id: '10k-30k', currency: '€', label: `10k - 30k` },
    { id: '30k+', currency: '€', label: `30k+` },
  ];

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setStatus('loading');

    const serviceObj = services.find((s: ServiceType) => s.id === selectedService);
    const priceObj = _prices.find((p: PriceRangeType) => p.id === selectedPriceId);

    if (!serviceObj || !priceObj) {
      setStatus('error');
      return;
    }

    try {
      if (!executeRecaptcha) {
        console.error('Execute recaptcha not yet available');
        setStatus('error');
        return;
      }

      const token: string = await executeRecaptcha('submit_contact');

      const result = await submitMessageAction({
        data: {
          ...formData,
          serviceType: serviceObj,
          priceRangeType: priceObj,
          recaptchaToken: token,
        },
      });

      if (result.success) {
        setStatus('success');
        setFormData({ fullName: '', email: '', projectBrief: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const fieldName: string = id.replace('contact_', '');
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

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
                {services.map((service: ServiceType) => (
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
              {status === 'success' ? (
                <div className="contact-me__success">
                  <h3>
                    <Trans>Message Sent!</Trans>
                  </h3>
                  <p>
                    <Trans>Thank you for reaching out. We'll get back to you within 12 hours.</Trans>
                  </p>
                </div>
              ) : (
                <form className="contact-me__form" onSubmit={handleSubmit}>
                  <div className="contact-me__form-grid">
                    <div className="contact-me__field">
                      <label className="contact-me__label" htmlFor="contact_fullName">
                        <Trans>Full Name</Trans>
                      </label>
                      <input
                        id="contact_fullName"
                        className="contact-me__input"
                        placeholder={t`John Doe`}
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
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
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="contact-me__field" style={{ marginBottom: 'var(--spacing-md)' }}>
                    <h5 className="contact-me__label">
                      <Trans>Project Budget Range</Trans>
                    </h5>
                    <div className="contact-me__budget-options">
                      {_prices.map((range: PriceRangeType) => (
                        <label key={range.id} className="contact-me__budget-label" htmlFor={range.id}>
                          <input
                            id={range.id}
                            className="contact-me__budget-input"
                            name="budget"
                            type="radio"
                            checked={selectedPriceId === range.id}
                            onChange={() => setSelectedPriceId(range.id)}
                          />
                          <div className="contact-me__budget-box">
                            <span>{range.label}</span>
                            <span>{range.currency}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="contact-me__field" style={{ marginBottom: 'var(--spacing-md)' }}>
                    <label className="contact-me__label" htmlFor="contact_projectBrief">
                      <Trans>Project Brief</Trans>
                    </label>
                    <textarea
                      id="contact_projectBrief"
                      className="contact-me__textarea"
                      placeholder={t`Tell us about your project goals, timeline, and any specific technical requirements...`}
                      rows={4}
                      required
                      value={formData.projectBrief}
                      onChange={handleInputChange}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="contact-me__error">
                      <Trans>Something went wrong. Please try again.</Trans>
                    </p>
                  )}

                  <button className="contact-me__submit" type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? <Trans>Sending...</Trans> : <Trans>Send Inquiry</Trans>}
                  </button>
                </form>
              )}
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
                <p className="contact-me__info-text">
                  <Trans>Serving clients globally.</Trans>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
