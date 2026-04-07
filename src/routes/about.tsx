import { createFileRoute } from '@tanstack/react-router';
import { Header } from '../components/Header';
import { About } from '../components/About';
import { Footer } from '../components/Footer';
import '../styles/main.css';

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
  return (
    <>
      <Header isConnected={isConnected} />
      <main role="main">
        <About />
      </main>
      <Footer />
    </>
  );
}
