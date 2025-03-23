import React from 'react';

interface TierBadgeProps {
  tier: 1 | 2 | 3;
  className?: string;
}

export const TierBadge = ({ tier, className }: TierBadgeProps) => {
  const tierColors = {
    1: 'bg-blue-100 text-blue-800 border-blue-300',
    2: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    3: 'bg-teal-100 text-teal-800 border-teal-300',
  };

  const tierLabels = {
    1: 'Tier 1: Bootcamp',
    2: 'Tier 2: Apprenticeship',
    3: 'Tier 3: Masters',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${tierColors[tier]} ${className || ''}`}>
      {tierLabels[tier]}
    </span>
  );
};
