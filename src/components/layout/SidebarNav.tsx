
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListCollapse, Info, MessageSquare, Layers3, ShieldCheck } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/details', label: 'Details', icon: ListCollapse },
  { href: '/stone-types', label: 'Stone Types', icon: Layers3 },
  { href: '/about', label: 'About Us', icon: Info },
  { href: '/contact', label: 'Contact', icon: MessageSquare },
  { href: '/admin', label: 'Admin', icon: ShieldCheck },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu className="mt-2 px-2">
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href} className="mb-1">
          <Link href={item.href} passHref>
            <SidebarMenuButton
              className={cn(
                'font-medium rounded-xl transition-all duration-300 transform hover:scale-105',
                pathname === item.href
                  ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-700 dark:text-blue-400 hover:from-blue-500/30 hover:to-indigo-500/30 shadow-sm'
                  : 'hover:bg-blue-50 dark:hover:bg-slate-800/50 backdrop-blur-sm hover:text-blue-700'
              )}
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <div className={cn(
                'flex items-center justify-center p-1 rounded-lg mr-2',
                pathname === item.href 
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white' 
                  : 'bg-gray-100 text-gray-600'
              )}>
                <item.icon className="h-4 w-4" />
              </div>
              <span className="truncate font-medium">{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
