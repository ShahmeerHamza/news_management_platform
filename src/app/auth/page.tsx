'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthTabs } from '@/components/auth/AuthTabs';
// import { AuthService } from '@/lib/auth';

export default function AuthPage() {
  // const router = useRouter();

  // useEffect(() => {
  //   if (AuthService.isAuthenticated()) {
  //     router.push('/dashboard');
  //   }
  // }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">News CMS Platform</h1>
          <p className="text-muted-foreground">
            Comprehensive news management and distribution system
          </p>
        </div>
        <AuthTabs />
      </div>
    </div>
  );
}