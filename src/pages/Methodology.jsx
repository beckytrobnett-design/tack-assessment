import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SailMark } from '../components/ui/SailMark';

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 8H3M7 4l-4 4 4 4" />
    </svg>
  );
}

export function Methodology() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-sage-bg">
      {/* Nav */}
      <nav className="fixed top-1 left-0 right-0 z-[100] px-6 md:px-12 py-5 flex justify-between items-center bg-gradient-to-b from-sage-dark/7 to-transparent">
        <Link to="/" className="flex items-center gap-2.5 no-underline group">
          <SailMark size={24} className="transition-transform group-hover:-translate-y-0.5" />
          <span className="hidden sm:inline w-px h-[18px] bg-sage-accent/30" />
          <span className="font-display italic font-normal text-[0.85rem] text-sage-dark tracking-wide whitespace-nowrap">
            Change your financial direction
          </span>
        </Link>
        <Link
          to="/"
          className="flex items-center gap-1.5 text-[0.75rem] font-medium tracking-wider text-sage-text-light hover:text-sage-cta transition-colors no-underline group"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            <ArrowLeftIcon />
          </span>
          <span>Back to TACK</span>
        </Link>
      </nav>

      {/* Page header */}
      <section className="pt-[10rem] pb-20 px-6 text-center relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-[380px] pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(107,143,110,0.075) 0%, transparent 100%)' }}
        />
        <div
          data-reveal
          className="flex items-center justify-center gap-3 mb-7 text-[0.65rem] font-medium tracking-[0.25em] uppercase text-sage-accent opacity-0 translate-y-7 transition-all duration-700"
        >
          <span className="w-5 h-px bg-sage-accent" />
          Our Approach
          <span className="w-5 h-px bg-sage-accent" />
        </div>
        <h1
          data-reveal
          className="font-display font-semibold text-[clamp(2rem,5vw,3.2rem)] text-sage-dark tracking-wide leading-tight max-w-[680px] mx-auto mb-6 opacity-0 translate-y-7 transition-all duration-700"
        >
          The research behind your financial orientation
        </h1>
        <p
          data-reveal
          className="text-[1.05rem] text-sage-text-body max-w-[560px] mx-auto leading-[1.85] opacity-0 translate-y-7 transition-all duration-700"
        >
          TACK is built on decades of research in behavioral finance, financial psychology, and financial therapy. Here's the thinking that shaped our approach.
        </p>
      </section>

      {/* Content */}
      <div className="max-w-[720px] mx-auto px-6 pb-24">
        {/* The premise */}
        <section data-reveal className="mb-16 opacity-0 translate-y-7 transition-all duration-700">
          <div className="w-10 h-0.5 bg-gradient-to-r from-sage-cta to-sage-accent rounded-sm mb-8" />
          <h2 className="font-display font-semibold text-[clamp(1.3rem,2.5vw,1.65rem)] text-sage-dark leading-snug mb-5">
            Money is personal before it's financial
          </h2>
          <p className="text-[0.95rem] leading-[1.9] text-sage-text-body mb-5">
            Most financial tools start with your numbers: income, debt, savings rate. TACK starts somewhere different. We start with <em className="italic text-sage-dark">you</em> — the person behind the numbers — because research consistently shows that how you think and feel about money is a stronger predictor of financial outcomes than financial literacy alone.
          </p>
          <p className="text-[0.95rem] leading-[1.9] text-sage-text-body mb-5">
            Your earliest experiences with money, the financial behaviors you watched growing up, the messages you absorbed about wealth, scarcity, and success — these form a kind of internal compass that quietly steers every financial decision you make. TACK is designed to help you see that compass clearly.
          </p>
          <div className="bg-sage-bg-card border border-sage-accent/10 border-l-[3px] border-l-sage-cta rounded-r-lg py-7 px-8 my-7">
            <div className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-sage-cta mb-2.5">
              Research Foundation
            </div>
            <p className="text-[0.9rem] leading-relaxed text-sage-text-body">
              Studies in financial psychology have found that unconscious money beliefs — formed primarily in childhood — are significantly associated with income, net worth, financial behaviors, and financial distress, often independent of financial knowledge or education level.
            </p>
            <p className="font-display italic text-[0.82rem] text-sage-text-light mt-3">
              Klontz, B., Britt, S., Mentzer, J., & Klontz, T. (2011). Money Beliefs and Financial Behaviors. Journal of Financial Therapy.
            </p>
          </div>
        </section>

        {/* Money scripts */}
        <section data-reveal className="mb-16 opacity-0 translate-y-7 transition-all duration-700">
          <div className="w-10 h-0.5 bg-gradient-to-r from-sage-cta to-sage-accent rounded-sm mb-8" />
          <h2 className="font-display font-semibold text-[clamp(1.3rem,2.5vw,1.65rem)] text-sage-dark leading-snug mb-5">
            Money scripts: the beliefs running in the background
          </h2>
          <p className="text-[0.95rem] leading-[1.9] text-sage-text-body mb-5">
            Dr. Brad Klontz and Dr. Ted Klontz's foundational research on <em className="italic text-sage-dark">money scripts</em> identified four core patterns of money beliefs that most people carry unconsciously: money avoidance, money worship, money status, and money vigilance. Each shapes financial behavior in distinct ways, and most of us carry some combination of all four.
          </p>
          <p className="text-[0.95rem] leading-[1.9] text-sage-text-body mb-5">
            TACK draws on this framework to help people recognize their own patterns — not to label them, but to create a starting point for more intentional financial choices. Awareness of your money scripts has been linked to reduced financial anxiety and improved decision-making.
          </p>
          <div className="bg-sage-bg-card border border-sage-accent/10 border-l-[3px] border-l-sage-cta rounded-r-lg py-7 px-8 my-7">
            <div className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-sage-cta mb-2.5">
              Key Finding
            </div>
            <p className="text-[0.9rem] leading-relaxed text-sage-text-body">
              Money avoidance beliefs were associated with lower income and net worth. Money worship and money status beliefs were associated with compulsive spending and financial dependence. Money vigilance, while generally protective, was associated with anxiety when taken to extremes.
            </p>
            <p className="font-display italic text-[0.82rem] text-sage-text-light mt-3">
              Klontz, B. & Britt, S. (2012). How Clients' Money Scripts Predict Their Financial Behaviors. Journal of Financial Planning.
            </p>
          </div>
        </section>

        {/* Financial socialization */}
        <section data-reveal className="mb-16 opacity-0 translate-y-7 transition-all duration-700">
          <div className="w-10 h-0.5 bg-gradient-to-r from-sage-cta to-sage-accent rounded-sm mb-8" />
          <h2 className="font-display font-semibold text-[clamp(1.3rem,2.5vw,1.65rem)] text-sage-dark leading-snug mb-5">
            Financial socialization: you learned money before you learned math
          </h2>
          <p className="text-[0.95rem] leading-[1.9] text-sage-text-body mb-5">
            Financial socialization theory examines how individuals acquire financial attitudes, knowledge, and behaviors — primarily through family, peers, media, and direct experience. Research shows that parental financial modeling and communication are among the strongest predictors of adult financial behavior.
          </p>
          <p className="text-[0.95rem] leading-[1.9] text-sage-text-body mb-5">
            This is why the first section of TACK asks about your story. We're not being nostalgic — we're helping you identify the invisible curriculum that taught you how to relate to money long before anyone handed you a budget spreadsheet.
          </p>
          <div className="bg-sage-bg-card border border-sage-accent/10 border-l-[3px] border-l-sage-cta rounded-r-lg py-7 px-8 my-7">
            <div className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-sage-cta mb-2.5">
              Research Foundation
            </div>
            <p className="text-[0.9rem] leading-relaxed text-sage-text-body">
              Parental financial socialization during childhood and adolescence has been found to predict financial attitudes, saving behaviors, and credit management well into adulthood. The effect persists even after controlling for income and education.
            </p>
            <p className="font-display italic text-[0.82rem] text-sage-text-light mt-3">
              Gudmunson, C. & Danes, S. (2011). Family Financial Socialization: Theory and Critical Review. Journal of Family and Economic Issues.
            </p>
          </div>
        </section>

        {/* Behavioral finance */}
        <section data-reveal className="mb-16 opacity-0 translate-y-7 transition-all duration-700">
          <div className="w-10 h-0.5 bg-gradient-to-r from-sage-cta to-sage-accent rounded-sm mb-8" />
          <h2 className="font-display font-semibold text-[clamp(1.3rem,2.5vw,1.65rem)] text-sage-dark leading-snug mb-5">
            Behavioral finance: why knowing better doesn't mean doing better
          </h2>
          <p className="text-[0.95rem] leading-[1.9] text-sage-text-body mb-5">
            Decades of research in behavioral economics — pioneered by Daniel Kahneman, Amos Tversky, and Richard Thaler — has demonstrated that financial decisions are rarely purely rational. Loss aversion, present bias, mental accounting, and status quo bias all influence how we save, spend, invest, and plan.
          </p>
          <p className="text-[0.95rem] leading-[1.9] text-sage-text-body mb-5">
            TACK incorporates these insights by focusing not just on what you know, but on how you actually behave with money and why. Understanding the gap between your intentions and your actions is where real financial growth begins.
          </p>
          <div className="bg-sage-bg-card border border-sage-accent/10 border-l-[3px] border-l-sage-cta rounded-r-lg py-7 px-8 my-7">
            <div className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-sage-cta mb-2.5">
              Key Finding
            </div>
            <p className="text-[0.9rem] leading-relaxed text-sage-text-body">
              People consistently weigh potential losses roughly twice as heavily as equivalent gains — a bias that affects investment decisions, spending patterns, and willingness to make financial changes. This asymmetry operates below conscious awareness.
            </p>
            <p className="font-display italic text-[0.82rem] text-sage-text-light mt-3">
              Kahneman, D. & Tversky, A. (1979). Prospect Theory: An Analysis of Decision under Risk. Econometrica.
            </p>
          </div>
        </section>

        {/* Financial therapy */}
        <section data-reveal className="mb-16 opacity-0 translate-y-7 transition-all duration-700">
          <div className="w-10 h-0.5 bg-gradient-to-r from-sage-cta to-sage-accent rounded-sm mb-8" />
          <h2 className="font-display font-semibold text-[clamp(1.3rem,2.5vw,1.65rem)] text-sage-dark leading-snug mb-5">
            Financial therapy: where money meets meaning
          </h2>
          <p className="text-[0.95rem] leading-[1.9] text-sage-text-body mb-5">
            Financial therapy is a relatively new discipline that integrates cognitive, emotional, behavioral, relational, and economic aspects of financial wellbeing. The Financial Therapy Association, founded in 2010, has helped establish a body of research showing that addressing the emotional and relational dimensions of money produces better financial outcomes than financial education alone.
          </p>
          <p className="text-[0.95rem] leading-[1.9] text-sage-text-body">
            TACK's approach is informed by this integrated model. We believe that a financial orientation — your unique combination of beliefs, behaviors, emotions, and aspirations around money — is the essential context that any good financial guidance needs to account for.
          </p>
        </section>

        {/* Three pillars */}
        <section data-reveal className="mb-16 opacity-0 translate-y-7 transition-all duration-700">
          <div className="w-10 h-0.5 bg-gradient-to-r from-sage-cta to-sage-accent rounded-sm mb-8" />
          <h2 className="font-display font-semibold text-[clamp(1.3rem,2.5vw,1.65rem)] text-sage-dark leading-snug mb-5">
            The three parts of your orientation
          </h2>
          <p className="text-[0.95rem] leading-[1.9] text-sage-text-body mb-8">
            TACK's questionnaire is structured around three dimensions, each grounded in research:
          </p>
          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-sage-bg-card border border-sage-accent/10 rounded-lg p-7 relative">
              <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-sage-cta to-transparent rounded-sm" />
              <div className="font-display text-[1.8rem] font-light text-sage-accent leading-none mb-3">01</div>
              <div className="font-display font-semibold text-[1.05rem] text-sage-dark mb-2">Your Story</div>
              <p className="text-[0.82rem] leading-relaxed text-sage-text-body">
                Explores your financial socialization — the money messages, models, and experiences that shaped your earliest financial instincts.
              </p>
            </div>
            <div className="bg-sage-bg-card border border-sage-accent/10 rounded-lg p-7 relative">
              <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-sage-cta to-transparent rounded-sm" />
              <div className="font-display text-[1.8rem] font-light text-sage-accent leading-none mb-3">02</div>
              <div className="font-display font-semibold text-[1.05rem] text-sage-dark mb-2">Your Present</div>
              <p className="text-[0.82rem] leading-relaxed text-sage-text-body">
                Maps your current money scripts and behavioral patterns — where your beliefs and behaviors align, and where they diverge.
              </p>
            </div>
            <div className="bg-sage-bg-card border border-sage-accent/10 rounded-lg p-7 relative">
              <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-sage-cta to-transparent rounded-sm" />
              <div className="font-display text-[1.8rem] font-light text-sage-accent leading-none mb-3">03</div>
              <div className="font-display font-semibold text-[1.05rem] text-sage-dark mb-2">Your Direction</div>
              <p className="text-[0.82rem] leading-relaxed text-sage-text-body">
                Draws on life planning methodology to identify what you actually want from your money — your values, not just your goals.
              </p>
            </div>
          </div>
          <p className="text-[0.95rem] leading-[1.9] text-sage-text-body mb-5">
            The third dimension — direction — is particularly influenced by the work of George Kinder and the Life Planning movement. Kinder's research demonstrated that when financial planning begins with a person's deepest values and life aspirations rather than their account balances, engagement, follow-through, and overall financial satisfaction all improve significantly.
          </p>
          <div className="bg-sage-bg-card border border-sage-accent/10 border-l-[3px] border-l-sage-cta rounded-r-lg py-7 px-8 my-7">
            <div className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-sage-cta mb-2.5">
              Research Foundation
            </div>
            <p className="text-[0.9rem] leading-relaxed text-sage-text-body">
              Life planning approaches that begin with values clarification have been associated with higher client engagement, greater plan adherence, and improved subjective financial wellbeing compared to traditional goals-based planning.
            </p>
            <p className="font-display italic text-[0.82rem] text-sage-text-light mt-3">
              Kinder, G. (2006). Life Planning and the Interior Aspects of Money. Journal of Financial Planning.
            </p>
          </div>
        </section>

        {/* What we're not */}
        <section data-reveal className="mb-16 opacity-0 translate-y-7 transition-all duration-700">
          <div className="w-10 h-0.5 bg-gradient-to-r from-sage-cta to-sage-accent rounded-sm mb-8" />
          <h2 className="font-display font-semibold text-[clamp(1.3rem,2.5vw,1.65rem)] text-sage-dark leading-snug mb-5">
            What TACK is not
          </h2>
          <p className="text-[0.95rem] leading-[1.9] text-sage-text-body mb-5">
            TACK is not a financial plan, a risk assessment, or a personality quiz. It doesn't tell you what to invest in or how much to save. It's not a replacement for professional financial advice.
          </p>
          <p className="text-[0.95rem] leading-[1.9] text-sage-text-body mb-5">
            What it is: a research-informed starting point. A way to understand the person behind the portfolio — so that whatever financial guidance comes next actually fits the life you're trying to build.
          </p>
          <p className="text-[0.95rem] leading-[1.9] text-sage-text-body">
            Because the best financial plan in the world doesn't work if it was built for someone else.
          </p>
        </section>

        {/* References */}
        <section data-reveal className="mt-16 pt-10 border-t border-sage-accent/10 opacity-0 translate-y-7 transition-all duration-700">
          <div className="text-[0.65rem] font-medium tracking-[0.25em] uppercase text-sage-accent mb-6">
            Selected References
          </div>
          <ul className="space-y-3 text-[0.82rem] leading-relaxed text-sage-text-light">
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-cta/35 mt-1.5 flex-shrink-0" aria-hidden />
              <span>Klontz, B., Britt, S., Mentzer, J., & Klontz, T. (2011). Money Beliefs and Financial Behaviors: Development of the Klontz Money Script Inventory. <em className="italic text-sage-text-body">Journal of Financial Therapy, 2</em>(1).</span>
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-cta/35 mt-1.5 flex-shrink-0" aria-hidden />
              <span>Klontz, B. & Britt, S. (2012). How Clients' Money Scripts Predict Their Financial Behaviors. <em className="italic text-sage-text-body">Journal of Financial Planning, 25</em>(11), 46–54.</span>
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-cta/35 mt-1.5 flex-shrink-0" aria-hidden />
              <span>Gudmunson, C. & Danes, S. (2011). Family Financial Socialization: Theory and Critical Review. <em className="italic text-sage-text-body">Journal of Family and Economic Issues, 32</em>(4), 644–667.</span>
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-cta/35 mt-1.5 flex-shrink-0" aria-hidden />
              <span>Kahneman, D. & Tversky, A. (1979). Prospect Theory: An Analysis of Decision under Risk. <em className="italic text-sage-text-body">Econometrica, 47</em>(2), 263–292.</span>
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-cta/35 mt-1.5 flex-shrink-0" aria-hidden />
              <span>Thaler, R. (1999). Mental Accounting Matters. <em className="italic text-sage-text-body">Journal of Behavioral Decision Making, 12</em>(3), 183–206.</span>
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-cta/35 mt-1.5 flex-shrink-0" aria-hidden />
              <span>Kinder, G. (2006). Life Planning and the Interior Aspects of Money. <em className="italic text-sage-text-body">Journal of Financial Planning, 19</em>(8).</span>
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-cta/35 mt-1.5 flex-shrink-0" aria-hidden />
              <span>Archuleta, K. & Grable, J. (2011). The Future of Financial Planning and Counseling: An Introduction to Financial Therapy. In <em className="italic text-sage-text-body">Financial Planning and Counseling Scales</em>. Springer.</span>
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-cta/35 mt-1.5 flex-shrink-0" aria-hidden />
              <span>Britt, S. & Huston, S. (2012). The Role of Money Arguments in Marriage. <em className="italic text-sage-text-body">Journal of Family and Economic Issues, 33</em>(4), 464–476.</span>
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-cta/35 mt-1.5 flex-shrink-0" aria-hidden />
              <span>Shefrin, H. & Statman, M. (2000). Behavioral Portfolio Theory. <em className="italic text-sage-text-body">Journal of Financial and Quantitative Analysis, 35</em>(2), 127–151.</span>
            </li>
          </ul>
        </section>

        {/* CTA banner */}
        <section data-reveal className="mt-20 py-16 px-10 bg-sage-dark rounded-xl text-center relative overflow-hidden opacity-0 translate-y-7 transition-all duration-700">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(107,143,110,0.08) 0%, transparent 70%)' }}
          />
          <h3 className="font-display font-medium text-[clamp(1.4rem,3vw,1.9rem)] text-sage-bg leading-snug mb-4 relative z-10">
            Ready to find your orientation?
          </h3>
          <p className="text-[0.92rem] text-sage-bg/55 max-w-[400px] mx-auto mb-8 leading-relaxed relative z-10">
            Seven minutes. No wrong answers. Just an honest starting point.
          </p>
          <Link
            to="/assessment"
            className="inline-flex items-center gap-2.5 font-medium text-[0.88rem] tracking-wide text-sage-dark bg-sage-bg py-3.5 px-9 rounded-full no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg relative z-10"
          >
            Take the questionnaire
            <ArrowRightIcon />
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-10 px-6 md:px-12 bg-sage-bg border-t border-sage-dark/6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2.5">
          <SailMark size={18} />
          <span className="font-display font-bold text-[0.85rem] text-sage-dark tracking-widest">
            TACK <span className="tack-byline text-[0.85rem] tracking-[0.15em]">by Tondreau Point</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="text-[0.7rem] text-sage-text-light hover:text-sage-cta transition-colors tracking-wide">
            Privacy
          </Link>
          <span className="text-[0.7rem] text-sage-text-light">&copy; 2026 Tondreau Point. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
