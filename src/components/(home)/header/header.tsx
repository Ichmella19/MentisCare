'use client';
import  { ThemeToggleButton } from  "@/components/common/ThemeToggleButton";
import React, { useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import Link from "next/link";
import { Menu, X } from "lucide-react";



const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();


 

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "À Propos", href: "/aboutUs" },
    { label: "Fonctionnalités", href: "/fonctions" },
    { label: "Réalisations", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 py-4 bg-white dark:bg-black shadow-md dark:text-white `}
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16">
        {/* Logo */}
        <Link href="/">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-24 sm:w-28 md:w-32 lg:w-36 object-contain cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex flex-1 justify-center">
          <ul className="flex gap-8 font-medium text-[16px] items-center">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <li key={href} className="relative group">
                  <Link
                    href={href}
                    className={`
                      px-2 pb-1 relative
                      ${isActive ? "text-[#08A3DC] after:scale-x-100" : "text-inherit after:scale-x-0"}
                      after:content-[''] after:absolute after:left-0 after:bottom-0
                      after:h-[2px] after:w-full after:bg-[#08A3DC]
                      after:transition-transform after:duration-300
                      group-hover:after:scale-x-100
                    `}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden xl:flex items-center gap-4">
          <div className="flex rounded-lg overflow-hidden shadow border border-[#08A3DC]">
            <button
              className="bg-[#08A3DC] text-white px-6 py-2 hover:bg-[#0b91c6] transition duration-200"
              onClick={() => router.push("/signin")}
            >
              Se Connecter
            </button>
            <button
              className="bg-[#003A44] text-white px-6 py-2 transition duration-200"
              onClick={() => router.push("/donnation")}
            >
              Faire des dons
            </button>
          </div>

         <ThemeToggleButton />
        </div>

        {/* Mobile & Tablet Buttons */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            className="bg-[#08A3DC] text-white px-2 py-1 rounded-lg text-sm"
            onClick={() => router.push("/connexion")}
          >
            Connexion
          </button>
          <button
            className="bg-[#003A44] text-white px-2 py-1 rounded-lg text-sm"
            onClick={() => router.push("/donnation")}
          >
            Donnation
          </button>
          <button
           
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            aria-label="Toggle theme"
          >
           
          </button>
          <button
            onClick={toggleMenu}
            className={`ml-2 `}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`xl:hidden fixed top-[64px] left-0 w-full z-40 px-6 py-6 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col font-medium text-[16px] gap-6">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={closeMenu}
                  className={`
                    block px-4 py-2 rounded-md
                    ${isActive ? "bg-[#08A3DC] text-white" : "text-white hover:bg-gray-700"}
                  `}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Header;
