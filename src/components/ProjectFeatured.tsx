import React from 'react';
import { Container } from './Container';
import { Trans } from '@lingui/react/macro';

interface ProjectHighlitedProps {
  slug: string;
  image?: {
    medium: { url: string; alt: string };
    raw: { url: string; alt: string };
  };
  title: React.ReactNode;
  categoryLabel: React.ReactNode;
  description: React.ReactNode;
  techIcons?: string[];
  index?: number;
  totalCount?: number;
  onPrev?: () => void;
  onNext?: () => void;
  onDotClick?: (index: number) => void;
}

export function ProjectFeatured({
  slug,
  image,
  title,
  categoryLabel,
  index = 0,
  totalCount = 0,
  onPrev,
  onNext,
  onDotClick,
}: ProjectHighlitedProps) {
  const slideNumber = String(index + 1).padStart(2, '0');

  return (
    <section className="projects projects--featured" id="portfolio">
      <Container className="projects__container">
        <div className="projects__featured-header">
          <div className="projects__featured-header-title-container">
            <h2 className="services__title">
              <Trans>Featured Projects</Trans>
            </h2>
            <p className="projects__featured-header-subtitle">
              <Trans>A selection of custom-tailored solutions combining performance and design.</Trans>
            </p>
          </div>
          {totalCount > 1 && (
            <div className="projects__featured-header-nav">
              <button aria-label="Previous project" className="projects__featured-nav-btn" onClick={onPrev}>
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button aria-label="Next project" className="projects__featured-nav-btn" onClick={onNext}>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          )}
        </div>

        <div className="projects__featured-track-container">
          <div className={`projects__featured-slide`}>
            <div className="projects__featured-number">{slideNumber}</div>
            <div className="projects__featured-image-wrapper">
              <div className="projects__featured-image-container hero__image-container">
                <img
                  alt={typeof title === 'string' ? title : 'Featured project'}
                  className="projects__featured-image"
                  src={image?.raw?.url || image?.medium?.url}
                />
              </div>
            </div>
            <div className="projects__featured-content">
              <span className="projects__featured-category">{categoryLabel}</span>
              <h3 className="projects__featured-title">{title}</h3>
              <a className="projects__featured-link" href={`/projects/${slug}`}>
                <Trans>Voir les détails</Trans> <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
        {totalCount > 1 && (
          <div className="projects__featured-dots">
            {Array.from({ length: totalCount }).map((_, i) => (
              <button
                key={i}
                className={`projects__featured-dot ${i === index ? 'projects__featured-dot--active' : ''}`}
                onClick={() => onDotClick?.(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
