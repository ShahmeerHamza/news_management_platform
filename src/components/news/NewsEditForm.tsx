'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Loader2, Save, Send } from 'lucide-react';
import { newsEditSchema, NewsEditForm as NewsEditFormData } from '@/lib/schemas';
import { NewsItem } from '@/lib/types';
import { NewsAPI } from '@/lib/api';
import { availableLanguages, textDirections, distributionMediums, availableClients } from '@/lib/data';

interface NewsEditFormProps {
  initialNews?: Partial<NewsItem>;
  onSave?: () => void;
}

export function NewsEditForm({ initialNews, onSave }: NewsEditFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDistributing, setIsDistributing] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const form = useForm<NewsEditFormData>({
    resolver: zodResolver(newsEditSchema),
    defaultValues: {
      title: initialNews?.title || '',
      category: initialNews?.category || '',
      content: initialNews?.content || '',
      language: initialNews?.language || 'en',
      direction: initialNews?.direction || 'ltr',
      sourceURL: initialNews?.sourceURL || '',
      clients: [],
      mediums: []
    }
  });

  async function onSubmit(data: NewsEditFormData) {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await NewsAPI.saveNewsEdit(data);
      await NewsAPI.logActivity('news_edited', { title: data.title, category: data.category });
      setSuccess('News article saved successfully!');
      onSave?.();
    } catch (err) {
      setError('Failed to save news article. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  async function onDistribute() {
    const data = form.getValues();
    if (!data.mediums.length || !data.clients.length) {
      setError('Please select at least one medium and one client for distribution.');
      return;
    }

    setIsDistributing(true);
    setError('');

    try {
      await NewsAPI.distributeNews(initialNews?.id || 'new', data.mediums, data.clients);
      await NewsAPI.logActivity('news_distributed', { 
        title: data.title, 
        mediums: data.mediums, 
        clients: data.clients 
      });
      setSuccess('News distributed successfully!');
    } catch (err) {
      setError('Distribution failed. Please try again.');
    } finally {
      setIsDistributing(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {(success || error) && (
        <Alert className={success ? "border-green-200 bg-green-50" : "border-destructive bg-destructive/10"}>
          <AlertDescription className={success ? "text-green-800" : "text-destructive"}>
            {success || error}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Edit News Article
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>News Title *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter compelling news title..." 
                          disabled={isLoading}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Sports, Business, Technology" 
                          disabled={isLoading}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger disabled={isLoading}>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableLanguages.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="direction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Text Direction</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger disabled={isLoading}>
                            <SelectValue placeholder="Select direction" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {textDirections.map((dir) => (
                            <SelectItem key={dir.value} value={dir.value}>
                              {dir.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="sourceURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source URL *</FormLabel>
                    <FormControl>
                      <Input 
                        type="url"
                        placeholder="https://example.com/news-article" 
                        disabled={isLoading}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>News Content *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter the full news content here. Minimum 160 characters required."
                        className="min-h-[200px] resize-none"
                        disabled={isLoading}
                        {...field} 
                      />
                    </FormControl>
                    <div className="text-xs text-muted-foreground">
                      {field.value?.length || 0} / 160 minimum characters
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Distribution Settings</h3>
                
                <FormField
                  control={form.control}
                  name="mediums"
                  render={() => (
                    <FormItem>
                      <FormLabel>Distribution Mediums *</FormLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {distributionMediums.map((medium) => (
                          <FormField
                            key={medium.id}
                            control={form.control}
                            name="mediums"
                            render={({ field }) => (
                              <FormItem
                                key={medium.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(medium.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, medium.id])
                                        : field.onChange(
                                            field.value?.filter((value) => value !== medium.id)
                                          );
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm font-medium">
                                    {medium.name}
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="clients"
                  render={() => (
                    <FormItem>
                      <FormLabel>Target Clients *</FormLabel>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {availableClients.map((client) => (
                          <FormField
                            key={client.id}
                            control={form.control}
                            name="clients"
                            render={({ field }) => (
                              <FormItem
                                key={client.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(client.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, client.id])
                                        : field.onChange(
                                            field.value?.filter((value) => value !== client.id)
                                          );
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm font-medium">
                                    {client.name}
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Save className="mr-2 h-4 w-4" />
                  Save Article
                </Button>
                
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={onDistribute}
                  disabled={isDistributing || isLoading}
                  className="flex-1"
                >
                  {isDistributing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Send className="mr-2 h-4 w-4" />
                  Distribute Now
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}