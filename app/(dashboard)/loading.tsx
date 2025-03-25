import { LoadingGrid } from '@/components/shared/LoadingPlaceholder';

export default function DashboardLoading() {
  return (
    <div className="container py-8">
      <LoadingGrid items={6} columns={3} />
    </div>
  );
} 