export default function FAQPage() {
  return (
    <article className="relative flex flex-col items-center w-full max-w-[1200px] min-h-screen mx-auto py-6 px-5 md:px-0">
      <h1 className="font-bold text-4xl md:text-7xl mb-6 text-center">FAQs</h1>
      <section className="w-full">
        <h2 className="font-bold text-2xl md:text-3xl mb-4">
          General Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg">1. What is Coffi?</h3>
            <p>
              Coffi is a platform designed to help digital nomads and remote
              workers discover ideal spots for work, study, and relaxation. It
              combines curated spot information with real-time insights provided
              by the community.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">2. Is Coffi free to use?</h3>
            <p>
              Yes, Coffi offers a free plan called "Explorer", which provides
              access to official spots and basic features. For advanced features
              like real-time insights, additional filters, and exclusive spots,
              you can subscribe to our premium plans.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full mt-8">
        <h2 className="font-bold text-2xl md:text-3xl mb-4">
          Privacy and Security
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg">
              1. What personal information does Coffi collect?
            </h3>
            <p>
              Coffi collects basic personal information like your name and email
              when you create an account. It may also collect data about how you
              use the platform, your device information, and cookies to improve
              the service.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              2. How does Coffi protect my data?
            </h3>
            <p>
              Coffi implements reasonable security measures to protect your data
              from unauthorized access, disclosure, or misuse. However, no
              method of online data storage is completely secure, so we
              encourage you to use strong passwords and keep your account
              credentials private.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              3. Does Coffi share my information with third parties?
            </h3>
            <p>
              Coffi may share your information with trusted third-party service
              providers to improve its services or comply with legal
              obligations. Rest assured, your data will never be sold for
              marketing purposes.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full mt-8">
        <h2 className="font-bold text-2xl md:text-3xl mb-4">
          Subscription Plans
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg">
              1. What subscription plans does Coffi offer?
            </h3>
            <article>
              <p>Coffi offers three subscription plans:</p>
              <ul className="list-disc ml-5 mt-2">
                <li>
                  <strong>Explorer (Free):</strong> Access to official spots and
                  basic filters.
                </li>
                <li>
                  <strong>Nomad (Premium):</strong> Access to
                  community-discovered spots, real-time insights, and premium
                  features.
                </li>
                <li>
                  <strong>Wanderlust (Coming Soon):</strong> Advanced features
                  and exclusive perks.
                </li>
              </ul>
            </article>
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              2. Can I cancel my subscription anytime?
            </h3>
            <p>
              Yes, you can cancel your subscription at any time. However,
              refunds are subject to Coffi's refund policy.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              3. How do I upgrade my subscription plan?
            </h3>
            <p>
              You can upgrade your subscription plan by going to the settings
              section in your profile and selecting the desired plan.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full mt-8">
        <h2 className="font-bold text-2xl md:text-3xl mb-4">
          Platform Use and Community
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg">
              1. Can I contribute real-time updates to Coffi?
            </h3>
            <p>
              Yes! You can contribute real-time insights about the spots you
              visit, such as noise levels, available seating, or Wi-Fi strength.
              These updates help the Coffi community stay informed.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              2. Are there rewards for contributing updates?
            </h3>
            <p>
              Yes! By contributing real-time updates or discovering new spots,
              you earn Coffi Points, which can be redeemed for exclusive
              features, badges, or other rewards.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              3. What happens if I post inappropriate content?
            </h3>
            <p>
              Posting offensive, false, or illegal content is prohibited and may
              result in account suspension or termination.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full mt-8">
        <h2 className="font-bold text-2xl md:text-3xl mb-4">
          Account and Technical Support
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg">
              1. I forgot my password. How do I reset it?
            </h3>
            <p>
              You can reset your password by clicking the "Forgot Password" link
              on the login page and following the instructions sent to your
              registered email address.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              2. How can I delete my account?
            </h3>
            <p>
              If you wish to delete your account, you can do so by going to your
              profile settings or contacting us at help@coffi.com for
              assistance.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              3. Who do I contact for technical issues?
            </h3>
            <p>
              For any technical issues, feel free to reach out to our support
              team at help@coffi.com.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
