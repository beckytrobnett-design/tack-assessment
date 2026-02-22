import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { calculateOrientation } from '../services/scoring';
import { orientations } from '../data/orientations';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SailMark } from '../components/ui/SailMark';

export function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const { results, responses, email, completeAssessment, recordRoute } = useAssessment();
  const [waitlistStatus, setWaitlistStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  useEffect(() => {
    recordRoute('/results');
  }, [recordRoute]);

  useEffect(() => {
    if (!results && responses.length === 24) {
      completeAssessment();
    }
  }, [results, responses.length, completeAssessment]);

  // Prefer fresh results from navigation state (just submitted), then context, then recalculate
  const scoringResult =
    location.state?.scoringResult ||
    results ||
    (responses.length === 24 ? calculateOrientation(responses) : null);

  useEffect(() => {
    if (!scoringResult && responses.length < 24) {
      navigate('/');
    }
  }, [scoringResult, responses.length, navigate]);

  if (!scoringResult) {
    return null;
  }

  const primary = orientations[scoringResult.primary.orientation];
  const secondary = scoringResult.secondary
    ? orientations[scoringResult.secondary.orientation]
    : null;

  return (
    <div className="min-h-screen bg-sage-bg">
      <div className="max-w-[680px] mx-auto px-4 py-5 md:py-8 space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <Link to="/" className="flex flex-col items-center gap-2">
            <SailMark size={56} />
            <span className="font-display font-bold text-sage-dark text-lg tracking-wide">
              TACK <span className="font-light italic text-sage-accent">by Tondreau Point</span>
            </span>
          </Link>
        </div>
        {/* Section 1: Your Orientation (hero) */}
        <section>
          <div
            className="rounded-lg p-6 md:p-8 mb-6"
            style={{
              backgroundColor: `${primary.color}15`,
              borderLeft: `4px solid ${primary.color}`,
            }}
          >
            <h1
              className="text-h1 font-bold mb-2"
              style={{ color: primary.color }}
            >
              {primary.name}
            </h1>
            <p className="text-body text-sage-dark font-medium">
              {primary.narrativeSubtitle || primary.tagline}
            </p>
            {scoringResult.isBlend && secondary && (
              <p className="text-body text-sage-text-light mt-4">
                You're primarily {primary.name} with elements of {secondary.name}
              </p>
            )}
          </div>
        </section>

        {/* Section 2: What This Means */}
        <section>
          <h2 className="font-display text-h2 font-medium text-sage-dark mb-4">
            Your Money Narrative (What This Means)
          </h2>
          {(primary.whatThisMeans || '').split('\n\n').map((para, i) => (
            <p key={i} className="text-body text-sage-text-body leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </section>

        {/* Section 2b: What This Looks Like in Real Life */}
        {primary.realLifeScenarios && primary.realLifeScenarios.length > 0 && (
          <section>
            <h2 className="font-display text-h2 font-medium text-sage-dark mb-4">
              What This Looks Like in Real Life
            </h2>
            <ul className="space-y-3">
              {primary.realLifeScenarios.map((scenario, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="text-sage-accent font-medium mt-1">→</span>
                  <span className="text-body text-sage-dark">{scenario}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Section 3: Your Strengths */}
        <section>
          <h2 className="font-display text-h2 font-medium text-sage-dark mb-4">
            Your Strengths
          </h2>
          <ul className="space-y-3">
            {primary.strengths.map((strength, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sage-accent flex items-center justify-center mt-0.5">
                  <svg
                    className="w-4 h-4 text-sage-bg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-body text-sage-dark">{strength}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 4: Where You Can Grow */}
        <section>
          <h2 className="font-display text-h2 font-medium text-sage-dark mb-4">
            Where You Can Grow
          </h2>
          {primary.growthProse ? (
            <p className="text-body text-sage-dark leading-relaxed">
              {primary.growthProse}
            </p>
          ) : (
            <ul className="space-y-3">
              {primary.growthAreas.map((area, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-sage-accent flex items-center justify-center mt-0.5 text-small font-medium text-sage-dark">
                    {i + 1}
                  </span>
                  <span className="text-body text-sage-dark">{area}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Section 4b: You Might Also See Yourself In */}
        {primary.blendCallout && (
          <section>
            <Card padding="lg" className="bg-sage-bg border-l-4 border-sage-accent">
              <h2 className="text-h3 font-medium text-sage-dark mb-3">
                You Might Also See Yourself In...
              </h2>
              <p className="text-body text-sage-dark leading-relaxed mb-2">
                {primary.blendCallout.text}
              </p>
              <p className="text-small text-sage-text-light">
                → Related orientations: {primary.blendCallout.orientations.join(' and ')}
              </p>
            </Card>
          </section>
        )}

        {/* Section 5: A Note From Penny */}
        <section>
          <Card
            padding="lg"
            className="border-l-4"
            style={{ borderLeftColor: primary.color, backgroundColor: `${primary.color}08` }}
          >
            <h2 className="text-h3 font-medium text-sage-dark mb-4">
              A Note From Penny
            </h2>
            <p className="text-body text-sage-dark leading-relaxed italic">
              {primary.pennyMessage}
            </p>
          </Card>
        </section>

        {/* Section 6: Your Next Steps */}
        <section>
          <h2 className="font-display text-h2 font-medium text-sage-dark mb-4">
            Your Next Steps
          </h2>
          <div className="space-y-4">
            {(primary.nextStepsWithRationale || (primary.nextSteps || []).map(s => ({ step: s, rationale: null }))).map((item, i) => (
              <Card key={i} padding="md" className="border-l-4 border-sage-accent">
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sage-accent text-sage-bg font-bold flex items-center justify-center text-body">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-body text-sage-dark font-medium">{item.step}</p>
                    {item.rationale && (
                      <p className="text-small text-sage-text-light italic mt-2">{item.rationale}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 7: Full Orientation Snapshot */}
        <section>
          <h2 className="font-display text-h2 font-medium text-sage-dark mb-4">
            Your Full Orientation Snapshot
          </h2>
          <Card padding="lg">
            <div className="space-y-3">
              {scoringResult.distribution.map(({ orientation, percentage }) => {
                const orient = orientations[orientation];
                return (
                  <div key={orientation} className="space-y-1">
                    <div className="flex justify-between text-small">
                      <span className="text-sage-dark font-medium">
                        {orient.name}
                      </span>
                      <span className="text-sage-text-light">{percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: orient.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </section>

        {/* Section 8: What's Next with TACK */}
        <section>
          <Card padding="lg" className="text-center space-y-4">
            <h2 className="text-h3 font-medium text-sage-dark">
              What's Next with TACK
            </h2>
            <p className="text-body text-sage-dark leading-relaxed">
              This is just the beginning. TACK is building something for people
              like you — a community, a guide, and a path forward. Want to be
              part of it?
            </p>
            {waitlistStatus === 'success' ? (
              <p className="text-body text-sage-dark leading-relaxed italic py-2">
                You're in! I'll be in touch when TACK launches. In the meantime,
                sit with what you've discovered today — you've already taken the
                most important step.
              </p>
            ) : (
              <Button
                variant="primary"
                size="lg"
                disabled={!email || waitlistStatus === 'loading'}
                onClick={async () => {
                  if (!email) return;
                  setWaitlistStatus('loading');
                  try {
                    const res = await fetch('/api/join-waitlist', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email }),
                    });
                    const data = await res.json().catch(() => ({}));
                    if (res.ok) {
                      setWaitlistStatus('success');
                    } else {
                      setWaitlistStatus('error');
                    }
                  } catch {
                    setWaitlistStatus('error');
                  }
                }}
              >
                {waitlistStatus === 'loading' ? 'Joining...' : 'Join the waitlist'}
              </Button>
            )}
            {waitlistStatus === 'error' && (
              <p className="text-small text-error">
                Something went wrong. Please try again later.
              </p>
            )}
            <p className="text-small text-sage-text-light">
              Your PDF report is on its way to your inbox.
            </p>
          </Card>
        </section>

        {/* Footer */}
        <footer className="text-center pt-8 space-y-2">
          <p className="text-body font-medium font-serif">
            <span className="text-sage-dark">TACK</span>
            <span className="text-sage-accent"> by Tondreau Point</span>
          </p>
          <p className="text-small text-sage-text-light">
            Your results are private.{' '}
            <Link to="/privacy" className="text-sage-accent hover:text-sage-dark transition-colors underline">
              Learn more about how we protect your information.
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
