import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { AppShell } from '@/components/layout/AppShell';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Family Hub',
  description: 'Home life support for parents of young children',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  const isRtl = locale === 'he';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppShell>{children}</AppShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
