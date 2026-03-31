import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { PricingTierData } from '../types/pricing';

export const pricingTiers: PricingTierData[] = [
  {
    name: <Trans>Static Site</Trans>,
    description: t`Perfect for personal brands and portfolios.`,
    priceSuffix: <Trans>/start</Trans>,
    buttonText: <Trans>Choose Basic</Trans>,
    features: [
      { text: <Trans>3 Pages</Trans>, included: true },
      { text: <Trans>Mobile Responsive</Trans>, included: true },
      { text: <Trans>SEO Optimization</Trans>, included: true },
      { text: <Trans>CMS Integration</Trans>, included: false },
    ],
  },
  {
    name: <Trans>Web Application</Trans>,
    description: t`Full-featured apps with authentication and CMS.`,
    price: '$4,999',
    priceSuffix: <Trans>/start</Trans>,
    buttonText: <Trans>Choose Pro</Trans>,
    isPopular: true,
    features: [
      { text: <Trans>Custom Backend</Trans>, included: true },
      { text: <Trans>User Authentication</Trans>, included: true },
      { text: <Trans>Dashboard UI</Trans>, included: true },
      { text: <Trans>Stripe Integration</Trans>, included: true },
    ],
  },
  {
    name: <Trans>Custom SaaS</Trans>,
    description: t`Scalable enterprise-grade software solutions.`,
    price: '$9,999',
    priceSuffix: <Trans>/start</Trans>,
    buttonText: <Trans>Choose Enterprise</Trans>,
    features: [
      {
        text: <Trans>Multi-platform (Web/Mobile)</Trans>,
        included: true,
      },
      { text: <Trans>API Development</Trans>, included: true },
      { text: <Trans>High-Load Optimization</Trans>, included: true },
      { text: <Trans>Priority Support</Trans>, included: true },
    ],
  },
];
