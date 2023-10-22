export function getPaymentIntent(o) {
  if (typeof o === 'object') {
    if ('paymentIntentId' in o) return o.paymentIntentId;
    if ('paymentIntent' in o) return o.paymentIntent;
  }
  return o;
}
