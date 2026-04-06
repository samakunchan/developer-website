import React from 'react';
import { Container } from './Container';
import { Button } from './Button';

import { useInView } from 'react-intersection-observer';

interface CTAProps {
  title: React.ReactNode;
  description: React.ReactNode;
  primaryButton?: {
    text: string;
    onClick?: () => void;
  };
  secondaryButton?: {
    text: string;
    onClick?: () => void;
  };
}

export function CTA({ title, description, primaryButton, secondaryButton }: CTAProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      className={`cta cta-animation-section ${inView ? 'is-visible' : ''}`}
      aria-labelledby="cta-title"
    >
      <Container>
        <div className="cta__wrapper">
          <div className="cta__glow cta__glow--top" aria-hidden="true"></div>
          <div className="cta__glow cta__glow--bottom" aria-hidden="true"></div>

          <div className="cta__content">
            <h2 id="cta-title" className="cta__title">
              {title}
            </h2>
            <p className="cta__description">{description}</p>

            <div className="cta__actions">
              {primaryButton && (
                <Button variant="primary" onClick={primaryButton.onClick} className="cta__btn">
                  {primaryButton.text}
                </Button>
              )}
              {secondaryButton && (
                <Button variant="secondary" onClick={secondaryButton.onClick} className="cta__btn">
                  {secondaryButton.text}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
