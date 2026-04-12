import React from 'react';

type PersonalDetailsCardProps = {
  email: string;
  experience?: number | null;
  focus?: string | null;
  languages?: string | null;
};

export const PersonalDetailsCard: React.FC<PersonalDetailsCardProps> = ({ email, experience, focus, languages }) => {
  return (
    <div className="card card--glass">
      <h4 className="card__title">
        Personal Details
        <span className="material-symbols-outlined text-primary text-xl">info</span>
      </h4>
      <div className="card__list">
        <div>
          <span className="card__subtitle card__subtitle--dense">Email Address</span>
          <p className="card__list-item card__list-item--bold">{email}</p>
        </div>
        <div>
          <span className="card__subtitle card__subtitle--dense">Experience</span>
          <p className="card__list-item card__list-item--bold">
            {experience ? `${experience}+ Years Professional` : '—'}
          </p>
        </div>
        <div>
          <span className="card__subtitle card__subtitle--dense">Current Focus</span>
          <p className="card__list-item card__list-item--bold">{focus || '—'}</p>
        </div>
        <div>
          <span className="card__subtitle card__subtitle--dense">Languages</span>
          <p className="card__list-item card__list-item--bold">{languages || '—'}</p>
        </div>
      </div>
    </div>
  );
};
