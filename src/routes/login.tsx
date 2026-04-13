import { z } from 'zod';
import { useServerFn } from '@tanstack/react-start';
import { isSafeRedirect } from '../core/utils/url';
import { Login, signInAction } from '../features/auth';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirectTo: z.string().optional(),
  }),
  component: LoginPage,
});

function LoginPage() {
  const { redirectTo } = Route.useSearch();
  const signIn = useServerFn(signInAction);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: FormData = new FormData(event.currentTarget);
    const email: string = formData.get('email') as string;
    const password: string = formData.get('password') as string;

    try {
      const result: { success: boolean } = await signIn({ data: { email, password } });

      if (result?.success) {
        // After successful signin, redirect to the dashboard or the requested page
        const target = isSafeRedirect(redirectTo) ? redirectTo : '/admin/dashboard';
        navigate({ to: target });
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <>
      <Login handleSubmit={handleSubmit} />
    </>
  );
}
