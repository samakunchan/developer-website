import React from 'react';
import { Container } from './Container';
import { Button } from './Button';
import { ImageNetwork } from './ImageNetwork';

interface HeroProps {
  badgeText?: string;
  title: React.ReactNode;
  description: string;
  primaryButton?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryButton?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  ariaLabel?: string;
}

export function Hero({
  badgeText,
  title,
  description,
  primaryButton,
  secondaryButton,
  imageSrc,
  imageAlt,
  imagePosition = 'right',
}: HeroProps) {
  const hasImage = !!imageSrc;

  return (
    <section
      className={`hero${imagePosition === 'left' ? ' hero--image-left' : ''} ${
        !hasImage ? 'hero--no-image' : ''
      }`}
      aria-labelledby="hero-title"
    >
      <Container className="hero__container">
        <div className="hero__content">
          {badgeText && (
            <div className="hero__badge" role="status" aria-label={badgeText}>
              <span className="hero__badge-dot-wrapper" aria-hidden="true">
                <span className="hero__badge-dot-ping"></span>
                <span className="hero__badge-dot"></span>
              </span>
              <span>{badgeText}</span>
            </div>
          )}

          <h1 id="hero-title" className="hero__title">
            {title}
          </h1>

          <p className="hero__description">{description}</p>

          <div className="hero__actions">
            {primaryButton && (
              <Button
                variant="primary"
                onClick={primaryButton.onClick}
                className="hero__btn"
              >
                {primaryButton.text}
              </Button>
            )}
            {secondaryButton && (
              <Button
                variant="secondary"
                onClick={secondaryButton.onClick}
                className="hero__btn"
              >
                {secondaryButton.text}
              </Button>
            )}
          </div>
        </div>

        {hasImage && (
          <div className="hero__image-wrapper">
            <div className="hero__image-glow"></div>
            <div className="hero__image-container">
              <ImageNetwork
                src={imageSrc}
                alt={imageAlt || ''}
                className="hero__image"
                layout="fullWidth"
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
