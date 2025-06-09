import { GoogleSearch } from '@/components/google-search';

interface CompanySearchProps {
  onSearch: (query: string, location?: string) => void;
}

export function CompanySearch({ onSearch }: CompanySearchProps) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <GoogleSearch onSearch={onSearch} />
      </div>
    </section>
  );
}
