import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { Card, CardHeader, CardContent, CardFooter } from './Card';
import { Badge } from './Badge';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
  buttonVariant: 'primary' | 'outline';
  highlighted?: boolean;
  badge?: string;
}

interface PricingTableProps {
  tiers: PricingTier[];
}

export const PricingTable = ({ tiers }: PricingTableProps) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier, index) => (
          <Card
            key={tier.id}
            variant={tier.highlighted ? "gradient" : "default"}
            hover={true}
            className={`relative flex flex-col ${
              tier.highlighted
                ? 'ring-2 ring-primary-500 dark:ring-primary-400'
                : ''
            }`}
          >
            {tier.highlighted && (
              <div className="absolute -top-5 left-0 right-0 mx-auto w-fit">
                <Badge
                  variant="default"
                  className="border-2 border-primary-500/20"
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader>
              {tier.badge && (
                <Badge variant="secondary" className="w-fit">
                  {tier.badge}
                </Badge>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                    {tier.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {tier.description}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                    {tier.price}
                  </span>
                </div>
                <Button
                  href="/apply"
                  variant={tier.buttonVariant}
                  size="lg"
                  className="mt-6 w-full"
                >
                  {tier.buttonText}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <ul role="list" className="mt-2 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 flex-shrink-0 text-primary-500 dark:text-primary-400" />
                    <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-6">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Prices shown are in USD. Applicable taxes will be calculated at checkout.
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};