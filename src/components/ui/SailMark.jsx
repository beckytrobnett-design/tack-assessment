/**
 * TACK sail mark — Library Sage branding.
 * Uses official tack-mark.svg from public folder.
 */
export function SailMark({ size = 90, className = '' }) {
  const height = size * (102 / 90);
  return (
    <img
      src="/tack-mark.png"
      alt=""
      width={size}
      height={height}
      className={className}
      aria-hidden
    />
  );
}
