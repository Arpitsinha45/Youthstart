import { LayoutDashboard, FileText, File, Image, Star, Navigation, Book, Tags, Mail, DollarSign, Settings, Palette, Users, Globe } from 'lucide-react';

export const ADMIN_SIDEBAR_MENU = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'posts',
    label: 'Posts',
    icon: FileText,
  },
  {
    id: 'pages',
    label: 'Pages',
    icon: File,
  },
  {
    id: 'media',
    label: 'Media Library',
    icon: Image,
  },
  {
    id: 'featured',
    label: 'Featured Content',
    icon: Star,
  },
  {
    id: 'header-nav',
    label: 'Header & Navigation',
    icon: Navigation,
  },
  {
    id: 'footer',
    label: 'Footer',
    icon: Book,
  },
  {
    id: 'categories-tags',
    label: 'Categories & Tags',
    icon: Tags,
  },
  {
    id: 'newsletter',
    label: 'Newsletter & Subscribers',
    icon: Mail,
  },
  {
    id: 'ads',
    label: 'Ads & Sponsors',
    icon: DollarSign,
  },
  {
    id: 'seo',
    label: 'SEO Settings',
    icon: Globe,
  },
  {
    id: 'theme',
    label: 'Theme Customizer',
    icon: Palette,
  },
  {
    id: 'users',
    label: 'User Management',
    icon: Users,
  },
  {
    id: 'site-settings',
    label: 'Site Settings',
    icon: Settings,
  },
];

export const ADMIN_ICON_MAP: Record<string, any> = ADMIN_SIDEBAR_MENU.reduce((acc, item) => {
  acc[item.id] = item.icon;
  return acc;
}, {} as Record<string, any>);
