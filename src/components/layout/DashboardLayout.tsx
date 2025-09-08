'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { AuthService } from '@/lib/auth';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  // const router = useRouter();

  // useEffect(() => {
  //   const checkAuth = () => {
  //     const authenticated = AuthService.isAuthenticated();
  //     setIsAuthenticated(authenticated);
      
  //     if (!authenticated) {
  //       router.push('/auth');
  //     }
  //   };

  //   checkAuth();
  // }, [router]);

  // if (isAuthenticated === null) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">Loading...</div>
  //     </div>
  //   );
  // }

  // if (!isAuthenticated) {
  //   return null;
  // }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}