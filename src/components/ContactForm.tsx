import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './Button';
import { Input } from './Input';

// Define the schema using Zod
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.email({ message: 'Please provide a valid email.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    // Simulate an API call
    console.log('Form data submitted:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
    alert('Thank you for contacting us!');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '400px',
      }}
    >
      <div>
        <label
          htmlFor="name"
          style={{ display: 'block', marginBottom: '0.25rem' }}
        >
          Name
        </label>
        <Input
          id="name"
          type="text"
          {...register('name')}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p
            style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}
          >
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          style={{ display: 'block', marginBottom: '0.25rem' }}
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p
            style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          style={{ display: 'block', marginBottom: '0.25rem' }}
        >
          Message
        </label>
        {/* We reuse the generic input css for textarea as it's typically similar, or use a proper textarea style */}
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          className="input"
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p
            style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}
          >
            {errors.message.message}
          </p>
        )}
      </div>

      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
