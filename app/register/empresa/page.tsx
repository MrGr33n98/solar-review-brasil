'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  companyInfo: z.object({
    name: z.string().min(3, "Nome da empresa é obrigatório"),
    cnpj: z.string().min(14, "CNPJ inválido"),
    phone: z.string().min(10, "Telefone inválido"),
    website: z.string().optional()
  }),
  address: z.object({
    cep: z.string().min(8, "CEP inválido"),
    street: z.string().min(3, "Endereço obrigatório"),
    number: z.string(),
    city: z.string().min(2, "Cidade obrigatória"),
    state: z.string().length(2, "Estado inválido")
  }),
  credentials: z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"]
  })
})

export default function RegisterEmpresa() {
  const [step, setStep] = useState("company")
  
  const form = useForm({
    resolver: zodResolver(formSchema)
  })

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Cadastro de Empresa</CardTitle>
          <CardDescription>
            Cadastre sua empresa para começar a receber leads qualificados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={step} onValueChange={setStep}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="company">Empresa</TabsTrigger>
              <TabsTrigger value="address">Endereço</TabsTrigger>
              <TabsTrigger value="credentials">Acesso</TabsTrigger>
            </TabsList>

            {/* Company Info Tab */}
            <TabsContent value="company" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Empresa*</Label>
                  <Input id="name" placeholder="Solar Energy LTDA" {...form.register("companyInfo.name")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ*</Label>
                  <Input id="cnpj" placeholder="00.000.000/0000-00" {...form.register("companyInfo.cnpj")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone*</Label>
                  <Input id="phone" placeholder="(00) 00000-0000" {...form.register("companyInfo.phone")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input {...form.register("companyInfo.website")} />
                </div>
                <Button type="button" onClick={() => setStep("address")}>
                  Próximo
                </Button>
              </div>
            </TabsContent>

            {/* Address Tab */}
            <TabsContent value="address" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP*</Label>
                  <Input {...form.register("address.cep")} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Rua*</Label>
                    <Input {...form.register("address.street")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number">Número*</Label>
                    <Input {...form.register("address.number")} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade*</Label>
                    <Input {...form.register("address.city")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado*</Label>
                    <Input {...form.register("address.state")} maxLength={2} />
                  </div>
                </div>
                <Button type="button" onClick={() => setStep("credentials")}>
                  Próximo
                </Button>
              </div>
            </TabsContent>

            {/* Credentials Tab */}
            <TabsContent value="credentials" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input {...form.register("credentials.email")} type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha*</Label>
                  <Input {...form.register("credentials.password")} type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha*</Label>
                  <Input {...form.register("credentials.confirmPassword")} type="password" />
                </div>
                <Button type="submit">Finalizar Cadastro</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* ...existing code... */}
        
        <div className="flex items-center justify-between space-x-2">
          {/* Update the Para Empresas button URL */}
          <Link href="/cadastre-sua-empresa">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Para Empresas
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-14 left-0 right-0 bg-white border-b`}>
          {/* ...existing code... */}
          
          {/* Update mobile menu button URL */}
          <div className="p-4">
            <Link href="/cadastre-sua-empresa" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Para Empresas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
