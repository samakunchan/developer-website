import { createFileRoute, useNavigate, UseNavigateResult } from '@tanstack/react-router';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import '../styles/main.css';
import { getProjects, ProjectType } from '../features/projects';
import { RouteNameType } from '../core/types/routes-name';

export const Route = createFileRoute('/projects')({
  loader: async () => {
    const projects: ProjectType[] = await getProjects();
    return {
      projects,
    };
  },
  head: () => ({
    meta: [
      {
        name: 'description',
        content: t`Projects page meta description`,
      },
      {
        property: 'og:description',
        content: t`Projects page meta description`,
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const navigate: UseNavigateResult<string> = useNavigate();
  const { projects } = Route.useLoaderData();

  return (
    <>
      <Header />
      <main role="main" className="projects-page">
        <Hero
          title={
            <Trans>
              Building the <span>future</span> through clean code.
            </Trans>
          }
          description={t`I'm a freelance developer specializing in building high-performance web and mobile applications with modern technologies.`}
          primaryButton={{
            text: t`Let's talk`,
            onClick: () => navigate({ to: RouteNameType.ContactMe.toString() }),
          }}
          secondaryButton={{
            text: t`View CV`,
            onClick: () => navigate({ to: RouteNameType.AboutMe.toString() }),
          }}
        />
        <Projects
          id="projects-list"
          subtitle={t`Portfolio`}
          title={<Trans>My Recent Work</Trans>}
          projects={projects}
        />
        <CTA
          title={<Trans>Have a project in mind?</Trans>}
          description={t`I'm currently available for freelance work and open to new opportunities. Let's build something amazing together.`}
          // primaryButton={{ text: t`Schedule a call` }}
          // secondaryButton={{ text: t`Email me` }}
          primaryButton={{
            text: t`Email Me`,
            onClick() {
              navigate({ to: RouteNameType.ContactMe.toString() });
            },
          }}
        />
      </main>
      <Footer />
    </>
  );
}
