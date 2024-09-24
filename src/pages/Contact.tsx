import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Home/Footer';
import Button from '../components/form/Button';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    console.log('Form submitted', formData);

    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-default-200 py-16 px-4 mt-[64px]">
        <div className="w-full max-w-4xl mx-auto p-8">
          <h1 className="text-3xl font-bold text-emphasis mb-6 text-center">
            Contact Us
          </h1>

          {submitted && (
            <p className="text-primary text-center mb-6">
              Thank you for your message! We will get back to you
              shortly.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col text-primary cursor-pointer">
              <label htmlFor="name" className="text-lg font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emphasis focus:outline-none bg-default-200"
              />
            </div>

            <div className="flex flex-col text-primary">
              <label
                htmlFor="email"
                className="text-lg font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emphasis focus:outline-none bg-default-200"
              />
            </div>

            <div className="flex flex-col text-primary">
              <label
                htmlFor="message"
                className="text-lg font-semibold"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emphasis focus:outline-none bg-default-200"
              />
            </div>

            <Button type="submit">Send Message</Button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
