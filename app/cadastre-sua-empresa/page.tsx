import type { Metadata } from 'next';
import CompanyRegistrationContent from './company-registration-content';

export const metadata: Metadata = {
  title: 'Cadastre sua Empresa | Solar Review Brasil',
  description: 'Cadastre sua empresa no maior portal de energia solar do Brasil. Alcance mais clientes, receba avaliações e gerencie sua presença online.',
};

export default function CadastreEmpresaPage() {
  return <CompanyRegistrationContent />;
}
