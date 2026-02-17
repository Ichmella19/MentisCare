import { Montserrat } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react"; // 👈 AJOUT IMPORTANT

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <SessionProvider>
          <ToastContainer position="bottom-right" autoClose={3000} />
          <ThemeProvider>
            <SidebarProvider>
              {/* 👇 AJOUT SUSPENSE ICI */}
              <Suspense fallback={<div>Chargement...</div>}>
                {children}
              </Suspense>
            </SidebarProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
