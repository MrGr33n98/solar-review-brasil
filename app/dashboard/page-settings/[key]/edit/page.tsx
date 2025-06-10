'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface PageFunction {
  id: number;
  name: string;
  key: string;
  content: string;
  content_type: string;
  is_active: boolean;
}

export default function EditPageFunction() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [pageFunction, setPageFunction] = useState<PageFunction | null>(null);
  const [content, setContent] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageFunction = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/v1/page_functions/${params.key}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setPageFunction(data);
        setContent(data.content);
        setIsActive(data.is_active);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load page function',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (params.key) {
      fetchPageFunction();
    }
  }, [params.key]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3002/api/v1/page_functions/${params.key}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page_function: {
            content,
            is_active: isActive,
          },
        }),
      });

      if (!response.ok) throw new Error('Failed to update');

      toast({
        title: 'Success',
        description: 'Page function updated successfully',
      });

      router.push('/dashboard/page-settings');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update page function',
        variant: 'destructive',
      });
    }
  };

  if (loading || !pageFunction) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Page Function</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label>Name</Label>
              <p className="text-gray-500">{pageFunction.name}</p>
            </div>
            
            <div>
              <Label>Key</Label>
              <p className="text-gray-500">{pageFunction.key}</p>
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is-active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="is-active">Active</Label>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard/page-settings')}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
