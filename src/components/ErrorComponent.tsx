import React from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from './Button';

export enum ErrorType {
  NotFound = 'NotFound',
  UnAuthorize = 'UnAuthorize',
}

interface ErrorProps {
  type: ErrorType;
}

export const ErrorComponent: React.FC<ErrorProps> = ({ type }) => {
  const isNotFound: boolean = type === ErrorType.NotFound;

  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-glow"></div>
        <div className="error-content">
          <h1 className="error-code">{isNotFound ? '404' : '401'}</h1>
          <div className="error-divider"></div>
          <h2 className="error-title">{isNotFound ? 'Page Not Found' : 'Unauthorized Access'}</h2>
          <p className="error-description">
            {isNotFound
              ? "Oops! The page you're looking for doesn't exist or has been moved."
              : "Sorry, you don't have permission to access this page. Please log in to continue."}
          </p>
          <div className="error-actions">
            <Link to="/">
              <Button variant="primary" className="error-button">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
