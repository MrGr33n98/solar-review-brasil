'use client';

import { useEffect, useState } from 'react';
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
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { ContactRequest } from "@/types";

export default function DashboardPage() {
  const [newCompany, setNewCompany] = useState('');
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/contact?page=${page}&pageSize=${pageSize}`);
      if (res.ok) {
        const json = await res.json();
        setRequests(json.data);
        setTotal(json.total);
      }
    };
    load();
  }, [page]);

  const pageCount = Math.ceil(total / pageSize);

  const getCompanyName = (companyId?: string) => {
    if (!companyId) return "-";
    const company = companies.find((c) => c.id === companyId);
    return company ? company.name : "-";
  };

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

        <Card>
          <CardHeader>
            <CardTitle>Solicitações de Contato</CardTitle>
            <CardDescription>Gerencie as solicitações de contato recebidas.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Mensagem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.email}</TableCell>
                    <TableCell>{getCompanyName(r.companyId)}</TableCell>
                    <TableCell className="whitespace-pre-line">{r.message}</TableCell>
                  </TableRow>
                ))}
                {requests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      Nenhuma solicitação encontrada
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {pageCount > 1 && (
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((p) => Math.max(1, p - 1));
                      }}
                      className={page === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: pageCount }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={i + 1 === page}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(i + 1);
                        }}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((p) => Math.min(pageCount, p + 1));
                      }}
                      className={page === pageCount ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
