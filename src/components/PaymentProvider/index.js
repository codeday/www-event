import Stripe from './Stripe';
import Razorpay from './Razorpay';

export function PaymentProvider({ paymentProvider, ...props }) {
  if (paymentProvider === 'razorpay') return <Razorpay {...props} />
  if (paymentProvider === 'stripe') return <Stripe {...props} />
  return <></>;
}
