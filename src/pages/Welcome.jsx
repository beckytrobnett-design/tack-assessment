import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SailMark } from '../components/ui/SailMark';

// Lock icon
function LockIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

// Clock icon
function ClockIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// Heart icon
function HeartIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

// Arrow icon
function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function Welcome() {
  const navigate = useNavigate();
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <nav
        className={`fixed top-1 left-0 right-0 z-[100] flex items-center px-6 md:px-12 py-5 transition-all duration-500 ${
          navScrolled ? 'bg-sage-bg/92 backdrop-blur-xl py-4 shadow-[0_1px_0_rgba(43,62,46,0.06)] top-0' : 'bg-gradient-to-b from-sage-dark/7 to-transparent'
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5 no-underline group">
          <div className="transition-transform group-hover:-translate-y-0.5">
            <SailMark size={24} />
          </div>
          <div className="w-px h-[18px] bg-sage-accent/30 flex-shrink-0" />
          <span className="font-display italic font-normal text-sage-dark text-[0.85rem] tracking-[0.02em] whitespace-nowrap">
            Change your financial direction
          </span>
        </Link>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-[380px] pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(43, 62, 46, 0.04) 0%, rgba(107, 143, 110, 0.06) 30%, transparent 100%)' }}
        />
        <div
          className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(107, 143, 110, 0.05) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 flex flex-col items-center max-w-[520px]">
          <div className="flex flex-col items-center gap-6 mb-10">
            <div className="drop-shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <SailMark size={90} />
            </div>
            <div>
              <h1 className="font-display font-semibold text-sage-dark text-[clamp(3rem,8vw,5.5rem)] tracking-[0.08em] leading-tight">
                TACK
              </h1>
              <div className="w-24 h-px mx-auto my-4 bg-gradient-to-r from-sage-dark via-sage-cta to-sage-accent" aria-hidden />
              <p className="tack-byline text-[clamp(0.65rem,1.5vw,0.8rem)]">
                by Tondreau Point
              </p>
            </div>
          </div>

          <h2 className="font-display font-medium text-sage-dark text-[clamp(1.5rem,3.5vw,2.1rem)] leading-tight mb-5">
            Let's talk about you and money.
          </h2>
          <p className="text-sage-text-body text-[1.02rem] leading-relaxed mb-2">
            Not your budget. Not your credit score. You and the relationship you've built with money over your whole life.
          </p>
          <p className="text-sage-text-light text-[0.9rem] mb-10">
            <span className="text-sage-accent font-medium">7 minutes.</span> No wrong answers — just honest ones.
          </p>

          <button
            type="button"
            onClick={() => navigate('/assessment')}
            className="inline-flex items-center gap-2 font-medium bg-sage-cta text-sage-bg hover:bg-sage-cta-hover shadow-elevated rounded-full px-10 py-4 text-[0.92rem] tracking-[0.04em] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sage-cta focus:ring-offset-2 group"
          >
            Let's get started
            <ArrowIcon />
          </button>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sage-text-light text-[0.65rem] tracking-[0.15em] uppercase z-10">
          <div
            className="w-px h-7 bg-gradient-to-b from-sage-accent to-transparent animate-pulse"
            style={{ animationDuration: '2.5s' }}
          />
        </div>
      </section>

      {/* About */}
      <section className="py-20 md:py-32 px-6 bg-sage-bg-card relative">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(43,62,46,0.12), rgba(181,137,62,0.15), transparent)' }}
        />
        <div className="max-w-[860px] mx-auto grid md:grid-cols-[auto_1fr] gap-0 md:gap-16 items-start">
          <div data-reveal data-reveal-opacity="60" className="hidden md:block pt-2 opacity-0 translate-y-7 transition-all duration-700">
            <SailMark size={48} />
          </div>
          <div>
            <div
              data-reveal
              className="flex items-center gap-3 mb-7 text-[0.65rem] font-medium tracking-[0.25em] uppercase text-sage-cta opacity-0 translate-y-7 transition-all duration-700"
            >
              <div className="w-5 h-px bg-sage-cta" />
              What is TACK
            </div>
            <h3
              data-reveal
              className="font-display font-medium text-sage-dark text-[clamp(1.7rem,3.5vw,2.4rem)] leading-snug mb-7 max-w-[580px] opacity-0 translate-y-7 transition-all duration-700"
            >
              Your financial orientation is a starting point, not a scorecard.
            </h3>
            <p data-reveal className="text-sage-text-body text-base leading-relaxed mb-5 max-w-[520px] opacity-0 translate-y-7 transition-all duration-700">
              TACK is a reflective questionnaire designed to uncover how you think about, feel about, and interact with money. It's the foundation for financial guidance that actually fits your life.
            </p>
            <p data-reveal className="text-sage-text-body text-base leading-relaxed mb-5 max-w-[520px] opacity-0 translate-y-7 transition-all duration-700">
              We believe the most important financial conversations start with understanding — not products, not projections, not pressure.
            </p>
            <Link
              data-reveal
              to="/methodology"
              className="inline-flex items-center gap-2 text-sage-cta text-[0.8rem] font-medium tracking-[0.04em] mt-3 py-2.5 px-5 border border-sage-cta/40 rounded-full hover:bg-sage-cta hover:text-sage-bg hover:border-sage-cta transition-all duration-300 group opacity-0 translate-y-7 transition-all duration-700"
            >
              Learn More
              <span className="transition-transform group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-20 md:py-32 px-6 bg-sage-bg">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <div
              data-reveal
              className="flex items-center justify-center gap-3 mb-3 text-[0.65rem] font-medium tracking-[0.25em] uppercase text-sage-cta opacity-0 translate-y-7 transition-all duration-700"
            >
              <div className="w-5 h-px bg-sage-cta" />
              What to expect
            </div>
            <h3
              data-reveal
              className="font-display font-medium text-sage-dark text-[clamp(1.5rem,3vw,2.1rem)] mt-3 opacity-0 translate-y-7 transition-all duration-700"
            >
              A simple, honest conversation in three parts.
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { num: '01', title: 'Your story', text: "How did you grow up thinking about money? What shaped your earliest instincts?" },
              { num: '02', title: 'Your present', text: "Where are you now? What feels clear, and what feels uncertain about your financial life?" },
              { num: '03', title: 'Your direction', text: "What do you actually want from your money — not what you think you should want?" },
            ].map((card, i) => (
              <div
                key={card.num}
                data-reveal
                className="p-8 md:p-10 rounded-xl bg-sage-bg-card border border-sage-accent-muted transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(43,62,46,0.06)] group opacity-0 translate-y-7 transition-all duration-700 relative"
              >
                <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-sage-dark via-sage-cta to-sage-accent rounded opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="font-display text-[2.2rem] font-light text-sage-accent leading-none mb-5">{card.num}</div>
                <h4 className="font-display font-semibold text-sage-dark text-lg mb-2.5">{card.title}</h4>
                <p className="text-sage-text-body text-[0.9rem] leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-14 px-6 bg-sage-dark relative overflow-hidden">
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none">
          <SailMark size={200} />
        </div>
        <div className="max-w-[700px] mx-auto flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 flex-wrap relative z-10">
          <div className="flex items-center gap-2.5 text-[rgba(246,243,237,0.55)] text-[0.82rem] tracking-[0.02em]">
            <span className="text-sage-accent-light flex-shrink-0">
              <LockIcon />
            </span>
            Everything stays between us
          </div>
          <div className="flex items-center gap-2.5 text-[rgba(246,243,237,0.55)] text-[0.82rem] tracking-[0.02em]">
            <span className="text-sage-accent-light flex-shrink-0">
              <ClockIcon />
            </span>
            About 7 minutes
          </div>
          <div className="flex items-center gap-2.5 text-[rgba(246,243,237,0.55)] text-[0.82rem] tracking-[0.02em]">
            <span className="text-sage-accent-light flex-shrink-0">
              <HeartIcon />
            </span>
            No wrong answers
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="start" className="py-24 md:py-32 px-6 bg-sage-bg-card text-center relative">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(43,62,46,0.12), rgba(181,137,62,0.15), transparent)' }}
        />
        <div className="mb-8 opacity-50">
          <SailMark size={40} />
        </div>
        <h3 className="font-display font-medium text-sage-dark text-[clamp(1.8rem,4vw,2.8rem)] leading-snug mb-5">
          Ready to start?
        </h3>
        <p className="text-sage-text-body text-[1.05rem] max-w-[480px] mx-auto mb-10 leading-relaxed">
          The best financial plans begin with understanding yourself. Take the first step.
        </p>
        <Link
          to="/assessment"
          className="inline-flex items-center gap-2 font-medium bg-sage-cta text-sage-bg hover:bg-sage-cta-hover shadow-elevated rounded-full px-10 py-4 text-[0.92rem] tracking-[0.04em] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sage-cta focus:ring-offset-2 group"
        >
          Begin the questionnaire
          <span className="transition-transform group-hover:translate-x-1">
            <ArrowIcon />
          </span>
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 md:px-12 bg-sage-bg border-t border-sage-dark/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div className="flex items-center gap-2.5">
          <SailMark size={18} />
          <span className="font-display font-bold text-sage-dark text-[0.85rem] tracking-[0.15em]">
            TACK <span className="tack-byline text-[0.85rem] tracking-[0.15em]">by Tondreau Point</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="text-[0.7rem] text-sage-text-light hover:text-sage-cta transition-colors tracking-[0.03em]">
            Privacy
          </Link>
          <span className="text-[0.7rem] text-sage-text-light">&copy; 2026 Tondreau Point. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
