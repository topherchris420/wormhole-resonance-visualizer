import { PHYSICS_CONSTANTS } from './constants';

export interface GravitationalWaveResult {
  h_plus: number;
  h_cross: number;
  strain: number;
  luminosityDistance: number;
}

/**
 * Simulate gravitational wave propagation
 */
export function simulateGravitationalWave(
  time: number,
  frequency: number,
  amplitude: number,
  phase: number,
  distance: number
): GravitationalWaveResult {
  const omega = 2 * Math.PI * frequency;
  const retardedTime = time - distance / PHYSICS_CONSTANTS.c;
  
  // Plus and cross polarizations
  const h_plus = amplitude * Math.cos(omega * retardedTime + phase);
  const h_cross = amplitude * Math.sin(omega * retardedTime + phase);
  
  // Total strain
  const strain = Math.sqrt(h_plus * h_plus + h_cross * h_cross);
  
  // Luminosity distance effect
  const luminosityDistance = distance * (1 + 0.1); // Simplified cosmological redshift
  
  return {
    h_plus,
    h_cross,
    strain,
    luminosityDistance
  };
}