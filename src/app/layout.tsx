import { Montserrat } from "next/font/google"; // ← importe ici
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react";




const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ['400', '600', '700'], // choisis les poids nécessaires
  variable: '--font-montserrat', // utile pour Tailwind (facultatif)
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body >
        <SessionProvider>
          <ToastContainer position="bottom-right" autoClose={3000}/>
            <ThemeProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
