import { Card } from '../ui/Card';
import { questions, PARTS } from '../../data/questions';

export function QuestionCard({ questionIndex, selectedAnswer, onSelect }) {
  const question = questions[questionIndex];
  if (!question) return null;

  const part = PARTS.find((p) => p.id === question.part);
  const partLabel = part ? part.label : '';

  const handleSelect = (letter) => {
    onSelect(letter);
  };

  return (
    <div className="space-y-2">
      <p className="text-small text-sage-accent font-medium">{partLabel}</p>
      <Card padding="md" className="transition-all duration-300">
        <h2
          className="text-sage-dark font-medium mb-3 text-[1.25rem] leading-relaxed"
          style={{ fontSize: '1.25rem' }}
        >
          {question.text}
        </h2>
        <div className="space-y-2">
          {question.options.map((opt) => {
            const isSelected = selectedAnswer === opt.letter;
            return (
              <button
                key={opt.letter}
                type="button"
                onClick={() => handleSelect(opt.letter)}
                className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all duration-200 min-h-tap focus:outline-none focus:ring-2 focus:ring-sage-accent focus:ring-offset-2 ${
                  isSelected
                    ? 'border-sage-accent bg-sage-accent-muted'
                    : 'border-sage-accent-muted bg-sage-bg-card hover:border-sage-accent/50 hover:shadow-elevated'
                }`}
                aria-pressed={isSelected}
                aria-label={`Option ${opt.letter}: ${opt.text}`}
              >
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-small font-bold ${
                    isSelected
                      ? 'bg-sage-accent text-sage-bg'
                      : 'bg-sage-bg-deep text-sage-text-light'
                  }`}
                >
                  {opt.letter}
                </span>
                <span className="text-body text-sage-dark flex-1">{opt.text}</span>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
