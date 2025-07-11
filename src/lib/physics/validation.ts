import { PHYSICS_CONSTANTS } from './constants';

export interface ValidationResult {
  isValid: boolean;
  warnings: string[];
  constraints: Record<string, { min: number; max: number; current: number; unit: string }>;
}

/**
 * Validate parameters against known physics constraints
 */
export function validateParameters(frequency: number, amplitude: number, throatRadius: number): ValidationResult {
  const warnings: string[] = [];
  let isValid = true;
  
  // Frequency constraints (based on LIGO sensitivity)
  if (frequency < 10e-3 || frequency > 1000) {
    warnings.push('Frequency outside detectable range (10mHz - 1kHz)');
    isValid = false;
  }
  
  // Amplitude constraints (strain amplitude)
  if (amplitude > 1e-18) {
    warnings.push('Amplitude exceeds LIGO sensitivity threshold');
  }
  
  // Throat radius constraints (minimum for traversability)
  const schwarzschildRadius = 2 * PHYSICS_CONSTANTS.G * 1e30 / (PHYSICS_CONSTANTS.c * PHYSICS_CONSTANTS.c); // Solar mass
  if (throatRadius < schwarzschildRadius) {
    warnings.push('Throat radius below Schwarzschild limit');
    isValid = false;
  }
  
  return {
    isValid,
    warnings,
    constraints: {
      frequency: { min: 10e-3, max: 1000, current: frequency, unit: 'Hz' },
      amplitude: { min: 0, max: 1e-18, current: amplitude, unit: 'strain' },
      throatRadius: { min: schwarzschildRadius, max: 1e6, current: throatRadius, unit: 'm' }
    }
  };
}