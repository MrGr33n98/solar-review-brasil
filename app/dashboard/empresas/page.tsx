"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import * as Recharts from "recharts";
import type { Company, ContactRequest } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { companies } from "@/lib/data";

export default function CompaniesDashboardPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [editing, setEditing] = useState<Company | null>(null);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);

  useEffect(() => {
    fetch("/api/companies")
      .then((res) => res.json())
      .then(setCompanies);
    fetch("/api/contact")
      .then((res) => res.json())
      .then((res) => setContactRequests(res.data));
  }, []);

  const saveCompany = async () => {
    if (!editing) return;
    const res = await fetch(`/api/companies/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (res.ok) {
      const updated = await res.json();
      setCompanies((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
      setEditing(null);
    }
  };

  const contactsFor = (id: string) =>
    contactRequests.filter((c) => c.companyId === id).length;

  const chartData = companies.map((c) => ({
    name: c.name,
    contacts: contactsFor(c.id),
    reviews: c.reviewCount,
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-6">Área das Empresas</h1>

        <Card>
          <CardHeader>
            <CardTitle>Empresas Cadastradas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Avaliações</TableHead>
                  <TableHead>Contatos</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>{company.name}</TableCell>
                    <TableCell className="capitalize">
                      {company.planType}
                    </TableCell>
                    <TableCell>{company.reviewCount}</TableCell>
                    <TableCell>{contactsFor(company.id)}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditing(company)}
                          >
                            Editar
                          </Button>
                        </DialogTrigger>
                        {editing?.id === company.id && (
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Editar Empresa</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-2">
                              <div className="space-y-2">
                                <Label>Nome</Label>
                                <Input
                                  value={editing.name}
                                  onChange={(e) =>
                                    setEditing({
                                      ...editing!,
                                      name: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Descrição</Label>
                                <Input
                                  value={editing.description}
                                  onChange={(e) =>
                                    setEditing({
                                      ...editing!,
                                      description: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Website</Label>
                                <Input
                                  value={editing.website || ""}
                                  onChange={(e) =>
                                    setEditing({
                                      ...editing!,
                                      website: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="flex justify-end gap-2 pt-2">
                                <Button
                                  variant="outline"
                                  onClick={() => setEditing(null)}
                                >
                                  Cancelar
                                </Button>
                                <Button onClick={saveCompany}>Salvar</Button>
                              </div>
                            </div>
                          </DialogContent>
                        )}
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
                {companies.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Nenhuma empresa encontrada
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 && (
              <ChartContainer
                className="w-full"
                config={{
                  contacts: { label: "Contatos", color: "#3b82f6" },
                  reviews: { label: "Avaliações", color: "#f97316" },
                }}
              >
                <Recharts.BarChart data={chartData} barCategoryGap={16}>
                  <Recharts.XAxis dataKey="name" />
                  <Recharts.YAxis allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Recharts.Bar dataKey="contacts" fill="var(--color-contacts)" />
                  <Recharts.Bar dataKey="reviews" fill="var(--color-reviews)" />
                  <ChartLegend
                    content={<ChartLegendContent />}
                    verticalAlign="top"
                  />
                </Recharts.BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={companies} />
        </div>
      </div>
    </div>
  );
}
