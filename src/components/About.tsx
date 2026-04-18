import React from 'react';
import { Container } from './Container';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';
import { skillsData, socialLinks } from '../core/data/aboutData';
import { Skill, SocialLink } from '../core/types/about';

interface AboutProps {
  profileImage: string;
  profileName: string;
  profileJob: string;
}

export const About: React.FC<AboutProps> = ({ profileImage, profileName, profileJob }) => {
  return (
    <section className="about">
      <Container>
        <div className="about__grid">
          <div className="about__section">
            <div className="about__header">
              <span className="about__badge">
                <Trans>About Me</Trans>
              </span>
              <h1 className="about__title">
                <Trans>Crafting digital experiences with precision.</Trans>
              </h1>

              <div className="about__profile">
                <div
                  className="about__avatar"
                  aria-hidden="true"
                  style={{
                    backgroundImage: `url(${profileImage})`,
                  }}
                />
                <div className="about__profile-info">
                  <p className="about__name">{profileName}</p>
                  <p className="about__job">{profileJob || <Trans>Senior Full-Stack Developer</Trans>}</p>
                </div>
              </div>

              <p className="about__description">
                <Trans>
                  I'm a developer based in France with over 8 years of experience building scalable web applications. I
                  specialize in turning complex problems into simple, beautiful, and intuitive designs. My focus is on
                  clean code, performance, and accessibility.
                </Trans>
              </p>
            </div>

            <div className="about__skills">
              <h3 className="about__subtitle">
                <Trans>Technical Proficiency</Trans>
              </h3>
              <div className="about__skills-grid">
                {skillsData.map((skill: Skill) => (
                  <div key={skill.name} className="about__skill-card">
                    <span className="material-symbols-outlined about__skill-icon">{skill.icon}</span>
                    <span className="about__skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="about__social-section">
              <h3 className="about__name">
                <Trans>Connect with me</Trans>
              </h3>
              <div className="about__socials">
                {socialLinks.map((link: SocialLink) => (
                  <a key={link.name} href={link.href} className="about__social-link" aria-label={link.ariaLabel}>
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="about__illustration-container">
            <div className="about__illustration-glow" />
            <div
              className="about__illustration-image"
              role="img"
              aria-label={t`Illustration of a developer working at a desk with UI elements`}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
