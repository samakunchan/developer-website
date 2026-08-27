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
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export const ContactForm = () => {
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
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
      <div className="contact-form__group">
        <label htmlFor="name" className="contact-form__label">
          Name
        </label>
        <Input id="name" type="text" {...register('name')} aria-invalid={!!errors.name} />
        {errors.name && <p className="contact-form__error">{errors.name.message}</p>}
      </div>

      <div className="contact-form__group">
        <label htmlFor="email" className="contact-form__label">
          Email
        </label>
        <Input id="email" type="email" {...register('email')} aria-invalid={!!errors.email} />
        {errors.email && <p className="contact-form__error">{errors.email.message}</p>}
      </div>

      <div className="contact-form__group">
        <label htmlFor="message" className="contact-form__label">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          className="input contact-form__textarea"
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="contact-form__error">{errors.message.message}</p>}
      </div>

      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};
