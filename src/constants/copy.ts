import type { PricingPlan } from '@/types';

export const SITE_NAME = 'SnapCut AI';
export const SITE_TAGLINE = 'Remove Backgrounds Instantly with AI';
export const SITE_DESCRIPTION = 'Professional-grade background removal powered by AI. Upload your image and get a clean, transparent PNG in seconds.';

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Upload Your Image',
    description: 'Drag and drop or select any JPG, PNG, or WEBP image up to 10MB.',
  },
  {
    step: '02',
    title: 'AI Removes Background',
    description: 'Our AI processes your image in seconds with surgical precision.',
  },
  {
    step: '03',
    title: 'Download Result',
    description: 'Get your transparent PNG ready for any project. No watermarks.',
  },
] as const;

export const FEATURES = [
  {
    title: 'AI-Powered Precision',
    description: 'Advanced neural networks detect subjects with pixel-perfect accuracy.',
    icon: 'Zap',
  },
  {
    title: 'Lightning Fast',
    description: 'Process images in under 5 seconds. No waiting around.',
    icon: 'Timer',
  },
  {
    title: 'HD Quality Output',
    description: 'Export high-resolution transparent PNGs without quality loss.',
    icon: 'ImageUp',
  },
  {
    title: 'Batch Processing',
    description: 'Process multiple images at once with our Business plan.',
    icon: 'Layers',
  },
  {
    title: 'Secure & Private',
    description: 'Images are auto-deleted after 60 minutes. Your data stays yours.',
    icon: 'Shield',
  },
  {
    title: 'API Access',
    description: 'Integrate background removal into your own apps with our API.',
    icon: 'Code',
  },
] as const;

export const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'E-commerce Manager',
    content: 'SnapCut AI saved our team 20+ hours per week on product photo editing. The quality is indistinguishable from manual work.',
    avatar: 'PS',
  },
  {
    name: 'Arjun Patel',
    role: 'Freelance Designer',
    content: 'I switched from Photoshop for background removal. SnapCut is faster and the edge detection is remarkably accurate.',
    avatar: 'AP',
  },
  {
    name: 'Meera Krishnan',
    role: 'Marketing Lead',
    content: 'The API integration was seamless. We process thousands of images daily without any issues. Incredible reliability.',
    avatar: 'MK',
  },
] as const;

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Free',
    plan: 'free',
    price: '₹0',
    priceAmount: 0,
    period: 'forever',
    description: 'Perfect for trying out SnapCut AI',
    features: [
      '3 images per day',
      'Standard quality PNG',
      'Basic background removal',
      'Web download only',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Pro',
    plan: 'pro',
    price: '₹499',
    priceAmount: 499,
    period: '/month',
    description: 'For professionals who need more power',
    features: [
      'Unlimited images',
      'HD quality output',
      'Priority processing',
      'Processing history',
      'Email support',
    ],
    cta: 'Upgrade to Pro',
    popular: true,
  },
  {
    name: 'Business',
    plan: 'business',
    price: '₹1,499',
    priceAmount: 1499,
    period: '/month',
    description: 'For teams and enterprises',
    features: [
      'Everything in Pro',
      'API access',
      'Bulk processing',
      'Priority support',
      'Custom integrations',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export const FAQ_ITEMS = [
  {
    question: 'How does the free plan work?',
    answer: 'The free plan gives you 3 image credits per day that reset at midnight UTC. You can process JPG, PNG, or WEBP images up to 10MB each.',
  },
  {
    question: 'What happens to my images after processing?',
    answer: 'All images are automatically deleted from our servers after 60 minutes. We never store your images permanently.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your Pro or Business subscription at any time. Your plan will remain active until the end of the current billing period.',
  },
  {
    question: 'What image formats are supported?',
    answer: 'We support JPG, PNG, and WEBP formats. The maximum file size is 10MB. Output is always a transparent PNG.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a full refund within the first 7 days of your subscription if you\'re not satisfied with the service.',
  },
  {
    question: 'How does API access work?',
    answer: 'Business plan subscribers get API access with authentication tokens. You can integrate SnapCut AI directly into your applications.',
  },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'API Docs', href: '#' },
  ],
  company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
} as const;

export const UPLOAD_CONFIG = {
  maxSize: 10 * 1024 * 1024, // 10MB
  acceptedFormats: ['image/jpeg', 'image/png', 'image/webp'],
  acceptedExtensions: '.jpg,.jpeg,.png,.webp',
} as const;

export const CREDIT_PACKS = [
  { credits: 10, price: '₹99', priceAmount: 99 },
  { credits: 50, price: '₹399', priceAmount: 399 },
] as const;
