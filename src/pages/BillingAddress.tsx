import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/form/Button';
import CountrySelect from '../components/form/CountrySelect';

const BillingAddress = () => {
  const [showState, setShowState] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleCountryState(e: any) {
    const country = e.toLowerCase();

    if (country === 'united states') {
      setShowState(true);
    } else {
      setShowState(false);
    }

    setFormData((prevData) => ({
      ...prevData,
      country,
    }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formValues = Object.entries(formData);
    formValues.forEach((ob) => {
      const key = ob[0];
      const value = ob[1];

      if (key === 'fullName') {
        if (value !== 'kita') {
          return alert('MORA BITI KITA');
        }
      }
    });
    console.log(formData);
  };

  return (
    <div className="bg-default-200">
      <div className="max-w-lg w-full bg-default-300 shadow-lg rounded-lg p-8 mx-auto">
        <Link
          to="/pricing-more"
          className="text-emphasis cursor-pointer block text-xl"
        >
          <i className="fa-solid fa-arrow-left cursor-pointer"></i>
        </Link>

        <div className="max-w-lg p-4 mx-auto">
          <h1 className="text-4xl font-bold text-emphasis text-center">
            Billing Address
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 text-primary border-[1px] border-default-100 focus:border-emphasis focus:outline-none focus:ring-1 focus:ring-emphasis rounded-lg bg-default-100 placeholder-secondary-100 cursor-pointer"
              />
            </div>

            <div>
              <input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 text-primary border-[1px] border-default-100 focus:border-emphasis focus:outline-none focus:ring-1 focus:ring-emphasis rounded-lg bg-default-100 placeholder-secondary-100 cursor-pointer"
              />
            </div>

            <div>
              <input
                type="text"
                id="address"
                placeholder="Address Line 1"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 text-primary border-[1px] border-default-100 focus:border-emphasis focus:outline-none focus:ring-1 focus:ring-emphasis rounded-lg bg-default-100 placeholder-secondary-100 cursor-pointer"
              />
            </div>

            <div>
              <input
                type="text"
                id="address2"
                placeholder="Address Line 2"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                className="w-full px-4 py-2 text-primary border-[1px] border-default-100 focus:border-emphasis focus:outline-none focus:ring-1 focus:ring-emphasis rounded-lg bg-default-100 placeholder-secondary-100 cursor-pointer"
              />
            </div>
            <CountrySelect handleChange={handleCountryState} />

            <div>
              <input
                type="text"
                id="city"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 text-primary border-[1px] border-default-100 focus:border-emphasis focus:outline-none focus:ring-1 focus:ring-emphasis rounded-lg bg-default-100 placeholder-secondary-100 cursor-pointer"
              />
            </div>

            {showState && (
              <input
                type="text"
                id="state"
                placeholder="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2 text-primary border-[1px] border-default-100 focus:border-emphasis focus:outline-none focus:ring-1 focus:ring-emphasis rounded-lg bg-default-100 placeholder-secondary-100 cursor-pointer"
              />
            )}

            <div>
              <input
                type="text"
                id="zipCode"
                placeholder="Postal Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full px-4 py-2 text-primary border-[1px] border-default-100 focus:border-emphasis focus:outline-none focus:ring-1 focus:ring-emphasis rounded-lg bg-default-100 placeholder-secondary-100 cursor-pointer"
              />
            </div>

            <div>
              <input
                type="text"
                id="phoneNumber"
                placeholder="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 text-primary border-[1px] border-default-100 focus:border-emphasis focus:outline-none focus:ring-1 focus:ring-emphasis rounded-lg bg-default-100 placeholder-secondary-100 cursor-pointer"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <Button type="submit" onClick={() => handleSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillingAddress;
