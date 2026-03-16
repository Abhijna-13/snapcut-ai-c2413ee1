import { useState } from 'react';
import { User, CreditCard, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { toast } from 'sonner';

const DashboardSettings = () => {
  const [fullName, setFullName] = useState('Demo User');
  const [email] = useState('demo@snapcut.ai');

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-2">Settings</h2>
        <p className="text-muted-foreground text-sm mb-8">Manage your account and preferences.</p>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-brand-surface rounded-lg p-1">
            <TabsTrigger value="profile" className="rounded-md gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <User size={14} /> Profile
            </TabsTrigger>
            <TabsTrigger value="billing" className="rounded-md gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <CreditCard size={14} /> Billing
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-md gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <Shield size={14} /> Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="bg-card rounded-xl p-6 card-shadow space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1.5 rounded-lg" />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={email} disabled className="mt-1.5 rounded-lg bg-brand-surface" />
            </div>
            <Button className="gradient-primary hover:opacity-90 rounded-lg min-h-[44px]" onClick={() => toast.success('Profile updated!')}>
              Save Changes
            </Button>
          </TabsContent>

          <TabsContent value="billing" className="bg-card rounded-xl p-6 card-shadow space-y-4">
            <div className="flex items-center justify-between p-4 bg-brand-surface rounded-lg">
              <div>
                <p className="text-sm font-semibold text-foreground">Current Plan</p>
                <p className="text-xs text-muted-foreground">Free — 3 images/day</p>
              </div>
              <Button variant="outline" className="rounded-lg" onClick={() => toast.info('Stripe not connected yet.')}>
                Manage Subscription
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Billing is managed through Stripe. Connect Lovable Cloud to enable.</p>
          </TabsContent>

          <TabsContent value="security" className="bg-card rounded-xl p-6 card-shadow space-y-6">
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">Change Password</h3>
              <div>
                <Label>New Password</Label>
                <Input type="password" placeholder="••••••••" className="mt-1.5 rounded-lg" />
              </div>
              <div>
                <Label>Confirm New Password</Label>
                <Input type="password" placeholder="••••••••" className="mt-1.5 rounded-lg" />
              </div>
              <Button className="gradient-primary hover:opacity-90 rounded-lg" onClick={() => toast.info('Auth not connected yet.')}>
                Update Password
              </Button>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-base font-semibold text-destructive mb-2">Danger Zone</h3>
              <p className="text-sm text-muted-foreground mb-4">Once you delete your account, there is no going back.</p>
              <Button variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/5 rounded-lg">
                Delete Account
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSettings;
