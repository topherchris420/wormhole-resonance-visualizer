export interface CollapseRisk {
  probability: number;
  timeToCollapse: number; // seconds
  criticalAmplitude: number;
}

/**
 * Calculate collapse probability using perturbation theory
 */
export function calculateCollapseRisk(
  stabilityFactor: number,
  energyDensity: number,
  perturbationAmplitude: number
): CollapseRisk {
  // Linear perturbation analysis
  const criticalAmplitude = 0.1 * stabilityFactor;
  const perturbationGrowth = perturbationAmplitude / criticalAmplitude;
  
  // Exponential instability growth
  const growthRate = Math.max(0, perturbationGrowth - 1);
  const probability = Math.min(1, growthRate * growthRate);
  
  // Time to collapse (if unstable)
  const timeToCollapse = probability > 0 ? 1 / (growthRate + 1e-6) : Infinity;
  
  return {
    probability,
    timeToCollapse,
    criticalAmplitude
  };
}