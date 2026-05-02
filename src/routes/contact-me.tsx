import { createFileRoute } from '@tanstack/react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ContactMe } from '../components/ContactMe';

export const Route = createFileRoute('/contact-me')({
  loader: async ({ context }) => {
    return {
      isConnected: context.session?.user.role === 'admin',
    };
  },
  component: ContactMePage,
});

function ContactMePage() {
  const { isConnected } = Route.useLoaderData();

  return (
    <>
      <Header isConnected={isConnected} />
      <main role="main">
        <ContactMe />
      </main>
      <Footer />
    </>
  );
}
