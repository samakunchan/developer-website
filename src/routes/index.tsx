import { createFileRoute } from '@tanstack/react-router';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Services, ServiceCard } from '../components/Services';
import { Process } from '../components/Process';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import '../styles/main.css';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <Hero
        badgeText={t`Available for new projects`}
        title={
          <Trans>
            Custom Software <span>Solutions</span> for Modern Businesses
          </Trans>
        }
        description={t`Freelance Full-Stack Developer specializing in high-performance web and mobile applications using React, Angular, and Flutter.`}
        primaryButton={{ text: t`View Portfolio` }}
        secondaryButton={{ text: t`Get a Quote` }}
        imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuA-DXrgtoZM3ej2WaApf3VNsO_ULaBI3bwr0BqHDSkABxpSX7q4jcYwWopO7xSJEtjykdr8w7hQ5XdpQ3ZCaMHca2trLcaerfikZT52KLJIeYU3mvrkl2zDW820gQpJbdsFVX4ffyFH5AoGsdnpBz4a2rxAcKpndZEuQOF6-c3cb5QDyN8UqQ1ISD7UBUnMy3XX1BOfa6xv_rAIepdbY6WHnawAIpL-VSGIXp84lw-xJXIt2pvVgsc33_BZ3GWNCIIXkbVww1EFlTI"
        imageAlt={t`Modern workspace with laptop showing code`}
      />
      <Services
        id={t`Expertise`}
        subtitle={t`Expertise`}
        title={<Trans>Core Services</Trans>}
      >
        <ServiceCard
          icon="language"
          title={t`Web Development`}
          description={t`Building scalable, SEO-friendly web applications with modern tech stacks.`}
          badges={['React', 'Next.js', 'Node.js']}
        />
        <ServiceCard
          icon="smartphone"
          title={t`Mobile App Development`}
          description={t`Cross-platform and native mobile solutions for iOS and Android.`}
          features={[
            t`App Store Deployment`,
            t`Push Notifications`,
            t`Offline Capability`,
          ]}
        />
        <ServiceCard
          icon="handyman"
          title={t`Maintenance & Support`}
          description={t`Ensuring your software stays fast, secure, and up-to-date with 24/7 monitoring.`}
          badges={['Optimization', 'Security']}
          features={[
            t`Security Patching`,
            t`Cloud Infrastructure`,
            t`Performance Audits`,
          ]}
        />
      </Services>
      <Process
        id={t`Process`}
        subtitle={t`Workflow`}
        title={<Trans>How I Work</Trans>}
        steps={[
          {
            number: 1,
            title: <Trans>Discovery & Strategy</Trans>,
            description: (
              <Trans>
                Deep dive into your business goals, target audience, and
                technical requirements.
              </Trans>
            ),
          },
          {
            number: 2,
            title: <Trans>Design & Development</Trans>,
            description: (
              <Trans>
                Iterative coding sessions with weekly updates and live staging
                environments.
              </Trans>
            ),
          },
          {
            number: 3,
            title: <Trans>Launch & Scaling</Trans>,
            description: (
              <Trans>
                Deployment to production servers and ongoing performance
                monitoring.
              </Trans>
            ),
          },
        ]}
      />
      <CTA
        title={<Trans>Ready to bring your idea to life?</Trans>}
        description={t`Let's discuss your project and see how we can build something amazing together.`}
        primaryButton={{ text: t`Schedule a Call` }}
        secondaryButton={{ text: t`Email Me` }}
      />
      <Footer />
    </>
  );
}
