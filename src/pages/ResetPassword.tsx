import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SITE_NAME } from '@/constants/copy';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import logoSvg from '@/assets/logo.svg';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase auto-handles the recovery hash and creates a session
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') setReady(true);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Password updated! Redirecting...');
    setTimeout(() => navigate('/dashboard'), 1000);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <img src={logoSvg} alt={SITE_NAME} className="h-10 w-10 rounded-lg" />
            <span className="text-xl font-bold text-primary-foreground">{SITE_NAME}</span>
          </Link>
          <h1 className="text-2xl font-bold text-primary-foreground mb-2">Set a new password</h1>
          <p className="text-brand-blue-light/60 text-sm">Choose a strong password for your account</p>
        </div>

        <div className="bg-card rounded-xl p-6 md:p-8 card-shadow">
          {!ready ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Verifying reset link... If this persists, request a new link.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="password">New password</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 rounded-lg min-h-[44px]" required />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirm">Confirm password</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="pl-10 rounded-lg min-h-[44px]" required />
                </div>
              </div>
              <Button type="submit" className="w-full gradient-primary rounded-lg min-h-[44px] font-semibold" disabled={loading}>
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;