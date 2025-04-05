'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/forms/inputs';
import { LoadingSpinner } from '@/components/shared/LoadingPlaceholder';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Registration is disabled - redirect to login
    router.push('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user types
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="p-8 space-y-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create an account</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join Innovation Bootcamp University and start your journey
          </p>
        </div>

        {/* Registration disabled notice */}
        <div className="p-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <strong>Registration is temporarily disabled</strong>
          <p className="mt-1">We're preparing for our official launch. Please check back soon!</p>
          <div className="mt-8 text-sm text-slate-600 dark:text-slate-400">
            <p>This registration is for student accounts only. Contact us to create accounts for instructors or advisors.</p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">Note: You can register an admin account with email <code>analytics.flomad@gmail.com</code> by contacting the development team.</p>
          </div>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={true}
              autoComplete="name"
            />
          </div>
          <div>
            <Input
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={true}
              autoComplete="email"
            />
          </div>
          <div>
            <Input
              type="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={true}
              autoComplete="new-password"
            />
          </div>
          <div>
            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={true}
              autoComplete="new-password"
            />
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                required
                disabled={true}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span>
                I agree to the{' '}
                <Link
                  href="/legal/terms"
                  className="text-primary hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/legal/privacy"
                  className="text-primary hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={true}
          >
            Registration Disabled
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-primary hover:text-primary-600 dark:hover:text-primary-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
} 