import { createFileRoute, Link } from '@tanstack/react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Trans } from '@lingui/react/macro';
import '../styles/main.css';

import { getProjectBySlug, ProjectType } from '../features/projects';

export const Route = createFileRoute('/projects_/$slug')({
  loader: async ({ context, params }) => {
    const project = await getProjectBySlug({ data: params.slug });
    return {
      isConnected: context.session?.user.role === 'admin',
      project,
    };
  },
  component: ProjectDetailsPage,
});

function ProjectDetailsPage() {
  const { isConnected, project }: { isConnected: boolean; project: ProjectType } = Route.useLoaderData();

  if (!project) {
    return (
      <div className="project-detail">
        <Header isConnected={isConnected} />
        <main className="project-detail__main flex items-center justify-center p-8" role="main">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-white">
              <Trans>Project Not Found</Trans>
            </h1>
            <p className="text-slate-400 mb-8">
              <Trans>The project you are looking for does not exist.</Trans>
            </p>
            <Link to="/projects" className="btn btn--primary">
              <Trans>Back to Projects</Trans>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="project-detail">
      <Header isConnected={isConnected} />

      <main className="project-detail__main">
        {/* Left Side: Visual Anchor (Sticky) */}
        <section className="project-detail__visual">
          <div className="project-detail__gradient"></div>
          {project.image?.raw?.url ? (
            <img src={project.image.raw.url} alt={project.image.raw.alt} className="project-detail__image" />
          ) : (
            <div
              className="project-detail__image project-detail__image--placeholder"
              style={{
                background: 'var(--color-slate-800)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <span className="material-symbols-outlined" style={{ color: 'var(--color-slate-600)', fontSize: '4rem' }}>
                image
              </span>
            </div>
          )}

          {/* Status Label */}
          <div className="project-detail__status-badge">
            <span className="project-detail__status-dot"></span>
            <span className="project-detail__status-text">
              <Trans>System Status: Live</Trans>
            </span>
          </div>
        </section>

        {/* Right Side: Content (Scrollable) */}
        <section className="project-detail__content">
          {/* Case Study Indicator */}
          <div className="project-detail__label">
            <span className="project-detail__case-study">
              <Trans>Case Study:</Trans> {project.caseStudyNumber}
            </span>
          </div>

          {/* Title & Category Badge */}
          <div className="project-detail__header">
            <h1 className="project-detail__title">{project.title}</h1>
            <span className="project-detail__category">{project.categoryLabel?.toString().toUpperCase()}</span>
          </div>

          {/* Description */}
          <div className="project-detail__description text-content">
            <p>{project.description}</p>
          </div>

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="project-detail__tech-stack">
              <h3 className="project-detail__section-title">
                <Trans>Technical Architecture</Trans>
              </h3>
              <div className="project-detail__tech-grid">
                {project.techStack.map((tech, index) => (
                  <div key={index} className="project-detail__tech-item">
                    <span className="material-symbols-outlined project-detail__tech-icon">{tech.icon}</span>
                    <span className="project-detail__tech-name">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features (Bento Grid) */}
          {project.features && project.features.length > 0 && (
            <div className="project-detail__features">
              <h3 className="project-detail__section-title">
                <Trans>Functional Requirements</Trans>
              </h3>
              <div className="project-detail__features-grid">
                {project.features.map((feature, index) => (
                  <div key={index} className="project-detail__feature-card">
                    <span className="material-symbols-outlined project-detail__feature-icon">{feature.icon}</span>
                    <h4 className="project-detail__feature-title">{feature.title}</h4>
                    <p className="project-detail__feature-desc">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
