import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NewsCategory } from '@/lib/types';
import { Newspaper, TrendingUp, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: NewsCategory;
}

const cardTypeStyles = {
  primary: 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 hover:border-blue-300',
  secondary: 'bg-gradient-to-br from-slate-50 to-gray-100 border-slate-200 hover:border-slate-300',
  accent: 'bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200 hover:border-orange-300'
};

const iconMap = {
  urdu: Globe,
  news: Newspaper,
  sports: TrendingUp,
  business: TrendingUp,
  entertainment: Newspaper,
  lifestyle: Globe,
  technology: TrendingUp
};

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.name as keyof typeof iconMap] || Newspaper;
  const cardStyle = cardTypeStyles[category.cardType as keyof typeof cardTypeStyles] || cardTypeStyles.primary;

  return (
    <Link href={category.linkPage} className="group">
      <Card className={cn(
        "transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer",
        cardStyle
      )}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Icon className="h-8 w-8 text-primary opacity-70" />
            {/* <Badge variant="secondary" className="text-xs">
              {category.cardType}
            </Badge> */}
          </div>
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {category.label}
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Browse latest {category.label.toLowerCase()} articles
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}