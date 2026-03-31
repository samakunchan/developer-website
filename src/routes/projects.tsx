import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import '../styles/main.css';
import { projects } from '../data/projects';

export const Route = createFileRoute('/projects')({
  component: ProjectsPage,
});

function ProjectsPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Hero
        title={
          <Trans>
            Building the <span>future</span> through clean code.
          </Trans>
        }
        description={t`I'm a freelance developer specializing in building high-performance web and mobile applications with modern technologies.`}
        primaryButton={{
          text: t`Let's talk`,
        }}
        secondaryButton={{
          text: t`View CV`,
          onClick: () => navigate({ to: '/about' }),
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
        primaryButton={{ text: t`Schedule a call` }}
        secondaryButton={{ text: t`Email me` }}
      />
      <Footer />
    </>
  );
}
