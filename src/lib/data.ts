import { NewsCategory } from './types';

export const newsCategories: NewsCategory[] = [
  {
    name: 'urdu',
    label: 'اردو',
    linkPage: '/news/urdu',
    cardType: 'primary'
  },
  {
    name: 'news',
    label: 'News',
    linkPage: '/news/general',
    cardType: 'secondary'
  },
  {
    name: 'sports',
    label: 'Sports',
    linkPage: '/news/sports',
    cardType: 'accent'
  },
  {
    name: 'business',
    label: 'Business',
    linkPage: '/news/business',
    cardType: 'primary'
  },
  {
    name: 'entertainment',
    label: 'Entertainment',
    linkPage: '/news/entertainment',
    cardType: 'secondary'
  },
  {
    name: 'lifestyle',
    label: 'Lifestyle',
    linkPage: '/news/lifestyle',
    cardType: 'accent'
  },
  {
    name: 'technology',
    label: 'Science & Technology',
    linkPage: '/news/technology',
    cardType: 'primary'
  }
];

export const availableLanguages = [
  { value: 'en', label: 'English' },
  { value: 'ur', label: 'اردو' },
  { value: 'ar', label: 'العربية' },
  { value: 'hi', label: 'हिन्दी' }
];

export const textDirections = [
  { value: 'ltr', label: 'Left to Right' },
  { value: 'rtl', label: 'Right to Left' }
];

export const distributionMediums = [
  { id: 'push', name: 'Push Notifications', type: 'push' },
  { id: 'sms', name: 'SMS Messaging', type: 'sms' },
  { id: 'broadcast', name: 'In-App Broadcast', type: 'broadcast' }
];

export const availableClients = [
  { id: 'mobile', name: 'Mobile App' },
  { id: 'web', name: 'Web Platform' },
  { id: 'newsletter', name: 'Newsletter' },
  { id: 'social', name: 'Social Media' }
];