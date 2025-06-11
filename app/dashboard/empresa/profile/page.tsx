'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CompanyProfileForm } from '@/components/dashboard/company-profile-form';
import { ImageUpload } from '@/components/dashboard/image-upload';
import { useState } from 'react';

export default function CompanyProfilePage() {
  const [logo, setLogo] = useState('');
  const [banner, setBanner] = useState('');

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Perfil da Empresa</h2>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Logo da Empresa</CardTitle>
            <CardDescription>
              A logo será exibida no perfil da empresa e nos resultados de busca.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload 
              label="Logo"
              value={logo}
              onChange={setLogo}
              onRemove={() => setLogo('')}
              aspectRatio="1/1"
              maxWidth="max-w-[300px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Banner</CardTitle>
            <CardDescription>
              O banner será exibido no topo do perfil da empresa.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload 
              label="Banner"
              value={banner}
              onChange={setBanner}
              onRemove={() => setBanner('')}
              aspectRatio="16/9"
            />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Informações da Empresa</CardTitle>
          <CardDescription>
            Mantenha as informações da sua empresa atualizadas para melhor visibilidade.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompanyProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
