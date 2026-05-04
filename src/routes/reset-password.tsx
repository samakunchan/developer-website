import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { z } from 'zod';
import { ResetPassword } from '../features/auth/components/ResetPassword';
import { resetPasswordAction } from '../features/auth/utils/auth-actions.functions';

export const Route = createFileRoute('/reset-password')({
  validateSearch: z.object({
    token: z.string().optional(),
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const { token } = Route.useSearch();
  const resetPassword = useServerFn(resetPasswordAction);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) {
    return (
      <ResetPassword
        handleSubmit={async () => {}}
        isLoading={false}
        isSuccess={false}
        error="Invalid or missing reset token."
      />
    );
  }

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    try {
      const result = await resetPassword({
        data: {
          token,
          password,
          confirmPassword,
        },
      });
      if (result.success) {
        setIsSuccess(true);
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return <ResetPassword handleSubmit={handleSubmit} isLoading={isLoading} isSuccess={isSuccess} error={error} />;
}
