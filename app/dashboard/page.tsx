"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { companies } from '@/lib/data';

export default function DashboardPage() {
  const [myCompanies] = useState(companies.slice(0, 3));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Link href="/">
            <Button variant="outline">Voltar ao site</Button>
          </Link>
        </div>

        {/* New Company Form */}
        <Card>
          <CardHeader>
            <CardTitle>Cadastrar Nova Empresa</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Minha Empresa Solar" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input id="city" placeholder="São Paulo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Input id="state" placeholder="SP" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Salvar</Button>
          </CardFooter>
        </Card>

        {/* My Companies List */}
        <div className="grid gap-6">
          {myCompanies.map((company) => (
            <Card key={company.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xl font-semibold">{company.name}</CardTitle>
                <Link href={`/empresa/${company.slug}`}>
                  <Button variant="outline" size="sm">Ver no site</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-2">{company.description}</p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Editar</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
