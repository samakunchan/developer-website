import React from 'react';
import { Container } from './Container';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';
import AboutIllustration from '../../assets/isometric-concept-design-for-dev.webp';

type SkillProps = {
  name: string;
  icon: string;
};

export const About: React.FC = () => {
  const skills: SkillProps[] = [
    { name: t`JavaScript`, icon: 'javascript' },
    { name: t`React / Next.js`, icon: 'data_object' },
    { name: t`Angular`, icon: 'data_object' },
    { name: t`Node.js`, icon: 'storage' },
    { name: t`REST API`, icon: 'Api' },
    { name: t`Flutter`, icon: 'Flutter' },
    { name: t`Moderne CSS`, icon: 'palette' },
    { name: t`PostgreSQL`, icon: 'database' },
    { name: t`Google store`, icon: 'Android' },
    { name: t`Apple store`, icon: 'iOS' },
  ];

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
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBMEjIhSGiF8PN6rjg6h1yhBoFV_XcVnUahi7sSe_fbYdqjJ79V0z0DCchPPb9zEM28Tjr0WgEN6msbDC_v3R6J45F8gXf29SSg7I2bFw9voVxkhXDJ-EjL4xCHxkuyaiCvkvUxITbue1ymbGoidStNNxrdyO0bFJF6UAXmVyvAEKavXaQOo6IopebaBrlWSkxoFGVsa2FZtZjcUECit7kfjc4oNtSQDqGwU-0MikjrPfSK_biMi4t2VJ61eWRb9uhVWRixaImc_Io")',
                  }}
                />
                <div className="about__profile-info">
                  <p className="about__name">Cédric BADJAH</p>
                  <p className="about__job">
                    <Trans>Senior Full-Stack Developer</Trans>
                  </p>
                </div>
              </div>

              <p className="about__description">
                <Trans>
                  I'm a developer based in France with over 8 years of
                  experience building scalable web applications. I specialize in
                  turning complex problems into simple, beautiful, and intuitive
                  designs. My focus is on clean code, performance, and
                  accessibility.
                </Trans>
              </p>
            </div>

            <div className="about__skills">
              <h3 className="about__subtitle">
                <Trans>Technical Proficiency</Trans>
              </h3>
              <div className="about__skills-grid">
                {skills.map((skill: SkillProps) => (
                  <div key={skill.name} className="about__skill-card">
                    <span className="material-symbols-outlined about__skill-icon">
                      {skill.icon}
                    </span>
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
                <a
                  href="#"
                  className="about__social-link"
                  aria-label={t`GitHub`}
                >
                  <svg
                    className="about__social-icon fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="about__social-link"
                  aria-label={t`LinkedIn`}
                >
                  <svg
                    className="about__social-icon fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="about__social-link"
                  aria-label={t`Email`}
                >
                  <span className="material-symbols-outlined about__social-icon">
                    alternate_email
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="about__illustration-container">
            <div className="about__illustration-glow" />
            <div
              className="about__illustration-image"
              role="img"
              aria-label={t`Illustration of a developer working at a desk with UI elements`}
              style={{ backgroundImage: `url(${AboutIllustration})` }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
