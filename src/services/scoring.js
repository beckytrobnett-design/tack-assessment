/**
 * Scoring engine — isolated service, no UI dependencies.
 * Calculates primary/secondary orientation from 26 responses.
 * Q1 (index 0) is unscored — used for ttmStage. Q2-Q26 (indices 1-25) are scored.
 */

const ORIENTATION_MAP = {
  A: 'survivor',
  B: 'provider',
  C: 'striver',
  D: 'vigilante',
  E: 'avoider',
  F: 'builder',
};

const TTM_STAGE_MAP = {
  A: 'action',
  B: 'contemplation',
  C: 'maintenance',
  D: 'precontemplation',
  E: 'preparation',
  F: 'builder',
};

const SCORED_COUNT = 25;

/**
 * @param {string[]} responses - Array of 26 answers, each 'A' through 'F'
 * @returns {Object} Scoring result with primary, secondary, distribution, ttmStage
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

  // Extract ttmStage from Q1 (index 0) — unscored
  const ttmStage = TTM_STAGE_MAP[responses[0]] ?? null;

  // Score only indices 1-25 (Q2-Q26)
  for (let i = 1; i < responses.length; i++) {
    const orientation = ORIENTATION_MAP[responses[i]];
    if (orientation) tally[orientation]++;
  }

  const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0];
  const secondary = sorted[1];

  const isBlend =
    primary[1] - secondary[1] <= 2 && secondary[1] >= 3;

  return {
    primary: {
      orientation: primary[0],
      count: primary[1],
      percentage: Math.round((primary[1] / SCORED_COUNT) * 100),
    },
    secondary: isBlend
      ? {
          orientation: secondary[0],
          count: secondary[1],
          percentage: Math.round((secondary[1] / SCORED_COUNT) * 100),
        }
      : null,
    isBlend,
    fullTally: tally,
    distribution: sorted.map(([orientation, count]) => ({
      orientation,
      count,
      percentage: Math.round((count / SCORED_COUNT) * 100),
    })),
    ttmStage,
  };
}
