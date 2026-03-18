import { createFileRoute } from '@tanstack/react-router';
import { Header } from '../components/Header';
import '../styles/main.css';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
    </>
  );
}
