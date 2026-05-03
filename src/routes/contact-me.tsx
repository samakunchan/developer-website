import { createFileRoute } from '@tanstack/react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ContactMe } from '../components/ContactMe';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

export const Route = createFileRoute('/contact-me')({
  loader: async ({ context }) => {
    return {
      isConnected: context.session?.user.role === 'admin',
    };
  },
  component: () => (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <ContactMePage />
    </GoogleReCaptchaProvider>
  ),
});

function ContactMePage() {
  const { isConnected }: { isConnected: boolean } = Route.useLoaderData();

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
