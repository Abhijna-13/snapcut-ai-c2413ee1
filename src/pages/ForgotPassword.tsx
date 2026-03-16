import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SITE_NAME } from '@/constants/copy';
import { toast } from 'sonner';
import logoSvg from '@/assets/logo.svg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` })
    toast.info('Supabase Auth not connected yet. Connect Lovable Cloud to enable password reset.');
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <img src={logoSvg} alt={SITE_NAME} className="h-10 w-10 rounded-lg" />
            <span className="text-xl font-bold text-primary-foreground">{SITE_NAME}</span>
          </Link>
          <h1 className="text-2xl font-bold text-primary-foreground mb-2">Reset your password</h1>
          <p className="text-brand-blue-light/60 text-sm">We'll send you a link to reset your password</p>
        </div>

        <div className="bg-card rounded-xl p-6 md:p-8 card-shadow">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
                <Mail className="text-success" size={24} />
              </div>
              <h3 className="text-foreground font-semibold mb-2">Check your email</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <Button variant="outline" className="rounded-lg" onClick={() => setSent(false)}>
                Try another email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 rounded-lg min-h-[44px]" required />
                </div>
              </div>
              <Button type="submit" className="w-full gradient-primary hover:opacity-90 rounded-lg min-h-[44px] font-semibold" disabled={loading}>
                Send Reset Link
              </Button>
            </form>
          )}
        </div>

        <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-brand-blue-light/50 hover:text-brand-blue-light mt-6 transition-colors">
          <ArrowLeft size={14} />
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
