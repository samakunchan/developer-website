import { createFileRoute } from '@tanstack/react-router';
import { Header } from '../components/Header';
import { About } from '../components/About';
import { Footer } from '../components/Footer';
import '../styles/main.css';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Header />
      <About />
      <Footer />
    </>
  );
}
