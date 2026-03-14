/**
 * TACK sail mark — renders the isolated sail for nav and decorative use.
 * Used across all pages as a lightweight brand element.
 */
export function SailMark({ size = 90, className = '' }) {
  return (
    <img
      src="https://tack.tondreaupoint.com/logos/logo-sail-mark-light.png"
      alt=""
      width={size}
      height={size}
      className={className}
      aria-hidden
    />
  );
}
