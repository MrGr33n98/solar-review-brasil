'use client';

import { CompanyRegistrationForm } from '@/components/dashboard/company-registration-form';

export default function CompanyRegistrationPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Cadastro de Empresa</h1>
      <CompanyRegistrationForm />
    </div>
  );
}
