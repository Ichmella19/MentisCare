// // src/middleware.ts
// import { auth } from './auth'; 
// import { NextResponse } from 'next/server';

// // Étendre le type User pour inclure le role
// interface ExtendedUser {
//   role?: 'ADMIN' | 'USER';
//   [key: string]: unknown;
// }

// export default auth(async function middleware(req) {
//   const { auth } = req;
//   const isLoggedIn = !!auth;

//   const restrictedPaths = [
//     'admin/dashboard',
//     '/admin/patients',
//     '/admin/users',
//     '/admin/categories',
//     '/admin/portefeuille',
//   ];

//   const pathname = req.nextUrl.pathname;

//   // Rediriger les utilisateurs non authentifiés loin des pages protégées
//   const isProtectedPath = pathname.startsWith('/admin');

//   if (isProtectedPath && !isLoggedIn) {
//     const newUrl = new URL('/signin', req.url);
//     newUrl.searchParams.set('callbackUrl', pathname);
//     return NextResponse.redirect(newUrl);
//   }

//   // Rediriger les utilisateurs authentifiés loin de la page de connexion
//   const isLoginPage = pathname === '/signin';
  
//   const user = auth?.user as ExtendedUser | undefined;
//   const role = user?.role;

//   if (isLoginPage && isLoggedIn) {
//     if(role == "ADMIN")
//       return NextResponse.redirect(new URL('/admin/dashboard', req.url));
//     else
//       return NextResponse.redirect(new URL('/admin/dashboard/personal', req.url));
//   }

//   const shouldRedirect = role === 'USER' && restrictedPaths.some(path => pathname.startsWith(path));

//   if (shouldRedirect) {
//     return NextResponse.redirect(new URL('/admin/dashboard/personal', req.url));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: ['/((?!api|static|.*\\..*|_next).*)'],
// };
// src/middleware.ts
import { auth } from './auth'; 
import { NextResponse } from 'next/server';

interface ExtendedUser {
  role?: 'ADMIN' | 'USER';
  [key: string]: unknown;
}

export default auth(async function middleware(req) {
  const { auth } = req;
  const isLoggedIn = !!auth;

  const restrictedPaths = [
    '/admin/dashboard',
    '/admin/patients',
    '/admin/users',
    '/admin/categories',
    '/admin/portfeuille',
  ];

  const pathname = req.nextUrl.pathname;

  // Pages protégées
  const isProtectedPath = pathname.startsWith('/admin');
  if (isProtectedPath && !isLoggedIn) {
    const newUrl = new URL('/signin', req.url);
    newUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(newUrl);
  }

  // Page de login
  const isLoginPage = pathname === '/signin';
  const user = auth?.user as ExtendedUser | undefined;
  const role = user?.role;

  if (isLoginPage && isLoggedIn) {
    if (role === 'ADMIN') return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    return NextResponse.redirect(new URL('/admin/dashboard/personal', req.url));
  }

  // Redirection selon rôle
  const shouldRedirect = role === 'USER' && restrictedPaths.some(path => pathname.startsWith(path));
  if (shouldRedirect) {
    return NextResponse.redirect(new URL('/admin/dashboard/personal', req.url));
  }

  return NextResponse.next();
});

// ⚠️ Node.js runtime pour utiliser auth/bcryptjs
export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
  runtime: 'nodejs',
};
