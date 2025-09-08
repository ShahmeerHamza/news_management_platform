'use client';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/news/CategoryCard';
import { newsCategories } from '@/lib/data';
import { Plus, TrendingUp, FileEdit, Send } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome to News CMS</h1>
            <p className="text-muted-foreground mt-2">
              Manage news content, categories, and distribution channels from one central platform.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/edit">
                <Plus className="mr-2 h-4 w-4" />
                Create Article
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <Link href="/edit">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileEdit className="h-5 w-5 text-blue-600" />
                  Edit News
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create and edit news articles with our comprehensive editor.
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <Link href="/distribution">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Send className="h-5 w-5 text-green-600" />
                  Distribute Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Send news to multiple channels and track distribution.
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <Link href="/analytics">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  View Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Monitor performance and engagement metrics.
                </p>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* News Categories */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">News Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newsCategories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}