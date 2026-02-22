import { Link } from 'react-router-dom';
import { SailMark } from '../components/ui/SailMark';

export function Welcome() {
  return (
    <div className="min-h-screen bg-sage-bg flex flex-col">

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-16 pb-12 md:pt-20 md:pb-16 relative overflow-hidden">
        {/* Atmosphere gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-[380px] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(107, 143, 110, 0.075) 0%, transparent 100%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center max-w-[520px]">
          {/* Brand mark */}
          <div className="flex flex-col items-center gap-6 mb-10">
            <div className="drop-shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <SailMark size={90} />
            </div>
            <div>
              <h1 className="font-display font-semibold text-sage-dark text-[clamp(3rem,8vw,5rem)] tracking-title leading-tight">
                TACK
              </h1>
              <div
                className="w-24 h-px mx-auto my-4 bg-sage-accent"
                aria-hidden
              />
              <p className="font-serif-sc font-normal text-sage-accent text-[clamp(0.65rem,1.5vw,0.8rem)] tracking-wide">
                by Tondreau Point
              </p>
            </div>
          </div>

          {/* Copy */}
          <h2 className="font-display font-medium text-sage-dark text-[clamp(1.5rem,3.5vw,2.1rem)] leading-tight mb-5">
            Let's talk about you and money.
          </h2>
          <p className="text-sage-text-body text-[1.02rem] leading-relaxed mb-2">
            Not your budget. Not your credit score. You — and the relationship
            you've built with money over your whole life.
          </p>
          <p className="text-sage-text-body text-[1.02rem] leading-relaxed mb-2">
            This takes about 7 minutes. There are no wrong answers — just honest
            ones. Everything you share stays between us.
          </p>
          <p className="text-sage-text-light text-[0.9rem] mb-10">
            <span className="text-sage-accent font-medium">7 minutes.</span> No wrong answers — just honest ones.
          </p>

          <Link
            to="/assessment"
            className="inline-flex items-center justify-center gap-2 w-full min-h-[48px] font-medium bg-sage-cta text-sage-bg hover:bg-sage-cta-hover shadow-elevated rounded-full px-10 py-4 text-[0.92rem] tracking-[0.04em] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sage-accent focus:ring-offset-2 group"
          >
            Let's get started
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 16 16"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <div className="pb-8 pt-4 space-y-2 text-center">
        <p className="font-display font-bold text-sage-dark text-sm tracking-[0.15em]">
          TACK <span className="font-light italic text-sage-accent tracking-normal">by Tondreau Point</span>
        </p>
        <Link
          to="/privacy"
          className="text-small text-sage-text-light hover:text-sage-cta transition-colors"
        >
          Your Privacy
        </Link>
      </div>
    </div>
  );
}
