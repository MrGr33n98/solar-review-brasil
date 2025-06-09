"use client";

import Link from 'next/link';
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { companies } from '@/lib/data';
import { ContactRequest } from '@/types';

export default function DashboardPage() {
  const [myCompanies] = useState(companies.slice(0, 3));
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    loadRequests();
  }, [page]);

  const loadRequests = async () => {
    const res = await fetch(`/api/contact?page=${page}&pageSize=${pageSize}`);
    if (res.ok) {
      const json = await res.json();
      setRequests(json.data);
      setTotal(json.total);
    }
  };

  const pageCount = Math.ceil(total / pageSize);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Link href="/">
            <Button variant="outline">Voltar ao site</Button>
          </Link>
        </div>

        {/* Companies Section */}
        <Card>
          <CardHeader>
            <CardTitle>Minhas Empresas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
          </CardContent>
        </Card>

        {/* Contact Requests Section */}
        <Card>
          <CardHeader>
            <CardTitle>Solicitações de Contato</CardTitle>
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
                    <TableCell>{r.companyId || "-"}</TableCell>
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
