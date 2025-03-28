'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/forms/inputs';
import { Bell, Lock, User, Globe, Moon, Sun, Upload, Check } from 'lucide-react';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/shared/LoadingPlaceholder';

const settingsSections = [
  {
    id: 'profile',
    title: 'Profile Settings',
    icon: User,
    description: 'Manage your personal information and preferences.',
  },
  {
    id: 'notifications',
    title: 'Notification Settings',
    icon: Bell,
    description: 'Control how you receive notifications.',
  },
  {
    id: 'security',
    title: 'Security Settings',
    icon: Lock,
    description: 'Manage your account security and privacy.',
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: Globe,
    description: 'Customize how the application looks.',
  },
];

export default function SettingsPage() {
  const { data: session, status, update } = useSession();
  const [activeSection, setActiveSection] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Profile state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    image: ''
  });

  // Update profile state when session data is loaded
  useEffect(() => {
    if (session && session.user) {
      setProfileData({
        name: session.user.name || '',
        email: session.user.email || '',
        bio: (session.user as any).bio || '',
        image: session.user.image || ''
      });
    }
  }, [session]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update profile');
      }

      const data = await response.json();

      // Update the session with new user data
      await update({
        ...session,
        user: {
          ...session?.user,
          name: data.name,
          bio: data.bio
        }
      });

      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSettingsContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profile Picture</label>
              <div className="mt-2 flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {profileData.image ? (
                    <img 
                      src={profileData.image} 
                      alt={profileData.name || 'Profile picture'} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-gray-500" />
                  )}
                </div>
                <Button type="button" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Change Photo
                </Button>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Photo uploads are not yet implemented
              </p>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={profileData.name}
                onChange={handleProfileChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleProfileChange}
                placeholder="john@example.com"
                disabled
              />
              <p className="mt-1 text-xs text-gray-500">
                Email cannot be changed at this time
              </p>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={handleProfileChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                rows={4}
                placeholder="Tell us about yourself..."
              />
            </div>

            <Button 
              type="submit" 
              className="flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner className="h-4 w-4" />
                  Updating...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200">Email Notifications</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200">Course Updates</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about course content updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200">Message Notifications</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when you receive messages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
              <Input
                type="password"
                placeholder="Enter your current password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
              <Input
                type="password"
                placeholder="Enter your new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
              <Input
                type="password"
                placeholder="Confirm your new password"
              />
            </div>

            <div className="pt-4">
              <Button className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Update Password
              </Button>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200">Dark Mode</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between light and dark themes</p>
              </div>
              <button
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? (
                  <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200">Font Size</h4>
              <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your account settings and preferences.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-6">
        {/* Settings Navigation */}
        <div className="md:col-span-3 space-y-4">
          {settingsSections.map((section) => (
            <Card
              key={section.id}
              className={`p-4 cursor-pointer transition-colors ${
                activeSection === section.id
                  ? 'bg-primary-50 border-primary-200 dark:bg-primary-900/20 dark:border-primary-800'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              <div className="flex items-center space-x-3">
                <section.icon className={`h-5 w-5 ${
                  activeSection === section.id
                    ? 'text-primary-500 dark:text-primary-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`} />
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200">{section.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{section.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Settings Content */}
        <div className="md:col-span-9">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {settingsSections.find((s) => s.id === activeSection)?.title}
            </h2>
            {renderSettingsContent()}
          </Card>
        </div>
      </div>
    </div>
  );
} 