/* eslint-disable react/prop-types */
import { PaymentProvider } from './PaymentProvider';

export default function PaymentBox({
  event, isRequestScholarship, ...props
}) {
  return (
    <PaymentProvider
      paymentProvider={isRequestScholarship ? 'scholarship' : (event?.region?.paymentProvider || 'stripe')}
      currency={event?.region?.currency || 'usd'}
      event={event}
      {...props}
    />
  );
}
