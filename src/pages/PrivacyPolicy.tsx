import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/form/Button';

const PrivacyPolicy: React.FC = () => {
  return (
    <section className="bg-default-200 py-16 px-4">
      <div className="w-full max-w-4xl mx-auto bg-default-300 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-emphasis mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="text-base text-primary mb-4">
          Effective Date: 27/09/2024
        </p>

        <p className="text-primary mb-6">
          At Clickpulse, we value your privacy and are committed to
          protecting your personal information. This Privacy Policy
          explains how we collect, use, disclose, and protect your
          data when you use our website and services (the "Services").
          By using the Services, you consent to the collection and use
          of information in accordance with this Privacy Policy.
        </p>

        <div className="space-y-6">
          <ul className="space-y-6">
            <li>
              <h2 className="text-2xl font-semibold text-emphasis mb-2">
                1. Information We Collect
              </h2>
              <ul className="list-disc list-inside text-primary mb-6">
                <li>
                  <strong>Personal Information:</strong> We may
                  collect personally identifiable information (PII)
                  such as:
                  <ul className="list-inside ml-6">
                    <li>
                      Contact information: name, email address, phone
                      number, and other contact details.
                    </li>
                    <li>
                      Account information: username, password, and
                      information provided during account creation.
                    </li>
                    <li>
                      Payment information: billing details and payment
                      methods for subscription services.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Usage Data:</strong> We collect information
                  about how you interact with our Services, including:
                  <ul className="list-inside ml-6">
                    <li>
                      Device information: IP address, browser type,
                      operating system, etc.
                    </li>
                    <li>
                      Usage details: pages viewed, time spent,
                      clickstream data, and interactions.
                    </li>
                    <li>
                      Cookies and tracking technologies: to enhance
                      your experience.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Analytics Data:</strong> As an analytics
                  provider, we collect data on websites and apps that
                  use our tracking code. This includes:
                  <ul className="list-inside ml-6">
                    <li>
                      Behavioral data: clicks, scrolls, and
                      interaction events.
                    </li>
                    <li>
                      User demographics: location, browser type,
                      device type, etc.
                    </li>
                    <li>
                      Aggregated data: user engagement metrics and
                      usage patterns.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Third-Party Data:</strong> We may receive
                  data from third-party sources like advertising
                  networks, business partners, or social media
                  platforms to improve our services.
                </li>
              </ul>
            </li>

            <li>
              <h2 className="text-2xl font-semibold text-emphasis mb-2">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside text-primary mb-6">
                <li>
                  To provide and maintain the Services, including
                  account creation, billing, and analytics tools.
                </li>
                <li>
                  To improve our Services by analyzing user feedback
                  and interactions.
                </li>
                <li>
                  To communicate with you via updates, notifications,
                  and support responses.
                </li>
                <li>
                  To analyze trends and usage to improve our products.
                </li>
                <li>
                  To ensure security by monitoring for suspicious
                  activity.
                </li>
                <li>
                  For marketing and advertising, unless you opt out.
                </li>
              </ul>
            </li>

            <li>
              <h2 className="text-2xl font-semibold text-emphasis mb-2">
                3. How We Share Your Information
              </h2>
              <ul className="list-disc list-inside text-primary mb-6">
                <li>
                  <strong>Service Providers:</strong> We share
                  personal information with third-party service
                  providers for tasks like hosting, payment
                  processing, and support tools.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the event of
                  a merger or acquisition, your data may be
                  transferred.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose
                  information if required by law or legal process.
                </li>
                <li>
                  <strong>With Your Consent:</strong> We may share
                  your information with your consent.
                </li>
                <li>
                  <strong>Aggregated or De-Identified Data:</strong>{' '}
                  We may share anonymized data for research,
                  marketing, or analytics purposes.
                </li>
              </ul>
            </li>

            <li>
              <h2 className="text-2xl font-semibold text-emphasis mb-2">
                4. Your Data Protection Rights
              </h2>
              <ul className="list-disc list-inside text-primary mb-6">
                <li>
                  <strong>Access and Portability:</strong> You can
                  request access to and a copy of your personal
                  information.
                </li>
                <li>
                  <strong>Correction:</strong> You can request
                  corrections to inaccurate or incomplete data.
                </li>
                <li>
                  <strong>Deletion:</strong> You can request deletion
                  of your personal information, subject to legal
                  exceptions.
                </li>
                <li>
                  <strong>Objection and Restriction:</strong> You may
                  object to or request restrictions on certain data
                  processing.
                </li>
                <li>
                  <strong>Withdrawal of Consent:</strong> You can
                  withdraw consent where we rely on it for data
                  processing.
                </li>
                <li>
                  <strong>
                    Do Not Sell My Personal Information:
                  </strong>{' '}
                  Under CCPA, you have the right to opt out of the
                  sale of your data. (We do not sell your data.)
                </li>
              </ul>
            </li>

            <li>
              <h2 className="text-2xl font-semibold text-emphasis mb-2">
                5. Data Security
              </h2>
              <p className="text-primary">
                We use various technical and organizational measures
                to protect your data, such as encryption during
                transmission, access controls, and regular security
                assessments.
              </p>
            </li>

            <li>
              <h2 className="text-2xl font-semibold text-emphasis mb-2">
                6. Data Retention
              </h2>
              <p className="text-primary">
                We retain personal information as long as necessary to
                provide our Services, or to comply with legal
                obligations, after which data is securely deleted or
                anonymized.
              </p>
            </li>

            <li>
              <h2 className="text-2xl font-semibold text-emphasis mb-2">
                7. Children's Privacy
              </h2>
              <p className="text-primary">
                Our Services are not intended for individuals under
                13, and we do not knowingly collect personal data from
                children under 13.
              </p>
            </li>

            <li>
              <h2 className="text-2xl font-semibold text-emphasis mb-2">
                8. Cookies and Tracking Technologies
              </h2>
              <p className="text-primary">
                We use cookies and similar tracking technologies to
                enhance your experience. You can control cookie
                settings in your browser, but disabling cookies may
                affect functionality.
              </p>
            </li>

            <li>
              <h2 className="text-2xl font-semibold text-emphasis mb-2">
                9. Changes to This Privacy Policy
              </h2>
              <p className="text-primary">
                We may update this Privacy Policy from time to time.
                Changes will be posted on our website with the updated
                "Effective Date." Continued use of the Services
                indicates your acknowledgment and acceptance of the
                changes.
              </p>
            </li>

            <li>
              <h2 className="text-2xl font-semibold text-emphasis">
                10. Contact Us
              </h2>
              <p className="text-primary">
                If you have questions or concerns about this Privacy
                Policy, please contact us at:
              </p>
              <ul className="text-primary">
                <li>Email: support@clickpulse.com</li>
              </ul>
            </li>
          </ul>

          <p className="text-base text-primary mt-8">
            Last Updated: 27/09/2024
          </p>

          <div className="flex justify-end mt-8">
            <Link
              to="/"
              className="text-base hover:text-emphasis-light cursor-pointer"
            >
              <Button>Return home</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
