import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SailMark } from '../components/ui/SailMark';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailCapture() {
  const navigate = useNavigate();
  const { responses, email, setEmail, completeAssessment, recordRoute } =
    useAssessment();

  useEffect(() => {
    recordRoute('/results/email');
  }, [recordRoute]);

  const [nameValue, setNameValue] = useState('');
  const [inputValue, setInputValue] = useState(email);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (responses.length < 24) {
      navigate('/assessment');
    }
  }, [responses.length, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedName = nameValue.trim();
    const trimmedEmail = inputValue.trim();

    if (!trimmedName) {
      setError("What should we call you?");
      return;
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError("That doesn't look quite right — double-check your email?");
      return;
    }

    setIsSubmitting(true);
    setEmail(trimmedEmail);

    // Recalculate from current responses — never use cached results
    const scoringResult = completeAssessment();

    let pdfBase64 = null;
    try {
      const { generateOrientationReportBase64 } = await import('../services/pdfGenerator');
      pdfBase64 = await generateOrientationReportBase64(scoringResult, trimmedName);
    } catch (err) {
      console.error('PDF generation error:', err);
      setError("We couldn't generate your report. Please try again.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          primary_orientation: scoringResult.primary?.orientation,
          orientation_scores: scoringResult,
          score_details: { responses },
          pdfBase64,
          results: scoringResult,
          timestamp: new Date().toISOString(),
        }),
      });

      const text = await res.text();
      const data = text ? (() => { try { return JSON.parse(text); } catch { return {}; } })() : {};

      if (!res.ok) {
        const msg = data.error || (res.status >= 500 ? 'Server error. Check Vercel logs.' : 'Something went wrong. Please try again.');
        setError(msg);
        setIsSubmitting(false);
        return;
      }

      // Only reveal results after successful API response
      navigate('/results', { state: { scoringResult } });
    } catch (err) {
      console.error('Send report error:', err);
      setError(err.message || 'Network error. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-sage-bg flex flex-col items-center justify-center px-6 py-6 md:py-8">
      <div className="max-w-[680px] w-full">
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex flex-col items-center gap-3">
            <SailMark size={72} />
            <span className="font-display font-bold text-sage-dark text-xl tracking-wide">
              TACK <span className="tack-byline">by Tondreau Point</span>
            </span>
          </Link>
        </div>
        <Card padding="lg" className="space-y-6">
          <h2 className="font-display text-h2 font-medium text-sage-dark">
            Your results are ready.
          </h2>
          <p className="text-body text-sage-text-body leading-relaxed">
            Penny put together a detailed orientation report just for you —
            including what your results mean, your financial strengths, and
            where to go from here. Where should we send it?
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-body font-medium text-sage-dark mb-2">
                Your name
              </label>
              <input
                id="name"
                type="text"
                value={nameValue}
                onChange={(e) => {
                  setNameValue(e.target.value);
                  setError('');
                }}
                placeholder="your name"
                autoComplete="name"
                className="w-full px-4 py-4 text-body rounded-lg border-2 border-sage-accent-muted focus:border-sage-accent focus:ring-2 focus:ring-sage-accent focus:ring-offset-2 outline-none transition-colors min-h-tap bg-sage-bg-card"
                aria-invalid={!!error}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-body font-medium text-sage-dark mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setError('');
                }}
                placeholder="your email address"
                autoComplete="email"
                className="w-full px-4 py-4 text-body rounded-lg border-2 border-sage-accent-muted focus:border-sage-accent focus:ring-2 focus:ring-sage-accent focus:ring-offset-2 outline-none transition-colors min-h-tap bg-sage-bg-card"
                aria-invalid={!!error}
                aria-describedby={error ? 'form-error' : undefined}
              />
              {error && (
                <p id="form-error" className="mt-2 text-small text-error">
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send my report and show my results'}
            </Button>
          </form>

          <p className="text-small text-sage-text-light">
            We'll send your orientation report as a PDF. No spam, no selling
            your info. Just your results.
          </p>
        </Card>
      </div>
    </div>
  );
}
