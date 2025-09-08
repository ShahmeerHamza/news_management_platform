'use client';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CategoryCard } from '@/components/news/CategoryCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { newsCategories } from '@/lib/data';
import { Newspaper } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">News Categories</h1>
          <p className="text-muted-foreground mt-2">
            Browse and manage news content across different categories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newsCategories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="h-5 w-5" />
              Category Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Categories are currently managed through the system configuration. 
              Each category supports multiple news sources and can be customized for specific regions and languages.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}