export type PlanType = 'free' | 'pro' | 'business';

export interface UserProfile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  plan: PlanType;
  credits: number;
  created_at: string;
}

export interface ProcessingRecord {
  id: string;
  user_id: string;
  original_url: string;
  processed_url: string | null;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  expires_at: string | null;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  plan: PlanType;
  status: string;
  current_period_end: string;
}

export interface PricingPlan {
  name: string;
  plan: PlanType;
  price: string;
  priceAmount: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}
