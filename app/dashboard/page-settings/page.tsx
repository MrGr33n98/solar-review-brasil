'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface PageFunction {
  id: number;
  name: string;
  key: string;
  content: string;
  content_type: string;
  is_active: boolean;
}

export default function PageSettings() {
  const [pageFunctions, setPageFunctions] = useState<PageFunction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPageFunctions = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/v1/page_functions');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setPageFunctions(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load page functions',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPageFunctions();
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Page Settings</h1>
      <div className="grid gap-4">
        {pageFunctions.map((func) => (
          <Card key={func.key}>
            <CardHeader>
              <CardTitle>{func.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-500">Key: {func.key}</p>
                <p className="text-sm">
                  Content: {func.content.substring(0, 100)}
                  {func.content.length > 100 ? '...' : ''}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className={func.is_active ? 'text-green-500' : 'text-red-500'}>
                    {func.is_active ? 'Active' : 'Inactive'}
                  </span>
                  <Button
                    onClick={() => window.location.href = `/dashboard/page-settings/${func.key}/edit`}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
