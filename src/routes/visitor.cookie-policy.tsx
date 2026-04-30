import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { RichTextReadOnly, getCookiePolicy } from '../features/rich-text';
import { Container } from '../components/Container';
import '../styles/main.css';
import { LoadingComponent } from '../components/LoadingComponent';

export const Route = createFileRoute('/visitor/cookie-policy')({
  loader: async ({ context }) => {
    return {
      isConnected: context.session?.user.role === 'admin',
    };
  },
  component: VisitorCookiePolicyPage,
});

function VisitorCookiePolicyPage() {
  const { isConnected } = Route.useLoaderData();

  const { data, isLoading } = useQuery({
    queryKey: ['rich-text', 'cookie-policy'],
    queryFn: () => getCookiePolicy(),
  });

  if (isLoading) {
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

  return (
    <>
      <Header isConnected={isConnected} />
      <main role="main">
        <section className="hero-visitor">
          <Container>
            <RichTextReadOnly title={data?.title || 'Cookie Policy'} content={data?.content as string} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
