import React from 'react';
import { Container } from './Container';

interface Step {
  number: number;
  title: React.ReactNode;
  description: React.ReactNode;
}

interface ProcessProps {
  subtitle?: React.ReactNode;
  title?: React.ReactNode;
  steps: Step[];
  id?: string;
}

export function Process({ subtitle, title, steps, id }: ProcessProps) {
  return (
    <section className="process" id={id} aria-labelledby="process-title">
      <Container className="process__container">
        <div className="process__grid">
          <div className="process__content">
            {subtitle && <span className="process__subtitle">{subtitle}</span>}
            {title && (
              <h2 id="process-title" className="process__title">
                {title}
              </h2>
            )}
            <div className="process__steps">
              {steps.map((step) => (
                <div key={step.number} className="process__step">
                  <div className="process__step-number">{step.number}</div>
                  <div className="process__step-content">
                    <h5 className="process__step-title">{step.title}</h5>
                    <p className="process__step-description">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="process__terminal-wrapper">
            <div className="process__terminal">
              <div className="process__terminal-header">
                <div className="process__terminal-lights">
                  <div className="process__terminal-light process__terminal-light--red"></div>
                  <div className="process__terminal-light process__terminal-light--yellow"></div>
                  <div className="process__terminal-light process__terminal-light--green"></div>
                </div>
                <div className="process__terminal-tab"></div>
              </div>
              <div className="process__terminal-body">
                <div className="process__terminal-line">
                  <span className="process__terminal-line-number">01</span>
                  <pre className="process__terminal-code">
                    <span className="keyword">const</span>{' '}
                    <span className="property">project</span> = {'{'}
                  </pre>
                </div>
                <div className="process__terminal-line">
                  <span className="process__terminal-line-number">02</span>
                  <pre className="process__terminal-code">
                    <span className="indent"></span>name:{' '}
                    <span className="string">"Your Vision"</span>,
                  </pre>
                </div>
                <div className="process__terminal-line">
                  <span className="process__terminal-line-number">03</span>
                  <pre className="process__terminal-code">
                    <span className="indent"></span>status:{' '}
                    <span className="string">"Optimized"</span>,
                  </pre>
                </div>
                <div className="process__terminal-line">
                  <span className="process__terminal-line-number">04</span>
                  <pre className="process__terminal-code">
                    <span className="indent"></span>performance:{' '}
                    <span className="keyword">100</span>
                  </pre>
                </div>
                <div className="process__terminal-line">
                  <span className="process__terminal-line-number">05</span>
                  <pre className="process__terminal-code">{'}'};</pre>
                </div>
                <div className="process__terminal-line">
                  <span className="process__terminal-line-number">06</span>
                  <pre className="process__terminal-code mt-4">
                    <span className="function">deploy</span>(project);
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
