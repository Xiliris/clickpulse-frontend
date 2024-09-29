import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/form/Button';

const TermsOfService: React.FC = () => {
  return (
    <section className="bg-default-200 py-16 px-4">
      <div className="w-full max-w-4xl mx-auto bg-default-300 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-emphasis mb-6 text-center">
          Terms of Service
        </h1>

        <p className="text-base text-primary mb-4">
          Effective Date: 27/09/2024
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-emphasis mb-2">
            1. Acceptance of Terms
          </h2>
          <p className="text-primary">
            By accessing, visiting, or using the Services in any
            manner, you agree to comply with and be bound by these
            Terms and our Privacy Policy. If you are using our
            Services on behalf of a business, you agree that you have
            the authority to bind that business to these Terms.
          </p>

          <h2 className="text-2xl font-semibold text-emphasis mb-2">
            2. Services Provided
          </h2>
          <p className="text-primary">
            Clickpulse provides analytics and tracking services for
            websites and mobile applications. Our tools allow you to
            gain insights into user behavior and optimize your digital
            experience. The Services may include data tracking,
            reporting, and analytical insights as described on the
            Site.
          </p>

          <h2 className="text-2xl font-semibold text-emphasis mb-2">
            3. Use of Services
          </h2>
          <p className="text-primary">
            You agree to use the Services only for lawful purposes and
            in compliance with these Terms and any applicable local,
            state, national, and international laws. You may not:{' '}
            <br />
            Use the Services for any illegal or unauthorized purpose;{' '}
            <br />
            Violate any laws in your jurisdiction; <br /> Interfere
            with or disrupt the integrity or performance of the
            Services; <br /> Attempt to gain unauthorized access to
            the Services, other accounts, or systems of Clickpulse.
          </p>

          <h2 className="text-2xl font-semibold text-emphasis mb-2">
            4. User Account and Security
          </h2>
          <p className="text-primary">
            To access certain features of the Services, you may be
            required to create an account. You are responsible for
            maintaining the confidentiality of your account
            information and are liable for all activities that occur
            under your account. You agree to notify us immediately of
            any unauthorized use of your account.
          </p>

          <h2 className="text-2xl font-semibold text-emphasis mb-2">
            5. Subscription and Fees
          </h2>
          <p className="text-primary">
            Some features of our Services may require payment of
            subscription fees. By signing up for a paid account, you
            agree to pay the applicable fees as described on the Site.
            Fees are non-refundable except as required by law or as
            stated otherwise in the pricing section. We reserve the
            right to change our pricing or add new services with
            different fee structures at any time. Any changes will be
            communicated to you in advance.
          </p>

          <h2 className="text-2xl font-semibold text-emphasis mb-2">
            6. Data Collection and Privacy
          </h2>
          <p className="text-primary">
            Your use of the Services is subject to our Privacy Policy,
            which outlines how we collect, use, and protect your data.
            By using our Services, you consent to the collection and
            processing of data as described in our Privacy Policy. You
            agree to use the analytics data provided by Clickpulse in
            accordance with applicable data privacy laws and
            regulations, including GDPR, CCPA, or any other relevant
            privacy legislation. You must ensure that you have
            obtained the necessary consent from your users to collect
            and process their data through our Services.
          </p>

          <h2 className="text-2xl font-semibold text-emphasis mb-2">
            7. Intellectual Property
          </h2>
          <p className="text-primary">
            All content, trademarks, and intellectual property
            associated with the Services are the exclusive property of
            Clickpulse. You may not copy, reproduce, distribute, or
            create derivative works from any part of our Services
            without prior written consent.
          </p>

          <h2 className="text-2xl font-semibold text-emphasis mb-2">
            8. Termination
          </h2>
          <p className="text-primary">
            We reserve the right to suspend or terminate your access
            to the Services at our sole discretion if we believe that
            you have violated these Terms or any applicable laws. You
            may also terminate your account at any time by providing
            written notice to us. Upon termination, you must cease all
            use of the Services and delete any copies of materials
            obtained through the Services.
          </p>

          <h2 className="text-2xl font-semibold text-emphasis mb-2">
            9. Disclaimer of Warranties
          </h2>
          <p className="text-primary">
            The Services are provided "as-is" and "as available,"
            without warranty of any kind, either express or implied,
            including but not limited to the implied warranties of
            merchantability, fitness for a particular purpose, and
            non-infringement. We do not warrant that: the Services
            will be uninterrupted, secure, or error-free; the
            information provided through the Services is accurate,
            complete, or reliable; or any defects or errors will be
            corrected.
          </p>

          <h2 className="text-2xl font-semibold text-emphasis mb-2">
            10. Limitation of Liability
          </h2>
          <p className="text-primary">
            To the fullest extent permitted by law, in no event shall
            Clickpulse, its directors, employees, partners, or
            affiliates be liable for any indirect, incidental,
            special, consequential, or punitive damages, or any loss
            of profits or revenues, whether incurred directly or
            indirectly, or any loss of data, use, goodwill, or other
            intangible losses, resulting from: your use or inability
            to use the Services; any unauthorized access to or use of
            our servers and/or any personal information stored
            therein; or any bugs, viruses, or other harmful code that
            may be transmitted to or through our Services.
          </p>

          <h2 className="text-2xl font-semibold text-emphasis mb-2">
            11. Indemnification
          </h2>
          <p className="text-primary">
            You agree to indemnify, defend, and hold harmless
            Clickpulse and its affiliates from any claims,
            liabilities, damages, losses, or expenses arising from
            your use of the Services, your violation of these Terms,
            or your violation of any rights of another.
          </p>

          <h2 className="text-2xl font-semibold text-emphasis mb-2">
            12. Modifications to the Terms
          </h2>
          <p className="text-primary">
            We reserve the right to update or modify these Terms at
            any time. If we make changes, we will post the revised
            Terms on the Site and update the "Effective Date." Your
            continued use of the Services after any modifications will
            constitute your acknowledgment and acceptance of the
            updated Terms.
          </p>

          <h2 className="text-2xl font-semibold text-emphasis mb-2">
            13. Governing Law
          </h2>
          <p className="text-primary">
            These Terms shall be governed by and construed in
            accordance with the laws of Bosnia and Hercegovina,
            without regard to its conflict of law provisions. Any
            disputes arising from these Terms or the use of the
            Services shall be subject to the exclusive jurisdiction of
            the courts located in Bosnia and Hercegovina.
          </p>

          <h2 className="text-2xl font-semibold text-emphasis mb-2">
            14. Contact Information
          </h2>
          <p className="text-primary">
            If you have any questions or concerns about these Terms,
            please contact us at: Email: support@clickpulse.com. By
            using our Services, you acknowledge that you have read,
            understood, and agree to these Terms of Service.
          </p>

          <p className="text-base    text-primary mt-4">
            Last Updated: 27/09/2024
          </p>
        </div>

        <div className="flex justify-end mt-8">
          <Link to="/" className="text-base cursor-pointer">
            <Link to="/">
              <Button>Return home</Button>
            </Link>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;
