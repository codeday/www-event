import React from 'react';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from '@codeday/topo/Theme';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import getConfig from 'next/config';
import nextI18NextConfig from '../../next-i18next.config';

const { publicRuntimeConfig } = getConfig();
const stripePromise = loadStripe(publicRuntimeConfig.stripeKey);

const App = ({ Component, pageProps: { cookies, ...pageProps  } }) => (
  <ThemeProvider
    brandColor="red"
    analyticsId="AZKCYNER"
    locale={pageProps?.locale && pageProps.locale !== '_default' ? pageProps.locale : 'en-US'}
    localizationConfig={pageProps?.localizationConfig}
    withChat
    cookies={pageProps.cookies}
    useSystemColorMode
  >
    <Elements
      stripe={stripePromise}
      options={{ fonts: [{ cssSrc: 'https://f1.codeday.org/topo/fonts/all.css' }], locale: pageProps?.locale ?? 'en-US' }}
    >
      <Component {...pageProps} />
    </Elements>
  </ThemeProvider>
);
export default appWithTranslation(App, nextI18NextConfig);
