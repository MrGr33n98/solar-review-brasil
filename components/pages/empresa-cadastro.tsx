'use client'

import { useState } from "react"
import { Linkedin } from "lucide-react"
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

export function EmpresaCadastro() {
  const [step, setStep] = useState("info")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

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
          <Button 
            variant="outline" 
            onClick={handleLinkedInSignup}
            disabled={isLoading}
            className="w-full"
          >
            <Linkedin className="mr-2 h-4 w-4" />
            Cadastrar com LinkedIn
          </Button>
          
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
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Empresa</Label>
                  <Input id="name" placeholder="Solar Energy LTDA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input id="cnpj" placeholder="00.000.000/0000-00" />
                </div>
                <Button onClick={() => setStep("access")}>Próximo</Button>
              </div>
            </TabsContent>

            <TabsContent value="access">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="empresa@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input id="password" type="password" />
                </div>
                <Button type="submit">Cadastrar</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
