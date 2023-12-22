import { supportedLocales } from "@/i18n/locales";
import "./globals.css";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Todo App",
  description: "An intuitive and simple task management app built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  if (!supportedLocales.includes(locale as any)) notFound();
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
