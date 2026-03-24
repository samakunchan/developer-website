import { Container } from './Container';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" aria-labelledby="footer-brand">
      <Container>
        <div className="footer__wrapper">
          <div className="footer__brand" id="footer-brand">
            <span
              className="material-symbols-outlined footer__logo-icon"
              aria-hidden="true"
            >
              terminal
            </span>
            <h2 className="footer__logo-text">DevPort</h2>
          </div>

          <div className="footer__copyright">
            <Trans>
              © {currentYear} DevPort Freelance Studio. All rights reserved.
            </Trans>
          </div>

          <div className="footer__socials" aria-label={t`Social media links`}>
            <a
              href="mailto:contact@devport.com"
              className="footer__social-link"
              aria-label={t`Email`}
            >
              <span className="material-symbols-outlined">alternate_email</span>
            </a>
            <a
              href="https://github.com/samakunchan"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label={t`GitHub`}
            >
              <span className="material-symbols-outlined">hub</span>
            </a>
            <a
              href="#"
              className="footer__social-link"
              aria-label={t`Twitter / X`}
            >
              <span className="material-symbols-outlined">share</span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
