// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from 'next/server';
import { parseAcceptLanguage } from 'intl-parse-accept-language';
// eslint-disable-next-line node/no-unpublished-import
import nextConfig from '../next.config';

const PUBLIC_FILE = /\.(.*)$/;
const UNSPECIFIED = '_default';
const AVAILABLE_LANGUAGES = nextConfig.i18n.locales.filter((e) => e !== UNSPECIFIED);
const FALLBACK_LANG = 'en-US';

export async function middleware(req) {
  if (
    req.nextUrl.pathname.startsWith('/_next')
    || req.nextUrl.pathname.includes('/api/')
    || PUBLIC_FILE.test(req.nextUrl.pathname)
  ) return;

  if (req.nextUrl.locale === UNSPECIFIED) {
    const prefLocales = parseAcceptLanguage(req.headers.get('accept-language'));
    const browserLocale = prefLocales.filter((e) => AVAILABLE_LANGUAGES.includes(e))[0] || null;
    const cookieLocale = req.cookies.get('NEXT_LOCALE');

    const locale = cookieLocale ?? browserLocale ?? FALLBACK_LANG;

    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url),
    );
  }
}
