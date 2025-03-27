'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/LoadingPlaceholder';

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'Innovation Bootcamp University',
    maintenanceMode: false,
    enableRegistration: true,
    enableOAuth: true,
    googleOAuthEnabled: true,
    githubOAuthEnabled: true,
    maxUploadSize: '10',
    maxCoursesPerUser: '10',
  });

  const handleSettingsChange = (field: string, value: string | boolean) => {
    setSiteSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggleChange = (key: string, checked: boolean) => {
    setSiteSettings({
      ...siteSettings,
      [key]: checked
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // In a real app, you'd make an API call to save the settings
    // try {
    //   const response = await fetch('/api/admin/settings', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(siteSettings),
    //   });
    //   
    //   if (!response.ok) throw new Error('Failed to save settings');
    // } catch (err) {
    //   setError(err.message || 'Something went wrong');
    // }
    
    setSaving(false);
    setSaved(true);
    
    // Reset the "saved" state after 3 seconds
    setTimeout(() => setSaved(false), 3000);
  };
  
  if (status === 'loading') {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }
  
  if (!session?.user || session.user.role !== 'admin') {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle />
            <CardTitle>Access Denied</CardTitle>
          </div>
          <CardDescription>
            You don't have permission to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Please contact an administrator if you believe this is an error.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground">
          Configure system-wide settings for your platform.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure general platform settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="siteName">Site Name</Label>
                <Input 
                  id="siteName" 
                  value={siteSettings.siteName}
                  onChange={(e) => handleSettingsChange('siteName', e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <Label htmlFor="maintenanceMode" className="block">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Put the site in maintenance mode. Only admins can access when enabled.
                  </p>
                </div>
                <Switch 
                  id="maintenanceMode" 
                  checked={siteSettings.maintenanceMode}
                  onCheckedChange={(checked: boolean) => handleSettingsChange('maintenanceMode', checked)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => window.location.reload()}>
                Reset
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving
                  </>
                ) : saved ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="authentication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Settings</CardTitle>
              <CardDescription>
                Configure authentication and registration settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <Label htmlFor="enableRegistration" className="block">Enable Registration</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow new users to register on the platform.
                  </p>
                </div>
                <Switch 
                  id="enableRegistration" 
                  checked={siteSettings.enableRegistration}
                  onCheckedChange={(checked: boolean) => handleSettingsChange('enableRegistration', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <Label htmlFor="enableOAuth" className="block">Enable OAuth</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow users to sign in with social providers.
                  </p>
                </div>
                <Switch 
                  id="enableOAuth" 
                  checked={siteSettings.enableOAuth}
                  onCheckedChange={(checked: boolean) => handleSettingsChange('enableOAuth', checked)}
                />
              </div>
              
              {siteSettings.enableOAuth && (
                <div className="space-y-3 pl-6 mt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="googleOAuthEnabled">Google Sign-in</Label>
                    <Switch 
                      id="googleOAuthEnabled" 
                      checked={siteSettings.googleOAuthEnabled}
                      onCheckedChange={(checked: boolean) => handleSettingsChange('googleOAuthEnabled', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="githubOAuthEnabled">GitHub Sign-in</Label>
                    <Switch 
                      id="githubOAuthEnabled" 
                      checked={siteSettings.githubOAuthEnabled}
                      onCheckedChange={(checked: boolean) => handleSettingsChange('githubOAuthEnabled', checked)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => window.location.reload()}>
                Reset
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving
                  </>
                ) : saved ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>
                Configure content and upload settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="maxUploadSize">Max Upload Size (MB)</Label>
                <Input 
                  id="maxUploadSize" 
                  value={siteSettings.maxUploadSize}
                  onChange={(e) => handleSettingsChange('maxUploadSize', e.target.value)}
                />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="maxCoursesPerUser">Max Courses Per User</Label>
                <Input 
                  id="maxCoursesPerUser" 
                  value={siteSettings.maxCoursesPerUser}
                  onChange={(e) => handleSettingsChange('maxCoursesPerUser', e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => window.location.reload()}>
                Reset
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving
                  </>
                ) : saved ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security settings for your platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Security settings will be implemented in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
