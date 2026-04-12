import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema, PersonalInfoInput } from '../../utils/schemas';
import { Button } from '../../../../components/Button';

type PersonalInfoFormProps = {
  initialData?: Partial<PersonalInfoInput> & { email?: string };
  onSubmit: (data: PersonalInfoInput) => void;
};

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoInput>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: initialData?.fullName || '',
      professionalTitle: initialData?.professionalTitle || '',
      bio: initialData?.bio || '',
      experience: initialData?.experience || 0,
      focus: initialData?.focus || 'Web Performance',
      languages: initialData?.languages || '',
    } as Partial<PersonalInfoInput> & { email?: string },
  });

  return (
    <section className="card card--auto card--light">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="admin-profiles__form-grid">
          <div className="admin-profiles__form-group">
            <label htmlFor="fullName" className="admin-profiles__form-label">
              Full Name
            </label>
            <input id="fullName" {...register('fullName')} type="text" className="admin-profiles__form-input" />
            {errors.fullName && <span className="text-error text-xs">{errors.fullName.message}</span>}
          </div>
          <div className="admin-profiles__form-group">
            <label htmlFor="professionalTitle" className="admin-profiles__form-label">
              Professional Title
            </label>
            <input
              id="professionalTitle"
              {...register('professionalTitle')}
              type="text"
              className="admin-profiles__form-input"
            />
          </div>
          <div className="admin-profiles__form-group admin-profiles__form-grid-full">
            <label htmlFor="bio" className="admin-profiles__form-label">
              Bio
            </label>
            <textarea id="bio" {...register('bio')} className="admin-profiles__form-textarea" rows={6} />
          </div>
          <div className="admin-profiles__form-group">
            <label htmlFor="email" className="admin-profiles__form-label">
              Email Address
            </label>
            <p id="email" className="email">
              {initialData?.email || '—'}
            </p>
          </div>
          <div className="admin-profiles__form-group">
            <label htmlFor="experience" className="admin-profiles__form-label">
              Experience (Years)
            </label>
            <input
              id="experience"
              {...register('experience', { valueAsNumber: true })}
              type="number"
              className="admin-profiles__form-input"
            />
          </div>
          <div className="admin-profiles__form-group">
            <label htmlFor="focus" className="admin-profiles__form-label">
              Current Focus
            </label>
            <select id="focus" className="admin-profiles__form-select" {...register('focus')}>
              <option value="Edge Computing">Edge Computing</option>
              <option value="AI-First Applications">AI-First Applications</option>
              <option value="Web Performance">Web Performance</option>
            </select>
          </div>
          <div className="admin-profiles__form-group">
            <label htmlFor="languages" className="admin-profiles__form-label">
              Languages
            </label>
            <input id="languages" {...register('languages')} type="text" className="admin-profiles__form-input" />
          </div>
        </div>

        <div className="admin-profiles__form-actions">
          <Button type="submit" className="btn btn--primary">
            Save Personal Info
          </Button>
        </div>
      </form>
    </section>
  );
};
