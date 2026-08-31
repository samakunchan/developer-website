import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { RichTextReadOnly, getLegalMentions } from '../features/rich-text';
import { Container } from '../components/Container';
import '../styles/main.css';

export const Route = createFileRoute('/visitor/legals-mentions')({
  component: VisitorLegalMentionsPage,
});

function VisitorLegalMentionsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['rich-text', 'legals-mentions'],
    queryFn: () => getLegalMentions(),
  });

  if (isLoading) {
    return (
      <>
        <Header />
        <main role="main">
          <div className="loading-state">
            <span className="material-symbols-outlined spin">sync</span>
            <p>Loading...</p>
          </div>
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
            <RichTextReadOnly title={data?.title || 'Legal Mentions'} content={data?.content as string} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
