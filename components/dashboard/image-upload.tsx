/** @jsxRuntime classic */
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ImagePlus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  aspectRatio?: string;
  maxWidth?: string;
}

export function ImageUpload({
  label,
  value,
  onChange,
  onRemove,
  aspectRatio = '3/2',
  maxWidth = 'max-w-[768px]',
}: ImageUploadProps) {
  const [dragActive, setDragActive] = React.useState(false);
  const { toast } = useToast();

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_FILE_TYPES.includes(file.type as typeof ALLOWED_FILE_TYPES[number])) {
      return 'Tipo de arquivo inválido. Por favor, use PNG, JPG ou WEBP.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'Arquivo muito grande. O tamanho máximo é 4MB.';
    }
    return null;
  };

  const handleUpload = React.useCallback(async (file: File) => {
    const error = validateFile(file);
    if (error) {
      toast({
        title: 'Erro ao validar arquivo',
        description: error,
        variant: 'destructive',
      });
      return;
    }

    try {
      // Show preview immediately
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          onChange(result);
        }
      };
      reader.readAsDataURL(file);

      // Prepare form data for upload
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json() as { url: string };
      onChange(data.url);

      toast({
        title: 'Upload concluído',
        description: 'A imagem foi enviada com sucesso.',
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Erro ao fazer upload',
        description: 'Ocorreu um erro ao fazer upload da imagem. Tente novamente.',
        variant: 'destructive',
      });
    }
  }, [onChange, toast]);

  const handleDrag = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer?.files?.[0];
    if (file) {
      handleUpload(file);
    }
  }, [handleUpload]);

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      handleUpload(file);
    }
  }, [handleUpload]);

  return React.createElement('div', { className: 'space-y-4' },
    React.createElement(Label, null, label),
    React.createElement(Card, { className: cn(maxWidth, 'w-full') },
      React.createElement(CardContent, { className: 'p-0' },
        React.createElement('div', {
          className: cn(
            'relative flex flex-col items-center justify-center gap-4 border-2 border-dashed transition-colors',
            dragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25',
            value ? 'p-0' : 'p-8'
          ),
          onDragEnter: handleDrag,
          onDragLeave: handleDrag,
          onDragOver: handleDrag,
          onDrop: handleDrop,
        }, value ? [
          React.createElement('div', {
            key: 'preview',
            className: 'relative w-full',
            style: { aspectRatio }
          },
            React.createElement(Image, {
              src: value,
              alt: label,
              fill: true,
              className: 'object-cover'
            })
          ),
          React.createElement('div', {
            key: 'actions',
            className: 'absolute bottom-4 right-4 flex gap-2'
          },
            React.createElement(Button, {
              variant: 'destructive',
              size: 'icon',
              onClick: onRemove,
              type: 'button'
            },
              React.createElement(Trash, {
                className: 'h-4 w-4'
              })
            )
          )
        ] : [
          React.createElement(ImagePlus, {
            key: 'icon',
            className: 'h-8 w-8 text-muted-foreground'
          }),
          React.createElement('div', {
            key: 'text',
            className: 'flex flex-col items-center gap-1 text-center'
          },
            React.createElement('p', {
              className: 'text-sm font-medium text-muted-foreground'
            }, 'Arraste uma imagem ou clique para fazer upload'),
            React.createElement('p', {
              className: 'text-xs text-muted-foreground'
            }, 'PNG, JPG ou WEBP (max. 4MB)')
          ),
          React.createElement('input', {
            key: 'input',
            type: 'file',
            accept: ALLOWED_FILE_TYPES.join(','),
            className: 'absolute inset-0 cursor-pointer opacity-0',
            onChange: handleChange
          })
        ])
      ))
  );
}
