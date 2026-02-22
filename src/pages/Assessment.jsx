import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { ProgressBar } from '../components/ui/ProgressBar';
import { QuestionCard } from '../components/assessment/QuestionCard';
import { SailMark } from '../components/ui/SailMark';
import { questions, PARTS } from '../data/questions';

const ADVANCE_DELAY_MS = 300;

export function Assessment() {
  const navigate = useNavigate();
  const { responses, setResponse, recordRoute } = useAssessment();

  useEffect(() => {
    recordRoute('/assessment');
  }, [recordRoute]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pendingAdvance, setPendingAdvance] = useState(null);

  const question = questions[currentIndex];
  const selectedAnswer = responses[currentIndex];
  const part = PARTS.find((p) => p.id === question?.part);

  // Auto-advance only when user just selected an answer (not when navigating back)
  useEffect(() => {
    if (!selectedAnswer || !pendingAdvance) return;

    const timer = setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        navigate('/results/email');
      }
      setPendingAdvance(null);
    }, ADVANCE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [selectedAnswer, currentIndex, navigate, pendingAdvance]);

  const handleSelect = (letter) => {
    setResponse(currentIndex, letter);
    setPendingAdvance(letter);
  };

  const handleBack = () => {
    setPendingAdvance(null); // Prevent auto-advance from firing when going back
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    } else {
      navigate('/');
    }
  };

  if (!question) return null;

  return (
    <div className="min-h-screen bg-sage-bg px-4 py-2 md:py-3">
      <div className="max-w-[680px] mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-1">
          <Link to="/" className="flex items-center gap-2">
            <SailMark size={36} />
            <span className="font-display font-bold text-sage-dark text-lg tracking-wide">
              TACK <span className="tack-byline">by Tondreau Point</span>
            </span>
          </Link>
        </div>
        {/* Progress bar — shows which question we're on, not completed count (avoids full bar from cached responses) */}
        <ProgressBar
          current={currentIndex + 1}
          total={24}
          partLabel={part?.label ?? ''}
          questionLabel={`Question ${currentIndex + 1} of 24`}
        />

        {/* Back link */}
        <button
          type="button"
          onClick={handleBack}
          className="text-small text-sage-cta hover:text-sage-dark mb-1 transition-colors focus:outline-none focus:underline"
        >
          ← Back
        </button>

        {/* Question card with animation */}
        <div
          key={currentIndex}
          className="animate-fadeIn"
          style={{
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <QuestionCard
            questionIndex={currentIndex}
            selectedAnswer={selectedAnswer}
            onSelect={handleSelect}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
