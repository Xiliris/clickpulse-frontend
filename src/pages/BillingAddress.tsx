import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/form/Button';

const BillingAddress = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-default-200 py-10">
      <div className="w-[70vw] bg-default-200 p-8 mx-auto">
        <Link
          to="/"
          className="text-emphasis cursor-pointer block text-xl"
        >
          <i className="fa-solid fa-arrow-left cursor-pointer"></i>
        </Link>
        <h1 className="text-4xl font-bold text-emphasis mb-6 text-center">
          Billing Address
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="w-[70vw] mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-2 text-primary border-[1px] border-secondary-200 focus:border-emphasis focus:outline-none focus:ring-1 focus:ring-emphasis rounded-md bg-default-100 placeholder-secondary-100 cursor-pointer"
              required
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
              className="w-full px-4 py-2 mb-2 text-primary border-[1px] border-secondary-200 focus:border-emphasis focus:outline-none focus:ring-1 focus:ring-emphasis rounded-md bg-default-100 placeholder-secondary-100 cursor-pointer"
              required
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
              className="w-full px-4 py-2 mb-2 text-primary border-[1px] border-secondary-200 focus:border-emphasis focus:outline-none focus:ring-1 focus:ring-emphasis rounded-md bg-default-100 placeholder-secondary-100 cursor-pointer"
              required
            />
          </div>

          <div>
            <input
              type="text"
              id="address"
              placeholder="Address Line 2"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-2 text-primary border-[1px] border-secondary-200 focus:border-emphasis focus:outline-none focus:ring-1 focus:ring-emphasis rounded-md bg-default-100 placeholder-secondary-100 cursor-pointer"
              required
            />
          </div>

          <div>
            <input
              type="text"
              id="city"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-2 text-primary border-[1px] border-secondary-200 focus:border-emphasis focus:outline-none focus:ring-1 focus:ring-emphasis rounded-md bg-default-100 placeholder-secondary-100 cursor-pointer"
              required
            />
          </div>

          <div>
            <input
              type="text"
              id="state"
              placeholder="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-2 text-primary border-[1px] border-secondary-200 focus:border-emphasis focus:outline-none focus:ring-1 focus:ring-emphasis rounded-md bg-default-100 placeholder-secondary-100 cursor-pointer"
              required
            />
          </div>

          <div>
            <input
              type="text"
              id="zipCode"
              placeholder="Postal Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-2 text-primary border-[1px] border-secondary-200 focus:border-emphasis focus:outline-none focus:ring-1 focus:ring-emphasis rounded-md bg-default-100 placeholder-secondary-100 cursor-pointer"
              required
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
              className="w-full px-4 py-2 mb-2 text-primary border-[1px] border-secondary-200 focus:border-emphasis focus:outline-none focus:ring-1 focus:ring-emphasis rounded-md bg-default-100 placeholder-secondary-100 cursor-pointer"
              required
            />
          </div>

          <div>
            <input
              type="text"
              id="country"
              placeholder="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-2 text-primary border-[1px] border-secondary-200 focus:border-emphasis focus:outline-none focus:ring-1 focus:ring-emphasis rounded-md bg-default-100 placeholder-secondary-100 cursor-pointer"
              required
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Link to="/payment?plan=${plan}&price=${price}">
            <Button className="px-8 py-3">Submit</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default BillingAddress;
