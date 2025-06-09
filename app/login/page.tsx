'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <Button 
          onClick={() => signIn('google')}
          className="w-full"
        >
          Entrar com Google
        </Button>
      </div>
    </div>
  );
}