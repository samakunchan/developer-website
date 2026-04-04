import {
  createFileRoute,
  useNavigate,
  UseNavigateResult,
} from '@tanstack/react-router';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Services, ServiceCard } from '../components/Services';
import { Pricing, PricingTier } from '../components/Pricing';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import { specializedServices } from '../core/data/servicesData';
import { pricingTiers } from '../core/data/pricingData';
import '../styles/main.css';
import { ServiceData } from '../core/types/service';
import { PricingTierData } from '../core/types/pricing';

export const Route = createFileRoute('/services')({
  component: ServicesPricingPage,
});

function ServicesPricingPage() {
  const navigate: UseNavigateResult<string> = useNavigate();

  return (
    <>
      <Header />
      <main role="main">
        <Hero
          badgeText={t`Solutions & Pricing`}
          title={
            <Trans>
              Flexible <span>Service</span> Plans for Your Success
            </Trans>
          }
          description={t`Choose the perfect service package tailored to your business needs. From simple portfolios to complex SaaS platforms.`}
          primaryButton={{
            text: t`View Pricing`,
            onClick: () => navigate({ to: '/services', hash: 'pricing' }),
          }}
          secondaryButton={{ text: t`Contact me` }}
        />
        <Services
          id="services-detail"
          subtitle={t`Expertise`}
          title={<Trans>My Specialized Services</Trans>}
        >
          {specializedServices.map((service: ServiceData, index: number) => (
            <ServiceCard key={index} {...service} />
          ))}
        </Services>

        <Pricing
          id="pricing"
          subtitle={t`Investment`}
          title={<Trans>Pricing Packages</Trans>}
        >
          {pricingTiers.map((tier: PricingTierData, index: number) => (
            <PricingTier key={index} {...tier} />
          ))}
        </Pricing>

        <CTA
          title={<Trans>Ready to start your project?</Trans>}
          description={t`Let's discuss your requirements and find the best solution for your business.`}
          primaryButton={{ text: t`Schedule a Call` }}
          secondaryButton={{ text: t`Contact me` }}
        />
      </main>
      <Footer />
    </>
  );
}
