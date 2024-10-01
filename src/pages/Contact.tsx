import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/home/Footer';
import Button from '../components/form/Button';
import Input from '../components/form/Input';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

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

  function setErrorMessage(arg0: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <Navbar />
      <section className="min-h-[100vh] bg-default-200 py-16 px-4 mt-[30px] flex justify-center items-center">
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
              <Input
                name="name"
                type="text"
                placeholder="Name"
                onChange={() => setErrorMessage('')}
                required
              />
            </div>

            <div className="flex flex-col text-primary">
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                onChange={() => setErrorMessage('')}
                required
              />
            </div>

            <div className="w-full text-primary">
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                onChange={() => setErrorMessage('')}
                required
                rows={5}
                className="relative block w-full px-4 py-2 placeholder-secondary-100 text-primary bg-default-200 rounded-lg sm:text-lg border-2 border-secondary-200 focus:outline-none focus:ring-2 focus:ring-emphasis focus:border-transparent pr-10 cursor-pointer"
              />
            </div>

            <Button type="submit">Send</Button>
          </form>
        </div>
      </section>

      <div className="bg-default-100 h-[50vh] flex items-center justify-center">
        <div className="w-full max-w-4xl p-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Our team will check your message as soon as possible.
          </h2>
          <p className="text-primary text-xl mb-6">
            In the meantime, check out your dashboard!
          </p>
          <Link to="/dashboard">
            <Button className="text-lg cursor-pointer">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
