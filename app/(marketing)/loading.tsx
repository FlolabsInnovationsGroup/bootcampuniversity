import { LoadingCard, LoadingGrid } from '@/components/shared/LoadingPlaceholder';

export default function MarketingLoading() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="container py-12">
        <LoadingCard lines={3} className="max-w-2xl mx-auto text-center" />
      </div>

      {/* Content Grid */}
      <div className="container">
        <LoadingGrid items={6} columns={3} />
      </div>
    </div>
  );
} 