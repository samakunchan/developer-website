import React from 'react';

type ProfileAvatarCardProps = {
  name: string;
  title: string;
  image?: string | null;
  location?: string;
  isAvailable?: boolean;
};

export const ProfileAvatarCard: React.FC<ProfileAvatarCardProps> = ({
  name,
  title,
  image,
  location = 'Remote / Worldwide',
  isAvailable = true,
}) => {
  return (
    <div className="card card--centered card--glass">
      <img
        src={
          image ||
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDnxUSu47Vp-I9wnl33B443FbAlIF2hD2MheN_Z1XDSoyDj58l77URcdOJIA1T2_P3lH4g2E8Bjm7UZV0KsbrFeO4aRsSWYaYG8EZc8aHifiGl0_sbzhrvAP0n4qy9CAUOgH_a_MovstDCo152Lw-eSpxwfVIJPVDHWIkoMFC-k9XVM4Iqcj6K8vK0K79NMEQqZkG_pRWWypmBrfTz3MszI2vyrj2xyCo_aXPGN6qMgK_auaUGKtjVIY4A9SSEjg5r6jJG9PA6z4-E'
        }
        alt={name}
        className="avatar-card__image"
      />
      <h4 className="card__title">{name}</h4>
      <p className="card__subtitle">{title}</p>

      <div className="avatar-card__meta">
        <div className="avatar-card__meta-item">
          <span className="material-symbols-outlined card__icon-sm">location_on</span>
          {location}
        </div>
        {isAvailable && (
          <div className="avatar-card__meta-item avatar-card__status">
            <span className="material-symbols-outlined card__icon-sm">verified</span>
            Available for Hire
          </div>
        )}
      </div>
    </div>
  );
};
