import { createFileRoute } from '@tanstack/react-router';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
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
    </>
  );
}
