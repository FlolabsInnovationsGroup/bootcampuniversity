import { LoadingCard } from '@/components/shared/LoadingPlaceholder';

export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <LoadingCard lines={4} />
      </div>
    </div>
  );
} 