import React from 'react';

type VisualIdentityProps = {
  avatar?: string | null;
  coverImage?: string | null;
  onAvatarChange?: (url: string) => void;
  onCoverChange?: (url: string) => void;
};

export const VisualIdentity: React.FC<VisualIdentityProps> = ({ avatar }) => {
  return (
    <section className="card card--auto card--light">
      <h3 className="admin-profiles__card-title card__title">
        <span className="material-symbols-outlined">image</span> Visual Identity
      </h3>
      <div className="visual-identity__content">
        <div className="visual-identity__avatar-wrapper">
          <button className="material-symbols-outlined visual-identity__avatar-edit-btn">edit</button>
          <img
            src={
              avatar ||
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDnxUSu47Vp-I9wnl33B443FbAlIF2hD2MheN_Z1XDSoyDj58l77URcdOJIA1T2_P3lH4g2E8Bjm7UZV0KsbrFeO4aRsSWYaYG8EZc8aHifiGl0_sbzhrvAP0n4qy9CAUOgH_a_MovstDCo152Lw-eSpxwfVIJPVDHWIkoMFC-k9XVM4Iqcj6K8vK0K79NMEQqZkG_pRWWypmBrfTz3MszI2vyrj2xyCo_aXPGN6qMgK_auaUGKtjVIY4A9SSEjg5r6jJG9PA6z4-E'
            }
            alt="Avatar"
            className="avatar-card__image"
          />
        </div>
        <div>
          <p className="visual-identity__hint">JPG or PNG. Max size 2MB. Recommended 400x400px.</p>
          <button className="admin-profiles__identity-avatar-btn material-symbols-outlined">photo_camera</button>
        </div>
      </div>
    </section>
  );
};
