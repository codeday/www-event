import { NextRequest, NextResponse } from 'next/server';
import nextConfig from '../next.config';
import { parseAcceptLanguage } from 'intl-parse-accept-language';

const PUBLIC_FILE = /\.(.*)$/;
const UNSPECIFIED = '_default';
const AVAILABLE_LANGUAGES = nextConfig.i18n.locales.filter((e) => e !== UNSPECIFIED);

export async function middleware(req) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) return;

  if (req.nextUrl.locale === UNSPECIFIED) {
    const prefLocales = parseAcceptLanguage(req.headers.get('accept-language'));
    const browserLocale = prefLocales.filter((e) => AVAILABLE_LANGUAGES.includes(e))[0] || null;
    const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;
    
    const locale = cookieLocale ?? browserLocale ?? 'en';

    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    )
  }
}