'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ContactFormProps {
  companyId?: string;
}

export function ContactForm({ companyId }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId, name, email, phone, message }),
      });
      if (res.ok) {
        toast({ title: 'Mensagem enviada', description: 'Entraremos em contato em breve.' });
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        toast({ title: 'Erro ao enviar', description: 'Tente novamente.' });
      }
    } catch (err) {
      toast({ title: 'Erro ao enviar', description: 'Tente novamente.' });
    }
    setLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
      </div>
      <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  );
}
