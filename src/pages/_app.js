import React from 'react';
import Theme from '@codeday/topo/Theme';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const stripePromise = loadStripe(publicRuntimeConfig.stripeKey);

export default ({ Component, pageProps }) => (
  <Theme brandColor="red">
    <Elements stripe={stripePromise}>
      <Component {...pageProps} />
    </Elements>
  </Theme>
);
