import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, Sidebar } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { SidebarNav } from '@/components/sidebar-nav';
import { Header } from '@/components/header';
import { AnimatedGradientBackground } from '@/components/animated-grid-pattern';
import { ThemeProvider } from '@/components/theme-provider';
import { PerformanceProvider } from '@/components/performance-mode';
import { PerformanceMonitor } from '@/components/performance-monitor';
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})


export const metadata: Metadata = {
  title: 'LaunchMate',
  description: 'The futuristic professional networking and startup ecosystem for students.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} font-body antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PerformanceProvider>
            <AnimatedGradientBackground>
              <SidebarProvider>
                <Sidebar>
                  <SidebarNav />
                </Sidebar>
                <div className="flex flex-col w-full min-h-screen">
                  <Header />
                  <main className="flex-1 p-4 md:p-6 lg:p-8">
                    {children}
                  </main>
                </div>
              </SidebarProvider>
              <Toaster />
              <PerformanceMonitor />
            </AnimatedGradientBackground>
          </PerformanceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
