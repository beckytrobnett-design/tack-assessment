/**
 * Scoring engine — isolated service, no UI dependencies.
 * Calculates primary/secondary orientation from 24 responses.
 */

const ORIENTATION_MAP = {
  A: 'survivor',
  B: 'provider',
  C: 'striver',
  D: 'vigilante',
  E: 'avoider',
  F: 'builder',
};

/**
 * @param {string[]} responses - Array of 24 answers, each 'A' through 'F'
 * @returns {Object} Scoring result with primary, secondary, distribution
 */
export function calculateOrientation(responses) {
  const tally = {
    survivor: 0,
    provider: 0,
    striver: 0,
    vigilante: 0,
    avoider: 0,
    builder: 0,
  };

  responses.forEach((answer) => {
    const orientation = ORIENTATION_MAP[answer];
    if (orientation) tally[orientation]++;
  });

  const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0];
  const secondary = sorted[1];

  const isBlend =
    primary[1] - secondary[1] <= 2 && secondary[1] >= 3;

  return {
    primary: {
      orientation: primary[0],
      count: primary[1],
      percentage: Math.round((primary[1] / 24) * 100),
    },
    secondary: isBlend
      ? {
          orientation: secondary[0],
          count: secondary[1],
          percentage: Math.round((secondary[1] / 24) * 100),
        }
      : null,
    isBlend,
    fullTally: tally,
    distribution: sorted.map(([orientation, count]) => ({
      orientation,
      count,
      percentage: Math.round((count / 24) * 100),
    })),
  };
}
