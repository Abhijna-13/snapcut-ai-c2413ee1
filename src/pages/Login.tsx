import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SITE_NAME } from '@/constants/copy';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import logoSvg from '@/assets/logo.svg';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Welcome back!');
    navigate('/dashboard');
  };

  const handleGoogleLogin = async () => {
    const result = await lovable.auth.signInWithOAuth('google', {
      redirect_uri: `${window.location.origin}/dashboard`,
    });
    if (result.error) {
      toast.error('Google sign-in failed');
      return;
    }
    if (!result.redirected) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <img src={logoSvg} alt={SITE_NAME} className="h-10 w-10 rounded-lg" />
            <span className="text-xl font-bold text-primary-foreground">{SITE_NAME}</span>
          </Link>
          <h1 className="text-2xl font-bold text-primary-foreground mb-2">Welcome back</h1>
          <p className="text-brand-blue-light/60 text-sm">Sign in to your account to continue</p>
        </div>

        <div className="bg-card rounded-xl p-6 md:p-8 card-shadow">
          <Button
            variant="outline"
            className="w-full mb-6 min-h-[44px] rounded-lg border-border hover:bg-accent"
            onClick={handleGoogleLogin}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-3 text-muted-foreground">or sign in with email</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 rounded-lg min-h-[44px]"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 rounded-lg min-h-[44px]"
                  required
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full gradient-primary hover:opacity-90 transition-opacity duration-150 rounded-lg min-h-[44px] font-semibold" disabled={loading}>
              {loading ? <span className="animate-spin mr-2">⏳</span> : null}
              Sign In
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-brand-blue-light/50 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">Sign up free</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
