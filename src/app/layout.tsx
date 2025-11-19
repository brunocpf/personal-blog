import type { Metadata, Viewport } from "next";
import { ViewTransitions } from "next-view-transitions";
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  ),
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
    <ViewTransitions>
      <html
        lang="en"
        suppressHydrationWarning
        className="[@media(display-mode:standalone)]:overscroll-none [@media(display-mode:fullscreen)]:overscroll-none [@media(display-mode:minimal-ui)]:overscroll-contain"
      >
        <body
          className={`min-h-screen font-sans antialiased ${josefinSans.variable} ${josefinSlab.variable}`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div vaul-drawer-wrapper="">
              <div className="relative flex min-h-screen flex-col">
                <PageHeader />
                <main className="flex-1 flex flex-col">{children}</main>
                <PageFooter />
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
