import { createFileRoute } from '@tanstack/react-router';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Services, ServiceCard } from '../components/Services';
import { Pricing, PricingTier } from '../components/Pricing';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import '../styles/main.css';

export const Route = createFileRoute('/services')({
  component: ServicesPricingPage,
});

function ServicesPricingPage() {
  return (
    <>
      <Header />
      <Hero
        badgeText={t`Solutions & Pricing`}
        title={
          <Trans>
            Flexible <span>Service</span> Plans for Your Success
          </Trans>
        }
        description={t`Choose the perfect service package tailored to your business needs. From simple portfolios to complex SaaS platforms.`}
        primaryButton={{ text: t`View Pricing` }}
        secondaryButton={{ text: t`Contact me` }}
      />
      <Services
        id="services-detail"
        subtitle={t`Expertise`}
        title={<Trans>My Specialized Services</Trans>}
      >
        <ServiceCard
          icon="language"
          title={t`Web Development`}
          description={t`Building scalable, SEO-friendly web applications with modern tech stacks.`}
          badges={['React', 'Next.js', 'Node.js']}
          features={[
            t`Responsive Design`,
            t`Performance Optimization`,
            t`SEO Best Practices`,
          ]}
        />
        <ServiceCard
          icon="smartphone"
          title={t`Mobile App Development`}
          description={t`Cross-platform and native mobile solutions for iOS and Android.`}
          badges={['Flutter', 'React Native']}
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
          badges={['Cloud', 'Security']}
          features={[
            t`Security Patching`,
            t`Cloud Infrastructure`,
            t`Regular Backups`,
          ]}
        />
      </Services>

      <Pricing
        id="pricing"
        subtitle={t`Investment`}
        title={<Trans>Pricing Packages</Trans>}
      >
        <PricingTier
          name={<Trans>Static Site</Trans>}
          description={t`Perfect for personal brands and portfolios.`}
          priceSuffix={<Trans>/start</Trans>}
          buttonText={<Trans>Choose Basic</Trans>}
          features={[
            { text: <Trans>3 Pages</Trans>, included: true },
            { text: <Trans>Mobile Responsive</Trans>, included: true },
            { text: <Trans>SEO Optimization</Trans>, included: true },
            { text: <Trans>CMS Integration</Trans>, included: false },
          ]}
        />
        <PricingTier
          name={<Trans>Web Application</Trans>}
          description={t`Full-featured apps with authentication and CMS.`}
          price="$4,999"
          priceSuffix={<Trans>/start</Trans>}
          buttonText={<Trans>Choose Pro</Trans>}
          isPopular
          features={[
            { text: <Trans>Custom Backend</Trans>, included: true },
            { text: <Trans>User Authentication</Trans>, included: true },
            { text: <Trans>Dashboard UI</Trans>, included: true },
            { text: <Trans>Stripe Integration</Trans>, included: true },
          ]}
        />
        <PricingTier
          name={<Trans>Custom SaaS</Trans>}
          description={t`Scalable enterprise-grade software solutions.`}
          price="$9,999"
          priceSuffix={<Trans>/start</Trans>}
          buttonText={<Trans>Choose Enterprise</Trans>}
          features={[
            {
              text: <Trans>Multi-platform (Web/Mobile)</Trans>,
              included: true,
            },
            { text: <Trans>API Development</Trans>, included: true },
            { text: <Trans>High-Load Optimization</Trans>, included: true },
            { text: <Trans>Priority Support</Trans>, included: true },
          ]}
        />
      </Pricing>

      <CTA
        title={<Trans>Ready to start your project?</Trans>}
        description={t`Let's discuss your requirements and find the best solution for your business.`}
        primaryButton={{ text: t`Schedule a Call` }}
        secondaryButton={{ text: t`Contact me` }}
      />
      <Footer />
    </>
  );
}
