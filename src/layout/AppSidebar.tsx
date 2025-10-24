"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react"; // 👈 Hook
import { usePathname } from "next/navigation"; // 👈 Hook
import { useSidebar } from "../context/SidebarContext"; // 👈 Hook
import {
  BellIcon,
  GridIcon,
  HorizontaLDots,
  WalletIcon,
  PersonIcon,
  HospitalIcon,
  TableIcon,
  UserCircleIcon,
  Layers,
  PatientIcon,
} from "../icons/index";

// ----------------------------------------------------------------------
// 1. TYPE DEFINITIONS
// ----------------------------------------------------------------------

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

// ----------------------------------------------------------------------
// 2. LOGIQUE PRINCIPALE DU COMPOSANT
// ----------------------------------------------------------------------

const AppSidebar: React.FC = () => {
  // 🟢 CORRECTION MAJEURE: Tous les Hooks doivent être appelés ici,
  // au début du corps du composant fonctionnel.
  const { data: session } = useSession();
  const role = (session?.user as any)?.role;
  
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  // 3. LOGIQUE DE CONSTRUCTION DU MENU (Basée sur le rôle)
  // Cette logique est maintenant DANS le composant pour capturer 'role'.
  const navItems: NavItem[] = React.useMemo(() => {
    if (role === 'ADMIN') {
      return [
        { icon: <GridIcon />, name: "Tableau de bord", path: "/admin/dashboard" },
        { icon: <UserCircleIcon />, name: "Gestion des utilisateurs", path: "/admin/users" },
        { icon: <PersonIcon />, name: "Gestion des patients", path: "/admin/patients" },
        { icon: <Layers />, name: "Categories", path: "/admin/categories" },
        { name: "Notifications", icon: <BellIcon />, path: "/admin/notifications" },
        { name: "Portfeuille", icon: <WalletIcon />, path: "/admin/portfeuille" },
      ];
    } 
    // Si role est 'USER' ou autre (médecin/prestataire)
    else if (role) {
      return [
        { icon: <GridIcon />, name: "Tableau de bord", path: "/admin/dashboard" },
        { icon: <HospitalIcon />, name: "Gestions des consultations", path: "/admin/consultations" },
        { name: "Reservations", icon: <TableIcon />, path: "/admin/calendar" },
        { name: "Mes patients", icon: <PatientIcon />, path: "/admin/mespatients" },
        { name: "Notifications", icon: <BellIcon />, path: "/admin/notifications" },
      ];
    }
    // Rôle non défini (ex: chargement de la session)
    return []; 
  }, [role]); // Le tableau est recalculé uniquement si le rôle change.


  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Utilisez useCallback pour ne pas recréer la fonction à chaque rendu
  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  // useEffect pour la gestion de la hauteur (inchangé, car correct)
  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (
    // Utilisez le tableau navItems créé dans le composant
    items: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {/* ... Reste de votre logique de rendu des éléments de menu (inchangé) ... */}
          {/* J'ai simplifié le rendu pour la concision ici, mais votre logique de rendu
              dans votre code original est fonctionnelle si navItems est bien défini. */}
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"
              }`}
            >
              <span
                className={`${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-[20px] space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed z-999999 mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {/* Logo clair : visible uniquement en mode light */}
          <img
            src="/assets/images/Light1.png"
            alt="Logo clair"
            className="w-28 md:w-32 lg:w-36 object-contain cursor-pointer block dark:hidden"
          />
          {/* Logo sombre : visible uniquement en mode dark */}
          <img
            src="/assets/images/Dark1.png"
            alt="Logo sombre"
            className="w-28 md:w-32 lg:w-36 object-contain cursor-pointer hidden dark:block"
          />
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 hover:text-[#08A3DC] cursor-pointer ${
                  !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "ADMIN DASHBOARD"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {/* 🟢 Utilisation du navItems calculé */}
              {renderMenuItems(navItems, "main")} 
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                }`}
              >
              </h2>
              {/* Les autres éléments commentés ont été laissés ainsi. */}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;