import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import '../styles/main.css';

export const Route = createFileRoute('/projects')({
  component: ProjectsPage,
});

function ProjectsPage() {
  const projects = [
    {
      id: '1',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB0S_tlYJ11_Zm9AM9150irhx0uCiLyo890jeNJ4_HFXYihTkZtgcGx-FnjCK0wxollBz5iADdB65IEX20B3PC2idT6NLS_-Z3fpasq5pcf9eic0lDl0y5JGuELh6J_AMGRX86i7skN-Vleb97NyhbnhFS4HMCaqOtFlRM0K09jb7BxNPcnEn29lsvaVXHrZgwx2R1Krm3ceYI783WvBIXN6XpNHmg6Nr4qGQFQDSF78Z_eIwg8iewu2t_xH8egesRS42l5_GVvxSw',
      imageAlt: t`Modern minimalist dashboard interface design`,
      title: <Trans>Nova Analytics Platform</Trans>,
      category: 'web' as const,
      categoryLabel: <Trans>Web</Trans>,
      description: (
        <Trans>
          A complex data visualization dashboard built with Next.js, D3.js, and
          Supabase for real-time fleet tracking.
        </Trans>
      ),
      techIcons: ['javascript', 'database'],
    },
    {
      id: '2',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDVFwUrXKAcvI-3AypGUga4YO36oJAUPdYlsZE7PKYZ6bHj8Yc_5hYng0-vSM26jACNIhFZenme8v0WbzH3daYFsIiJQaeXdiNwB1tWcALGm3NJZ5h2wB7OoiAakGOjLmmNvNoOviOlgLVU_2gxy-Jk99chkfkmp3zwUQ4ptTHuE60zpT6-YOGnwUI65Jyz9pQCF6EreyjZygFFiaSQd6-H4aYoERaTzVLJR0VV7lOk3oKo6XSoMJB1dqvMXAsKt_qEzXnXQZgZt-8',
      imageAlt: t`Sleek mobile app interface on a smartphone`,
      title: <Trans>FitFlow Mobile</Trans>,
      category: 'mobile' as const,
      categoryLabel: <Trans>Mobile</Trans>,
      description: (
        <Trans>
          Cross-platform fitness application featuring custom workout builders
          and wearable device integration using React Native.
        </Trans>
      ),
      techIcons: ['smartphone', 'monitoring'],
    },
    {
      id: '3',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDq5xXlSiAo7jU2iKT_S6U1-1u0IIA4kwqajqjm07FqugNtqzbMjrRIigsQDywnYhLw6DmacD3k7ncIU3nS-NKABLBDQQGNV4dE6OG_YpEQMq3Tudy4ISPbTet_z1J0uW1NWy5u9k1L3nkgnWpJoup5M4Kid6FTVzn00E-s11XElXFsodF9NxcZ5fN2iA-RJL1sX9k9HLnbt9t7Hx9L8hXx2zoYHGZrj4dQclBJifbyGmaT-xI-wom0pd9d3s9a5t1gb5ggOsT1gqE',
      imageAlt: t`E-commerce website with product grid view`,
      title: <Trans>Apex E-Commerce</Trans>,
      category: 'web' as const,
      categoryLabel: <Trans>Web</Trans>,
      description: (
        <Trans>
          High-performance headless commerce solution with Stripe integration
          and custom inventory management.
        </Trans>
      ),
      techIcons: ['shopping_bag', 'payments'],
    },
    {
      id: '4',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAwed4Z9umdS00GxunpMe0hwo7OmMtNp_yCbeJRFFfkKJCGXy53xgISbl7LB5yOp7sQRBodsAPKYiyc9sTS_JiXZQvZpeEsvts-XndIn6WfnPsnHimnu2nzBH_EEc0jF8dbKcnihtwzhV5h3JwTB0JZrfXsYbwEPew8mM8fMXi5KjrCoNLEKmGNt6XvEwq0E56g7Tbt7efbO6vXWpP9CUo-iXiiQNVE7Jupf1iMar3wM9oUl-VwPR4GMlbqQXWZE-NPw26tJY0rtzs',
      imageAlt: t`Abstract data visualization with neon lines`,
      title: <Trans>CryptoPulse API</Trans>,
      category: 'web' as const,
      categoryLabel: <Trans>Web</Trans>,
      description: (
        <Trans>
          Robust backend service for cryptocurrency market analysis providing
          real-time data to thousands of users.
        </Trans>
      ),
      techIcons: ['api', 'speed'],
    },
  ];

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
