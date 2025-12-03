import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";

import { ThemeProvider } from "@/context/ThemeContext";

import Link from "next/link";
import React from "react";

export default function AuthLayout({
      children,
    }) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <ThemeProvider>
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col  dark:bg-gray-900 sm:p-0">
          {children}
          <div className="lg:w-1/2 w-full h-full bg-[#2E86AB] dark:bg-[#003A44] lg:grid items-center hidden">
            <div className="relative items-center justify-center  flex z-1">
              {/* <!-- ===== Common Grid Shape Start ===== --> */}
              <GridShape />
              <div className="flex flex-col items-center max-w-xs">
                 <Link href="/" className="block mb-4">
                               <img
    src="assets/images/Whitehorizontal.png"
    alt="Logo clair"
    className="w-28 md:w-36 lg:w-68 object-contain cursor-pointer "
  />
                 </Link>


                <p className="text-center text-white ">
               Une plateforme numérique dédiée au bien-être mental, offrant un suivi et un accompagnement personnalisé
                </p>
              </div>
            </div>
          </div>
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
