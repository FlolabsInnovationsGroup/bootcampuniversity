import React from 'react';
import { Check } from 'lucide-react';
import { Button } from './Button';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
  buttonVariant: 'primary' | 'outline';
  highlighted?: boolean;
}

interface PricingTableProps {
  tiers: PricingTier[];
}

export const PricingTable = ({ tiers }: PricingTableProps) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`flex flex-col rounded-lg ${
              tier.highlighted
                ? 'bg-white shadow-xl ring-1 ring-blue-600 lg:shadow-xl'
                : 'bg-white shadow-md ring-1 ring-gray-200'
            }`}
          >
            <div className="p-8">
              <h3 className="text-lg font-semibold leading-8 text-gray-900">
                {tier.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price}</span>
              </p>
              <Button
                href="/apply"
                variant={tier.buttonVariant}
                fullWidth={true}
                className="mt-6"
              >
                {tier.buttonText}
              </Button>
            </div>
            <div className="flex flex-1 flex-col p-8">
              <div className="mt-2 flex flex-1 flex-col justify-between">
                <ul role="list" className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-6 w-6 flex-shrink-0 text-green-500" />
                      <span className="ml-3 text-sm leading-6 text-gray-600">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};