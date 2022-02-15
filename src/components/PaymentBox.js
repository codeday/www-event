/* eslint-disable react/prop-types */
import { PaymentProvider } from './PaymentProvider';

export default function PaymentBox({
  event, ...props
}) {
  return <PaymentProvider paymentProvider={event?.region?.paymentProvider || 'stripe'} event={event} {...props} />;
}
