'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [settings, setSettings] = useState({
    siteName: 'Innovation Bootcamp University',
    siteDescription: 'A Next.js-powered educational platform built on a cooperative education model.',
    contactEmail: 'analytics@flomadlabs.com',
    admissionsEmail: 'analytics@flomadlabs.com',
    enableRegistration: true,
    enablePublicCourses: true,
    requireEmailVerification: true,
    autoEnrollFreeCourses: true,
  });

  const [emailTemplates, setEmailTemplates] = useState({
    welcome: {
      subject: 'Welcome to Innovation Bootcamp University',
      body: 'Dear {name},\n\nWelcome to Innovation Bootcamp University! We\'re excited to have you join our learning community...',
    },
    courseEnrollment: {
      subject: 'Course Enrollment Confirmation',
      body: 'Dear {name},\n\nYou have successfully enrolled in {course}...',
    },
    courseCompletion: {
      subject: 'Course Completion Certificate',
      body: 'Dear {name},\n\nCongratulations on completing {course}...',
    },
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    newEnrollmentAlerts: true,
    courseCompletionAlerts: true,
    userRegistrationAlerts: true,
    dailyDigest: true,
    weeklyReport: true,
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch('/api/admin/settings');
        if (!response.ok) throw new Error('Failed to fetch settings');
        
        const data = await response.json();
        if (data.settings) setSettings(data.settings);
        if (data.emailTemplates) {
          const templates = data.emailTemplates.reduce((acc: any, template: any) => {
            acc[template.type] = {
              subject: template.subject,
              body: template.body,
            };
            return acc;
          }, {});
          setEmailTemplates(templates);
        }
        if (data.notifications) setNotifications(data.notifications);
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch settings. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsFetching(false);
      }
    }

    fetchSettings();
  }, []);

  async function saveSettings() {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings,
          emailTemplates,
          notifications,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save settings');
      }

      toast({
        title: 'Settings saved',
        description: 'Your changes have been saved successfully.',
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isFetching) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your platform settings and configurations
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure your platform's basic settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Registration</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow new users to register on the platform
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableRegistration}
                    onCheckedChange={(checked) => setSettings({ ...settings, enableRegistration: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Public Courses</Label>
                    <p className="text-sm text-muted-foreground">
                      Make courses visible to non-registered users
                    </p>
                  </div>
                  <Switch
                    checked={settings.enablePublicCourses}
                    onCheckedChange={(checked) => setSettings({ ...settings, enablePublicCourses: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>
                Customize your email notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(emailTemplates).map(([key, template]) => (
                <div key={key} className="space-y-4">
                  <h3 className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input
                      value={template.subject}
                      onChange={(e) => setEmailTemplates({
                        ...emailTemplates,
                        [key]: { ...template, subject: e.target.value },
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Body</Label>
                    <Textarea
                      value={template.body}
                      onChange={(e) => setEmailTemplates({
                        ...emailTemplates,
                        [key]: { ...template, body: e.target.value },
                      })}
                      rows={6}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for {key.toLowerCase().replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => setNotifications({
                      ...notifications,
                      [key]: checked,
                    })}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={saveSettings} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </div>
  );
}
