import { createFileRoute, notFound } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { ForgotPassword } from '../features/auth/components/ForgotPassword';
import { requestPasswordResetActionForDev } from '../features/auth/utils/auth-actions.functions';

export const Route = createFileRoute('/forgot-password')({
  // Route disabled until the backend is ready
  beforeLoad() {
    if (process.env.NODE_ENV === 'production') {
      throw notFound();
    }
  },
  head: () => ({
    meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const requestReset = useServerFn(requestPasswordResetActionForDev);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;

    try {
      const result = await requestReset({ data: { email } });
      if (result.success) {
        setIsSuccess(true);
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return <ForgotPassword handleSubmit={handleSubmit} isLoading={isLoading} isSuccess={isSuccess} error={error} />;
}
