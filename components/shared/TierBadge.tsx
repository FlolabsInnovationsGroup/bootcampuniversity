import React from 'react';
import { Badge } from './Badge';
import { Gem } from 'lucide-react';

interface TierBadgeProps {
  tier: 1 | 2 | 3;
  className?: string;
  showIcon?: boolean;
}

export const TierBadge = ({ tier, className, showIcon = true }: TierBadgeProps) => {
  const tierConfig = {
    1: {
      variant: 'info' as const,
      label: 'Bootcamp',
      icon: <Gem className="mr-1 h-3 w-3" />,
    },
    2: {
      variant: 'default' as const,
      label: 'Apprenticeship',
      icon: <Gem className="mr-1 h-3 w-3" />,
    },
    3: {
      variant: 'success' as const,
      label: 'Masters',
      icon: <Gem className="mr-1 h-3 w-3 text-primary-500" />,
    },
  };

  const { variant, label, icon } = tierConfig[tier];

  return (
    <Badge
      variant={variant}
      className={[
        'font-medium transition-all duration-200',
        tier === 3 && 'ring-1 ring-primary-500/20 dark:ring-primary-400/20',
        className,
      ].join(' ')}
    >
      {showIcon && icon}
      Tier {tier}: {label}
    </Badge>
  );
};
