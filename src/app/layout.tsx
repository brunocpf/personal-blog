import type { Metadata, Viewport } from "next";
import { Josefin_Sans, Josefin_Slab } from "next/font/google";

import { PageFooter } from "@/components/page-footer";
import { PageHeader } from "@/components/page-header";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--josefin-sans",
});

const josefinSlab = Josefin_Slab({
  subsets: ["latin"],
  variable: "--josefin-slab",
});

export const metadata: Metadata = {
  title: "bruno-fernandes.dev",
  description: "Bruno's personal website",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen font-sans antialiased ${josefinSans.variable} ${josefinSlab.variable}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div vaul-drawer-wrapper="">
            <div className="relative flex min-h-screen flex-col">
              <PageHeader />
              <main className="flex-1">{children}</main>
              <PageFooter />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
