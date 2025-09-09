'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { NewsEditForm } from '@/components/news/NewsEditForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { NewsItem } from '@/lib/types';
import Link from 'next/link';

export default function EditNewsItemPage() {
  const params = useParams();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock news data for demonstration
  const mockNewsItem: NewsItem = {
    id: params.id as string,
    title: 'Sample News Article for Editing',
    excerpt: 'This is a sample news article that demonstrates the editing interface.',
    content: 'This is the full content of the news article that can be edited using the comprehensive form interface. The content must be at least 160 characters long to meet the validation requirements set by the system.',
    source: 'Sample Source',
    timestamp: new Date().toISOString(),
    category: 'Technology',
    sourceURL: 'https://example.com/sample-article',
    language: 'en',
    direction: 'ltr',
    author: 'Sample Author'
  };

  useEffect(() => {
    // In a real application, this would fetch the news item from PocketBase
    setTimeout(() => {
      setNews(mockNewsItem);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

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
            <h1 className="text-3xl font-bold text-foreground">Edit: {news?.title}</h1>
            <p className="text-muted-foreground mt-1">
              Modify and redistribute this news article.
            </p>
          </div>
        </div>

        {news && (
          <NewsEditForm 
            initialNews={news} 
            onSave={() => console.log('Article updated!')} 
          />
        )}
      </div>
    </DashboardLayout>
  );
}