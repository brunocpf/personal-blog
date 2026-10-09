import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Source_Sans_3 } from "next/font/google";
import { Suspense, ViewTransition } from "react";

import { PageFooter } from "@/components/page-footer";
import { PageHeader } from "@/components/page-header";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://bruno-fernandes.dev",
  ),
  title: {
    default: "Bruno Fernandes — Blog",
    template: "%s | Bruno Fernandes",
  },
  description:
    "Posts about software development and projects by Bruno Fernandes, a developer in Belo Horizonte, Brazil.",
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f4f2" },
    { media: "(prefers-color-scheme: dark)", color: "#1d1b1c" },
  ],
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body id="top" className={`${display.variable} ${body.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <div className="site-shell">
            <Suspense fallback={<div className="header-placeholder" />}>
              <PageHeader />
            </Suspense>
            <main id="main-content" tabIndex={-1}>
              <ViewTransition default="page-transition">
                {children}
              </ViewTransition>
            </main>
            <PageFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
