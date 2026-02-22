import { Link } from 'react-router-dom';

export function Privacy() {
  return (
    <div className="min-h-screen bg-warmCream">
      <div className="max-w-[680px] mx-auto px-4 py-8 md:py-12">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/">
            <img
              src="/logo-horizontal.png"
              alt="TACK by Tondreau Point"
              className="h-[100px] md:h-[120px] w-auto object-contain"
            />
          </Link>
        </div>

        <h1 className="text-h1 font-bold text-deepNavy mb-2">Your Privacy</h1>
        <p className="text-body text-slateGray mb-8">
          How we handle your information
        </p>

        <div className="prose prose-deepNavy space-y-6 text-body text-deepNavy leading-relaxed">
          <p>
            We take your trust seriously. This policy describes what we collect,
            how we use it, and your rights. If anything is unclear, please ask.
          </p>

          <section>
            <h2 className="text-h3 font-medium text-deepNavy mt-8 mb-3">
              What we collect
            </h2>
            <p className="mb-3">
              When you complete the TACK assessment, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Name and email address</strong> — so we can deliver your
                orientation report and, if you choose, add you to our waitlist
              </li>
              <li>
                <strong>Your questionnaire responses</strong> — the 24 answers
                you provide
              </li>
              <li>
                <strong>Your orientation type</strong> — the profile generated
                from your responses (e.g., The Survivor, The Builder)
              </li>
              <li>
                <strong>Waitlist preference</strong> — if you choose to join the
                waitlist, we record that choice
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 font-medium text-deepNavy mt-8 mb-3">
              How we use it
            </h2>
            <p className="mb-3">
              We use your information only to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Generate and deliver your financial orientation report</li>
              <li>Send your PDF report to your email</li>
              <li>Add you to our waitlist if you opt in</li>
              <li>Improve the TACK experience over time</li>
            </ul>
            <p className="mt-4">
              We do not sell, rent, or share your personal data with third
              parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-medium text-deepNavy mt-8 mb-3">
              How we protect it
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                All data is transmitted over encrypted connections (TLS/SSL)
              </li>
              <li>
                Data is stored in a secure database with access limited to
                authorized personnel
              </li>
              <li>
                We use trusted service providers (Supabase for storage, Resend
                for email) that follow industry security practices
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 font-medium text-deepNavy mt-8 mb-3">
              Your rights
            </h2>
            <p className="mb-3">
              You may, at any time:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request a copy of the data we hold about you</li>
              <li>Ask us to correct inaccuracies</li>
              <li>Request that we delete your information</li>
            </ul>
            <p className="mt-4">
              We will respond to such requests within 30 days. Contact us using
              the details on our website.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-medium text-deepNavy mt-8 mb-3">
              Cookies and analytics
            </h2>
            <p>
              We currently do not use analytics, advertising trackers, or
              behavioral tracking. We do not sell behavioral data. If we add
              analytics in the future, we will update this policy.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-medium text-deepNavy mt-8 mb-3">
              Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time. The current version
              will always be available on this page. Continued use of TACK after
              changes means you accept the updated policy.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <Link
            to="/"
            className="text-body text-bronze hover:text-deepNavy transition-colors"
          >
            ← Back to TACK
          </Link>
        </div>
      </div>
    </div>
  );
}
