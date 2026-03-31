import React from 'react';

export interface PricingFeature {
  text: React.ReactNode;
  included: boolean;
}

export interface PricingTierData {
  name: React.ReactNode;
  description: React.ReactNode;
  price?: string;
  priceSuffix: React.ReactNode;
  buttonText: React.ReactNode;
  features: PricingFeature[];
  isPopular?: boolean;
}
