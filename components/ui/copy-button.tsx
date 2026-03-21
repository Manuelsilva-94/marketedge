'use client';

import { useState } from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function CopyButton({
  text,
  label = 'Copy Link',
  copiedLabel = 'Copied!',
  variant = 'outline',
  size = 'default',
  className
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const urlToCopy =
      text.startsWith('http') ? text : (typeof window !== 'undefined' ? window.location.origin : '') + (text.startsWith('/') ? text : '/' + text);
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn('gap-2', className)}
    >
      <Copy className="h-4 w-4 shrink-0" />
      {copied ? copiedLabel : label}
    </Button>
  );
}
