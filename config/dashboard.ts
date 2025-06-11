import {
  LayoutDashboard,
  Image,
  LineChart,
  MessageSquare,
  Settings,
  Users,
  FileText,
  Gauge,
  Building,
  Star,
  UserSquare,
  Zap,
  Link2
} from 'lucide-react';

export const dashboardConfig = {  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard/overview",
    },
    {
      title: "Suporte",
      href: "/suporte",
    },
  ],
  sidebarNav: [    
    {
      title: "Overview",
      href: "/dashboard/overview",
      icon: LayoutDashboard,
    },
    {
      title: "Perfil",
      href: "/dashboard/empresa/profile",
      icon: Building,
    },
    {
      title: "Media",
      href: "/dashboard/empresa/media",
      icon: Image,
      items: [
        {
          title: "Logo",
          href: "/dashboard/empresa/media/logo",
        },
        {
          title: "Banner",
          href: "/dashboard/empresa/media/banner",
        },
        {
          title: "Galeria",
          href: "/dashboard/empresa/media/gallery",
        },
      ],
    },
    {
      title: "Analytics",
      href: "/dashboard/empresa/analytics",
      icon: LineChart,
    },
    {
      title: "Avaliações",
      href: "/dashboard/empresa/reviews",
      icon: Star,
    },
    {
      title: "Leads",
      href: "/dashboard/empresa/leads",
      icon: UserSquare,
    },
    {
      title: "Desempenho",
      href: "/dashboard/empresa/performance",
      icon: Zap,
    },
    {
      title: "Integrações",
      href: "/dashboard/empresa/integrations",
      icon: Link2,
    },
    {
      title: "Métricas",
      href: "/dashboard/empresa/metrics",
      icon: Gauge,
    },
    {
      title: "Documentos",
      href: "/dashboard/empresa/documents",
      icon: FileText,
    },
    {
      title: "Configurações",
      href: "/dashboard/empresa/settings",
      icon: Settings,
    },
  ],
};
