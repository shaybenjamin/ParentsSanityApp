'use client';

import { usePathname } from 'next/navigation';
import { BottomNav } from './BottomNav';
import { TopBar } from './TopBar';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex flex-col min-h-screen bg-sand-50">
      <TopBar />
      <main className="flex-1 overflow-y-auto pb-24 pt-2 px-4 max-w-2xl mx-auto w-full">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
