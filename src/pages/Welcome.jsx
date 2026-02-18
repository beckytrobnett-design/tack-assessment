import { Link } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { Button } from '../components/ui/Button';

export function Welcome() {
  const { results } = useAssessment();
  const hasResults = !!results;

  return (
    <div className="min-h-screen bg-warmCream flex flex-col items-center justify-start px-6 pt-6 pb-8 md:pt-8 md:pb-12">
      <div className="max-w-[680px] w-full text-center space-y-8">
        {/* Logo / Wordmark */}
        <div className="flex flex-col items-center w-full">
          <img
            src="/logo-horizontal.png"
            alt="TACK by Tondreau Point"
            className="w-full max-w-[520px] h-[200px] md:h-[260px] object-contain object-center"
          />
        </div>

        {/* Main content */}
        <div className="space-y-4">
          <h2 className="text-h2 font-medium text-deepNavy leading-tight">
            Let's talk about you and money.
          </h2>
          <p className="text-body text-deepNavy leading-relaxed">
            Not your budget. Not your credit score. You — and the relationship
            you've built with money over your whole life.
          </p>
          <p className="text-body text-deepNavy leading-relaxed">
            This takes about 7 minutes. There are no wrong answers — just honest
            ones. Everything you share stays between us.
          </p>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <Link to="/assessment">
            <Button fullWidth size="lg">
              {hasResults ? 'Take the assessment again' : "Let's get started"}
            </Button>
          </Link>
          {hasResults && (
            <Link
              to="/results"
              className="block w-full px-8 py-4 text-body font-medium rounded-lg border-2 border-deepNavy text-deepNavy bg-transparent hover:bg-deepNavy hover:text-warmCream text-center min-h-[48px] flex items-center justify-center"
            >
              View my previous results
            </Link>
          )}
        </div>

        {/* Footer */}
        <p className="text-body pt-4 font-serif tracking-wide">
          <span className="font-semibold text-deepNavy">TACK</span>
          <span className="text-bronze"> by Tondreau Point</span>
        </p>
      </div>
    </div>
  );
}
