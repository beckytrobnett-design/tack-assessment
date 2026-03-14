import { Link } from 'react-router-dom';

export function Privacy() {
  const sections = [
    {
      title: '1. About This Policy',
      body: 'TACK is a financial wellness platform built by Tondreau Point LLC. This privacy policy explains what information we collect when you use TACK, how we use it, who we share it with, and your rights regarding your data.\n\nWe built TACK for communities that mainstream financial tools were not designed for. That means we take your trust seriously. We do not sell your data. We do not use it to advertise to you. We use it only to provide and improve TACK.\n\nIf you have questions about this policy, contact us at privacy@tondreaupoint.com.'
    },
    {
      title: '2. Who We Are',
      body: 'TACK is operated by Tondreau Point LLC, a limited liability company registered in Connecticut.\n\nTACK is a financial wellness coaching platform, not a licensed financial advisor, financial therapist, or mental health provider. Penny, our AI coaching character, is an AI — not a human, not a licensed professional.'
    },
    {
      title: '3. What Information We Collect',
      subsections: [
        {
          title: 'Information You Provide During Sign-Up',
          body: 'When you create a TACK account, we collect your name, email address, and your responses to the TACK financial orientation assessment. Your assessment responses are used to calculate your financial orientation — one of six types: The Survivor, The Provider, The Striver, The Vigilante, The Avoider, or The Builder.'
        },
        {
          title: 'Your Conversations with Penny',
          body: 'When you chat with Penny, we store the messages you send and Penny\'s responses. These conversations are saved to your account so you can review them and so Penny can provide coaching that builds on what you\'ve shared over time.'
        },
        {
          title: 'Coaching Memory',
          body: 'After each conversation with Penny, we run an automated process that extracts three types of information: commitments (actions you\'ve expressed), breakthroughs (moments where your thinking about money shifted), and language shifts (changes in how you talk about money over time). You can view these in the My Journey section of the app.'
        },
        {
          title: 'Weekly Recap Emails',
          body: 'If you have engaged with Penny at least three times in a given week, we send you a short weekly email. To generate this email, we send excerpts from your recent conversations to an AI model (Claude by Anthropic) to produce a personalized message. You can opt out at any time by contacting privacy@tondreaupoint.com.'
        },
        {
          title: 'Penny Pods — Group Chat (Coming Soon)',
          body: 'Penny Pods are small peer support groups matched by financial orientation. This feature is in development. When Pods launch, your Pod posts will be visible to other members of your specific Pod and to Penny — but not to TACK users outside your Pod. Your private 1:1 conversations with Penny are never shared with your Pod. Pods are opt-in.'
        }
      ]
    },
    {
      title: '4. How We Use Your Information',
      bullets: [
        'To provide Penny\'s coaching service and personalize her responses',
        'To send weekly recap emails when you\'ve been active',
        'To improve the platform using aggregated, de-identified patterns',
        'To review conversations that trigger safety protocols',
        'To communicate with you about your account'
      ]
    },
    {
      title: '5. Who We Share Your Information With',
      body: 'We do not sell your information. We do not share it with advertisers. We share it only with the services that make TACK work:',
      bullets: [
        'Anthropic (Claude AI) — generates Penny\'s responses',
        'Supabase — stores your account data and conversations',
        'Resend — delivers your weekly recap emails',
        'Vercel — hosts the TACK application'
      ],
      bodyAfter: 'We may also disclose information if required by law or to protect the safety of any person.'
    },
    {
      title: '6. Safety Review of Conversations',
      body: 'When conversations contain crisis language or certain disclosures, those conversations may be reviewed by a member of the TACK team. The purpose is to ensure Penny\'s responses were appropriate and the right resources were provided.\n\nPenny will not promise full confidentiality because we cannot guarantee it — certain disclosures may result in human review, and applicable laws may require us to take additional steps.'
    },
    {
      title: '7. How Long We Keep Your Information',
      body: 'We retain your information for as long as your account is active. Your conversation history, coaching memory, and assessment results are deleted when you delete your account. To request data deletion, contact privacy@tondreaupoint.com.'
    },
    {
      title: '8. Your Rights',
      body: 'Depending on where you live, you may have the right to access, correct, or delete your information; to opt out of certain processing; and to receive a portable copy of your data.\n\nTo exercise any of these rights, contact us at privacy@tondreaupoint.com.'
    },
    {
      title: '9. How We Protect Your Information',
      bullets: [
        'Encrypted data transmission (HTTPS) for all communication',
        'Database-level access controls restricting data to authenticated users',
        'API credentials stored as environment variables, never in code',
        'Row-level security policies ensuring each user can only access their own data'
      ],
      bodyAfter: 'No system is perfectly secure. If you believe your account has been compromised, contact us immediately at privacy@tondreaupoint.com.'
    },
    {
      title: '10. About Penny — AI Disclosure',
      body: 'Penny is an AI coaching character powered by Claude, a large language model developed by Anthropic. Penny is not a human, not a licensed therapist, and not a financial advisor.\n\nIf you are experiencing a mental health crisis, contact the 988 Suicide and Crisis Lifeline by calling or texting 988. If you need professional financial advice, consult a licensed financial advisor.'
    },
    {
      title: '11. Children\'s Privacy',
      body: 'TACK is not intended for use by individuals under the age of 18. We do not knowingly collect information from minors. Contact privacy@tondreaupoint.com if you believe we have collected information from a minor.'
    },
    {
      title: '12. Changes to This Policy',
      body: 'We may update this policy from time to time. For material changes, we will notify you by email or by a notice in the app. Your continued use of TACK after an update constitutes your acceptance of the updated policy.'
    },
    {
      title: '13. Contact Us',
      body: 'Tondreau Point LLC\nprivacy@tondreaupoint.com'
    }
  ];

  return (
    <div style={styles.page}>
      <header className="bg-sage-dark px-6 py-5 flex items-center justify-between sticky top-0 z-50">
        <img src="https://tack.tondreaupoint.com/logos/logo-sail-mark-dark.png" alt="" className="h-10 w-auto" />
        <Link to="/" className="text-white/50 hover:text-white text-sm transition-colors">← Back to TACK</Link>
      </header>
      <div style={styles.container}>

        {/* Page title */}
        <div style={styles.brandHeader}>
          <img src="https://tack.tondreaupoint.com/logos/logo-stacked-light.png" alt="TACK by Tondreau Point" className="w-36 mx-auto mb-6" />
          <div style={styles.pageTitle}>Privacy Policy</div>
          <div style={styles.effectiveDate}>Effective March 2026</div>
        </div>

        {/* Sections */}
        {sections.map((section, i) => (
          <div key={i} style={styles.section}>
            <h2 style={styles.sectionTitle}>{section.title}</h2>

            {section.body && section.body.split('\n\n').map((para, j) => (
              <p key={j} style={styles.body}>{para}</p>
            ))}

            {section.subsections && section.subsections.map((sub, j) => (
              <div key={j} style={styles.subsection}>
                <h3 style={styles.subsectionTitle}>{sub.title}</h3>
                {sub.body.split('\n\n').map((para, k) => (
                  <p key={k} style={styles.body}>{para}</p>
                ))}
              </div>
            ))}

            {section.bullets && (
              <ul style={styles.bulletList}>
                {section.bullets.map((item, j) => (
                  <li key={j} style={styles.bulletItem}>{item}</li>
                ))}
              </ul>
            )}

            {section.bodyAfter && section.bodyAfter.split('\n\n').map((para, j) => (
              <p key={j} style={styles.body}>{para}</p>
            ))}
          </div>
        ))}

        {/* Footer */}
        <footer className="bg-sage-dark py-8 text-center">
          <img src="https://tack.tondreaupoint.com/logos/logo-wordmark-dark.png" alt="TACK by Tondreau Point" className="h-6 w-auto mx-auto" />
        </footer>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#F5EFE6',
    minHeight: '100vh',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  container: {
    maxWidth: 680,
    margin: '0 auto',
    padding: '48px 24px 80px',
  },
  brandHeader: {
    textAlign: 'center',
    paddingBottom: 40,
    borderBottom: '1px solid rgba(196,131,74,0.2)',
    marginBottom: 8,
  },
  pageTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: 22,
    fontWeight: '600',
    color: '#1C2B3F',
    marginBottom: 8,
  },
  effectiveDate: {
    fontFamily: 'Georgia, serif',
    fontSize: 13,
    fontStyle: 'italic',
    color: '#999',
  },
  section: {
    padding: '28px 0',
    borderBottom: '1px solid rgba(43,62,46,0.08)',
  },
  sectionTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: 17,
    fontWeight: '600',
    color: '#1C2B3F',
    margin: '0 0 12px 0',
  },
  subsection: {
    marginTop: 20,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C2B3F',
    margin: '0 0 8px 0',
  },
  body: {
    fontSize: 15,
    color: '#2B3A52',
    lineHeight: '1.7',
    margin: '0 0 12px 0',
  },
  bulletList: {
    margin: '8px 0 12px 0',
    paddingLeft: 24,
  },
  bulletItem: {
    fontSize: 15,
    color: '#2B3A52',
    lineHeight: '1.7',
    marginBottom: 6,
  },
  footer: {
    textAlign: 'center',
    paddingTop: 48,
  },
  footerBrand: {
    fontFamily: 'Georgia, serif',
    fontSize: 14,
    fontStyle: 'italic',
    color: '#C4834A',
    marginBottom: 10,
  },
  footerLink: {
    fontSize: 13,
    color: '#1C2B3F',
    textDecoration: 'underline',
  },
};
