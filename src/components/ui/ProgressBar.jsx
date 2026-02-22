export function ProgressBar({ current, total, partLabel, questionLabel }) {
  const percentage = total > 0 ? Math.min(100, (current / total) * 100) : 0;

  return (
    <div className="w-full mb-2">
      <div className="flex justify-between items-center mb-0.5">
        <span className="text-small text-sage-cta font-medium">
          {partLabel}
        </span>
        <span className="text-small text-sage-cta font-medium">
          {questionLabel}
        </span>
      </div>
      <div
        className="h-2 w-full bg-sage-dark/10 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Question ${current} of ${total}`}
      >
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: '#6B8F6E',
            minWidth: percentage > 0 ? 4 : 0,
          }}
        />
      </div>
    </div>
  );
}
