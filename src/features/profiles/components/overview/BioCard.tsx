import React from 'react';

type BioCardProps = {
  title: string;
  bio: string;
};

export const BioCard: React.FC<BioCardProps> = ({ title, bio }) => {
  return (
    <div className="card card--auto card--light">
      <span className="card__subtitle">Identité du développeur</span>
      <h3 className="card__title">{title}</h3>
      <p className="card__description">{bio}</p>
    </div>
  );
};
