'use client';

import { useState } from 'react';
import Link from 'next/link';
import { companies } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

export default function DashboardPage() {
  const [newCompany, setNewCompany] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Link href="/">
            <Button variant="outline">Voltar para o site</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Adicionar Empresa</CardTitle>
            <CardDescription>Cadastre uma nova empresa no portal.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Nome da empresa"
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
            />
            <Button disabled>Salvar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suas Empresas</CardTitle>
            <CardDescription>Gerencie as empresas cadastradas.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <Card key={company.id} className="flex flex-col justify-between">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    <CardDescription>
                      {company.location.city}, {company.location.state}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm text-gray-600 line-clamp-3">
                    {company.description}
                  </CardContent>
                  <CardFooter className="space-x-2">
                    <Link href={`/empresa/${company.slug}`}> 
                      <Button size="sm">Ver</Button>
                    </Link>
                    <Button size="sm" variant="outline" disabled>
                      Editar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
