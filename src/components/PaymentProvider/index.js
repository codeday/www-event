import Stripe from './Stripe';
import Razorpay from './Razorpay';
import Scholarship from './Scholarship';

export function PaymentProvider({ paymentProvider, ...props }) {
  if (paymentProvider === 'razorpay') return <Razorpay {...props} />;
  if (paymentProvider === 'stripe') return <Stripe {...props} />;
  if (paymentProvider === 'scholarship') return <Scholarship {...props} />;
  return <></>;
}
