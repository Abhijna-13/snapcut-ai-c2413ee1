import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-primary-foreground mb-4">Page Not Found</h2>
        <p className="text-brand-blue-light/60 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="gradient-primary hover:opacity-90 rounded-lg min-h-[44px] px-8 gap-2">
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
