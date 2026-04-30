import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Header } from '../components/Header';
import { About } from '../components/About';
import { Footer } from '../components/Footer';
import '../styles/main.css';
import { getProfilePresentationAction, UserOutput } from '../features/profiles';
import { LoadingComponent } from '../components/LoadingComponent';

export const Route = createFileRoute('/about-me')({
  loader: async ({ context }) => {
    const profile: UserOutput = await getProfilePresentationAction();
    return {
      isConnected: context.session?.user.role === 'admin',
      profile,
    };
  },
  component: AboutPage,
});

function AboutPage() {
  const { isConnected, profile }: { isConnected: boolean; profile: UserOutput } = Route.useLoaderData();

  if (!profile) {
    return (
      <>
        <Header isConnected={isConnected} />
        <main role="main">
          <LoadingComponent />
        </main>
        <Footer />
      </>
    );
  }

  const categoryIcons: Record<string, string> = {
    frontend: 'palette',
    backend: 'storage',
    devops: 'terminal',
    cloud: 'cloud',
    testing: 'bug_report',
    mobile: 'smartphone',
  };

  const socialIcons: Record<string, React.ReactNode> = {
    github: (
      <svg className="about__social-icon fill-current" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    linkedin: (
      <svg className="about__social-icon fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    upwork: (
      <svg className="about__social-icon fill-current" viewBox="0 0 24 24">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
      </svg>
    ),
    malt: <span className="material-symbols-outlined about__social-icon">work</span>,
    email: <span className="material-symbols-outlined about__social-icon">alternate_email</span>,
  };

  return (
    <>
      <Header isConnected={isConnected} />
      <main role="main">
        <About
          profileImage={
            profile.image
              ? profile.image.medium
              : 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMEjIhSGiF8PN6rjg6h1yhBoFV_XcVnUahi7sSe_fbYdqjJ79V0z0DCchPPb9zEM28Tjr0WgEN6msbDC_v3R6J45F8gXf29SSg7I2bFw9voVxkhXDJ-EjL4xCHxkuyaiCvkvUxITbue1ymbGoidStNNxrdyO0bFJF6UAXmVyvAEKavXaQOo6IopebaBrlWSkxoFGVsa2FZtZjcUECit7kfjc4oNtSQDqGwU-0MikjrPfSK_biMi4t2VJ61eWRb9uhVWRixaImc_Io'
          }
          profileName={profile.name || 'Cédric BADJAH'}
          profileJob={profile.personalInfo?.professionalTitle || 'Senior Full-Stack Developer'}
          profileDescription={profile.personalInfo?.bio || ''}
          profileSkills={profile.techStacks.map((tech) => ({
            name: tech.name,
            icon: categoryIcons[tech.category] || 'data_object',
          }))}
          profileLinks={
            profile.socialLinks.map((social) => ({
              name: social.name,
              href: social.url,
              icon: socialIcons[social.type] || (
                <span className="material-symbols-outlined about__social-icon">link</span>
              ),
              ariaLabel: social.name,
            })) || []
          }
        />
      </main>
      <Footer />
    </>
  );
}
