import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { RichTextReadOnly, getCGU } from '../features/rich-text';
import { Container } from '../components/Container';
import '../styles/main.css';
import { LoadingComponent } from '../components/LoadingComponent';

export const Route = createFileRoute('/visitor/cgu')({
  component: VisitorCGUPage,
});

function VisitorCGUPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['rich-text', 'cgu'],
    queryFn: () => getCGU(),
  });

  if (isLoading) {
    return (
      <>
        <Header />
        <main role="main">
          <LoadingComponent />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main role="main">
        <section className="hero-visitor">
          <Container>
            <RichTextReadOnly title={data?.title || 'CGU'} content={data?.content as string} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
