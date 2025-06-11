'use client'

import { useState } from "react"
import { Linkedin, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CompanySchema, AccessSchema, RegisterSchema } from "@/schemas/register"
import { signIn } from "next-auth/react"
import type { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"

type CompanyFormData = z.infer<typeof CompanySchema>
type AccessFormData = z.infer<typeof AccessSchema>
type RegisterFormData = z.infer<typeof RegisterSchema>

export default function CompanyRegistration() {
  const [step, setStep] = useState("info")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const {
    register: registerInfo,
    handleSubmit: handleInfoSubmit,
    formState: { errors: infoErrors }
  } = useForm<CompanyFormData>({
    resolver: zodResolver(CompanySchema)
  })

  const {
    register: registerAccess,
    handleSubmit: handleAccessSubmit,
    formState: { errors: accessErrors }
  } = useForm<AccessFormData>({
    resolver: zodResolver(AccessSchema)
  })

  const handleLinkedInSignup = async () => {
    setIsLoading(true)
    try {
      window.location.href = "/api/auth/linkedin?signup=true"
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível conectar com LinkedIn",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onNextStep = handleInfoSubmit((data) => {
    // Store company data for later submission
    sessionStorage.setItem('companyData', JSON.stringify(data))
    setStep("access")
  })

  const onSubmit = handleAccessSubmit(async (accessData) => {
    try {
      setIsLoading(true)
      
      // Get stored company data and combine with access data
      const companyData = JSON.parse(sessionStorage.getItem('companyData') || '{}')
      const formData: RegisterFormData = { ...companyData, ...accessData }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erro ao cadastrar')
      }

      toast({
        title: "Sucesso",
        description: "Cadastro realizado com sucesso",
      })

      // Clear stored data
      sessionStorage.removeItem('companyData')
      
      // Redirect to dashboard
      router.push("/dashboard/empresa")

    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao cadastrar",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Button 
              variant="outline" 
              onClick={() => signIn('google', { callbackUrl: '/dashboard/empresa' })}
              disabled={isLoading}
              className="w-full"
            >
              <Mail className="mr-2 h-4 w-4" />
              Cadastrar com Google
            </Button>

            <Button 
              variant="outline" 
              onClick={handleLinkedInSignup}
              disabled={isLoading}
              className="w-full"
            >
              <Linkedin className="mr-2 h-4 w-4" />
              Cadastrar com LinkedIn
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continue com email
              </span>
            </div>
          </div>

          <Tabs value={step} onValueChange={setStep}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="access">Acesso</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info">
              <form onSubmit={onNextStep} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Empresa</Label>
                  <Input 
                    id="name" 
                    placeholder="Solar Energy LTDA"
                    error={Boolean(infoErrors.name)}
                    {...registerInfo("name")} 
                  />
                  {infoErrors.name && (
                    <p className="text-sm text-destructive">{infoErrors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input 
                    id="cnpj" 
                    placeholder="00.000.000/0000-00"
                    error={Boolean(infoErrors.cnpj)}
                    {...registerInfo("cnpj")} 
                  />
                  {infoErrors.cnpj && (
                    <p className="text-sm text-destructive">{infoErrors.cnpj.message}</p>
                  )}
                </div>
                <Button type="submit" disabled={isLoading}>
                  Próximo
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="access">
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="empresa@email.com"
                    error={Boolean(accessErrors.email)}
                    {...registerAccess("email")} 
                  />
                  {accessErrors.email && (
                    <p className="text-sm text-destructive">{accessErrors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input 
                    id="password" 
                    type="password"
                    error={Boolean(accessErrors.password)}
                    {...registerAccess("password")} 
                  />
                  {accessErrors.password && (
                    <p className="text-sm text-destructive">{accessErrors.password.message}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setStep("info")}
                    disabled={isLoading}
                  >
                    Voltar
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    Cadastrar
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
          
          <p className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <Link
              href="/auth/empresa/login"
              className="font-medium text-primary hover:underline"
            >
              Entre aqui
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
