// export { auth as middleware } from "./auth"

import { auth } from './auth'; 
import { NextResponse } from 'next/server';

export default auth(async function middleware(req) {
  const { auth } = req;
  const isLoggedIn = !!auth;

  // L'URL de la page à laquelle l'utilisateur essaie d'accéder
  const pathname = req.nextUrl.pathname;

  // Exemple: Rediriger les utilisateurs non authentifiés loin des pages protégées
  const isProtectedPath = pathname.startsWith('/admin');

  if (isProtectedPath && !isLoggedIn) {
    // Rediriger vers la page de connexion
    const newUrl = new URL('/signin', req.url);
    newUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(newUrl);
  }

  // Exemple: Rediriger les utilisateurs authentifiés loin de la page de connexion
  const isLoginPage = pathname === '/signin';

  if (isLoginPage && isLoggedIn) {
    // Rediriger vers la page d'accueil ou le tableau de bord
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  // Laissez la requête se poursuivre si tout est bon
  return NextResponse.next();
});

// Important : Le 'matcher' doit exclure les fichiers statiques, l'API de NextAuth, etc.
// Le pattern ci-dessous est un bon point de départ
export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};