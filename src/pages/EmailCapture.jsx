import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailCapture() {
  const navigate = useNavigate();
  const { responses, results, email, setEmail, completeAssessment, recordRoute } =
    useAssessment();

  useEffect(() => {
    recordRoute('/results/email');
  }, [recordRoute]);
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

    if (!EMAIL_REGEX.test(inputValue.trim())) {
      setError("That doesn't look quite right — double-check your email?");
      return;
    }

    setIsSubmitting(true);
    setEmail(inputValue.trim());

    // Always recalculate from current responses — never use cached results
    const scoringResult = completeAssessment();

    let pdfBase64 = null;
    try {
      const { generateOrientationReportBase64 } = await import('../services/pdfGenerator');
      pdfBase64 = await generateOrientationReportBase64(scoringResult);
    } catch (err) {
      console.error('PDF generation error:', err);
    }

    try {
      const res = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: inputValue.trim(),
          responses,
          results: scoringResult,
          pdfBase64,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        console.error('Email send failed:', await res.text());
      }
    } catch (err) {
      console.error('Email send error:', err);
    } finally {
      setIsSubmitting(false);
      navigate('/results', { state: { scoringResult } });
    }
  };

  return (
    <div className="min-h-screen bg-warmCream flex flex-col items-center justify-center px-6 py-6 md:py-8">
      <div className="max-w-[680px] w-full">
        <div className="flex justify-center mb-3">
          <img
            src="/logo-horizontal.png"
            alt="TACK by Tondreau Point"
            className="h-[140px] md:h-[180px] w-auto max-w-[520px] object-contain"
          />
        </div>
        <Card padding="lg" className="space-y-6">
          <h2 className="text-h2 font-medium text-deepNavy">
            Your results are ready.
          </h2>
          <p className="text-body text-deepNavy leading-relaxed">
            Penny put together a detailed orientation report just for you —
            including what your results mean, your financial strengths, and
            where to go from here. Where should we send it?
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
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
                className="w-full px-4 py-4 text-body rounded-lg border-2 border-gray-200 focus:border-bronze focus:ring-2 focus:ring-bronze focus:ring-offset-2 outline-none transition-colors min-h-tap"
                aria-invalid={!!error}
                aria-describedby={error ? 'email-error' : undefined}
              />
              {error && (
                <p id="email-error" className="mt-2 text-small text-error">
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

          <p className="text-small text-slateGray">
            We'll send your orientation report as a PDF. No spam, no selling
            your info. Just your results.
          </p>
        </Card>
      </div>
    </div>
  );
}
