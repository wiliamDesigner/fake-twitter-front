

import type { Metadata } from "next";
import "./globals.css";


import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false

export const metadata: Metadata = {
  title: "Fake twiter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}