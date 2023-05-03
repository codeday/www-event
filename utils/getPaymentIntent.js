export function getPaymentIntent(o) {
    if (typeof o === 'object' && 'paymentIntentId' in o) return o.paymentIntentId;
    return o;
}