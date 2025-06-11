'use client';

import { CompanyRegistrationForm } from '@/components/dashboard/company-registration-form';

export default function CompanyRegistrationContent() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Cadastre sua Empresa
          </h1>
          <p className="text-lg text-gray-600">
            Alcance mais clientes e gerencie sua presença online no maior portal de energia solar do Brasil.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <CompanyRegistrationForm />
        </div>
      </div>
    </div>
  );
}
