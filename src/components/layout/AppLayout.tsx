"use client";

import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import SidebarNav from './SidebarNav';
import { Gem } from 'lucide-react';
import Link from 'next/link';
import { appData } from '@/lib/appData';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar variant="sidebar" collapsible="icon" className="backdrop-blur-md bg-white/80 border-r border-gray-200/50">
        <SidebarHeader className="p-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/images/logo.jpg" 
              alt="Mahaveer Marbles Logo" 
              className="h-12 w-12 object-contain rounded-lg transform group-hover:scale-105 transition-all duration-300"
            />
            <span className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
              Mahaveer Marbles
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-4 text-xs text-muted-foreground/80">
          © {new Date().getFullYear()} {appData.companyInfo.name} | Created by <a href="https://github.com/keshav861" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">Keshav</a>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white/90 px-4 backdrop-blur-md md:hidden shadow-sm">
            <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-white p-1 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105 overflow-hidden">
                  <img 
                    src="/images/logo.jpg" 
                    alt="mahaveer Marbles Logo" 
                    className="h-7 w-7 object-contain"
                  />
                </div>
                <span className="text-lg font-headline font-semibold text-foreground bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Mahaveer Marbles</span>
            </Link>
            <SidebarTrigger className="bg-gradient-to-br from-blue-100 to-indigo-100 p-1.5 rounded-lg hover:shadow-md transition-all duration-300" />
        </header>
        <main className="flex-1">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
