import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Family Hub',
  description: 'Home life support for parents of young children',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
