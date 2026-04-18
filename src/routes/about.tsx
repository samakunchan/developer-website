import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Header } from '../components/Header';
import { About } from '../components/About';
import { Footer } from '../components/Footer';
import '../styles/main.css';
import { getProfileAction } from '../features/profiles';

export const Route = createFileRoute('/about')({
  loader: async ({ context }) => {
    return {
      isConnected: context.session?.user.role === 'admin',
    };
  },
  component: AboutPage,
});

function AboutPage() {
  const { isConnected } = Route.useLoaderData();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfileAction(),
  });

  if (isLoading || !profile) {
    return (
      <>
        <Header isConnected={isConnected} />
        <main role="main">
          <div className="loading-state">
            <span className="material-symbols-outlined spin">sync</span>
            <p>Loading about page...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

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
        />
      </main>
      <Footer />
    </>
  );
}
