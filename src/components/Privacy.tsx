import React from "react";
import Header from "./Header";

const PrivacyPolicy: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-white text-slate-600 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          Welcome to Global Kids Academy website. Your privacy is important to
          us. This privacy policy explains how we handle your information when
          you visit our site.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Information Collection</h2>
        <p className="mb-4">
          We do not collect any personal information from our users. You can
          browse our site without providing any personal details.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
        <p className="mb-4">
          Our website may use cookies to enhance your browsing experience.
          Cookies are small files stored on your device that help us understand
          how you use our site. You can disable cookies through your browser
          settings if you prefer not to use them.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          Third-Party Advertisements
        </h2>
        <p className="mb-4">
          We may display third-party advertisements on our site. These ads may
          use cookies and other technologies to collect information about your
          browsing habits. This information is used to show you relevant ads. We
          do not have access to or control over the cookies used by third-party
          advertisers.
        </p>

        <h2 className="text-2xl font-semibold mb-2">External Links</h2>
        <p className="mb-4">
          Our website may contain links to external sites. We are not
          responsible for the privacy practices or content of these external
          sites. We encourage you to read the privacy policies of any external
          sites you visit.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update this privacy policy from time to time. Any changes will
          be posted on this page. We encourage you to review this policy
          periodically to stay informed about how we are protecting your
          information.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p>
          If you have any questions or concerns about our privacy policy, please
          contact us at{" "}
          <a href="#" className="text-purple-600">
            admin@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
