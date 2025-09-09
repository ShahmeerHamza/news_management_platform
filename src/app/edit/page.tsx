'use client';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { NewsEditForm } from '@/components/news/NewsEditForm';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EditNewsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit News Article</h1>
            <p className="text-muted-foreground mt-1">
              Create and distribute news content across multiple channels.
            </p>
          </div>
        </div>

        <NewsEditForm onSave={() => console.log('Article saved!')} />
      </div>
    </DashboardLayout>
  );
}