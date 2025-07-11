import { PHYSICS_CONSTANTS } from './constants';

/**
 * Morris-Thorne wormhole metric calculations
 * ds² = -c²dt² + dr²/(1-b(r)/r) + r²(dθ² + sin²θdφ²)
 */
export interface SpacetimeMetric {
  g_tt: number;
  g_rr: number;
  g_theta: number;
  g_phi: number;
}

export function calculateMetric(radius: number, throatRadius: number): SpacetimeMetric {
  const b_r = throatRadius; // Shape function b(r) = r₀
  const factor = radius <= throatRadius ? 1 : (1 - b_r / radius);
  
  return {
    g_tt: -(PHYSICS_CONSTANTS.c * PHYSICS_CONSTANTS.c), // Time component
    g_rr: 1 / Math.max(factor, 0.001), // Radial component (avoid singularity)
    g_theta: radius * radius, // Angular theta component
    g_phi: radius * radius // Angular phi component (with sin²θ factor)
  };
}

/**
 * Calculate spacetime curvature using Ricci scalar
 * R = g^μν R_μν
 */
export function calculateRicciScalar(radius: number, throatRadius: number, energyDensity: number): number {
  if (radius <= throatRadius) return 0;
  
  // Simplified Ricci scalar for Morris-Thorne geometry
  const b_prime = -1 / (radius * radius); // db/dr approximation
  const rho = energyDensity / (PHYSICS_CONSTANTS.c * PHYSICS_CONSTANTS.c); // Energy density in geometric units
  
  return 8 * Math.PI * PHYSICS_CONSTANTS.G * rho / 
    (PHYSICS_CONSTANTS.c * PHYSICS_CONSTANTS.c * PHYSICS_CONSTANTS.c * PHYSICS_CONSTANTS.c);
}