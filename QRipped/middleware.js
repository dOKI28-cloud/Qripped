import { NextResponse } from "next/server";

// Shto 'tr' te lista e gjuhëve të mbështetura
const locales = ["sq", "en",  "tr"];
const defaultLocale = "sq";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Kontrollo nëse URL ka tashmë një nga gjuhët (sq, en, mk, tr)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Nëse nuk ka gjuhë në URL, dërgoje te gjuha bazë (sq)
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Blloko skedarët statikë që të mos prekën nga middleware
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};