import {
  LayoutDashboard,
  Image,
  LineChart,
  MessageSquare,
  Settings,
  Users,
  FileText,
  Gauge,
  Building
} from 'lucide-react';

export const dashboardConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard/empresa",
    },
    {
      title: "Suporte",
      href: "/suporte",
    },
  ],
  sidebarNav: [    {
      title: "Overview",
      href: "/dashboard/empresa",
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
      icon: MessageSquare,
    },
    {
      title: "Leads",
      href: "/dashboard/empresa/leads",
      icon: Users,
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
