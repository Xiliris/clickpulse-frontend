import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreditCard,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../components/form/Button';

const PaymentPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const plan = searchParams.get('plan');
  const price = searchParams.get('price');

  return (
    <section className="bg-default-200 min-h-screen flex items-center justify-center py-12">
      <div className="max-w-lg w-full bg-default-300 shadow-lg rounded-lg p-8 mx-auto">
        <Link
          to="/billing-address"
          className="text-emphasis cursor-pointer block text-xl"
        >
          <i className="fa-solid fa-arrow-left cursor-pointer"></i>
        </Link>

        <h1 className="text-4xl font-bold text-emphasis mb-6 text-center">
          Checkout
        </h1>
        <div className="flex flex-col items-center text-center mb-6">
          <h2 className="text-2xl font-semibold text-primary">
            {plan ? plan : 'Selected Plan'}
          </h2>
          <p className="text-4xl text-secondary-100 mt-2">
            {price ? price : '$0.00'}
          </p>
        </div>
        <div className="border-b border-secondary-100 mb-6"></div>

        {/* Payment */}
        <form className="space-y-6">
          <div>
            <label
              className="block text-secondary-100 text-sm font-semibold mb-1"
              htmlFor="cardNumber"
            >
              Card Number
            </label>
            <div className="relative">
              <input
                id="cardNumber"
                type="text"
                className="w-full py-2 px-3 border border-default-100 rounded-lg text-base focus:outline-none focus:border-emphasis bg-default-100 cursor-pointer text-primary"
                placeholder="1234 5678 9123 4567"
              />
              <FontAwesomeIcon
                icon={faCreditCard}
                className="absolute right-[14px] top-3 text-primary"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-secondary-100 text-sm font-semibold mb-1"
                htmlFor="expiry"
              >
                Expiry Date
              </label>
              <input
                id="expiry"
                type="text"
                className="w-full py-2 px-3 border border-default-100 rounded-lg text-base focus:outline-none focus:border-emphasis bg-default-100 cursor-pointer text-primary"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label
                className="block text-secondary-100 text-sm font-semibold mb-1"
                htmlFor="cvc"
              >
                CVC
              </label>
              <input
                id="cvc"
                type="text"
                className="w-full py-2 px-3 border border-default-100 rounded-lg text-base focus:outline-none focus:border-emphasis bg-default-100 cursor-pointer text-primary"
                placeholder="123"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="w-full flex justify-center mt-[15px]">
              Pay {price ? price : '$0.00'}
            </Button>
          </div>
        </form>

        {/* Secure Payment Info */}
        <div className="mt-6 text-center text-sm text-secondary-100">
          <FontAwesomeIcon
            icon={faLock}
            className="text-emphasis mr-2"
          />
          Your payment is secure and encrypted.
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;
