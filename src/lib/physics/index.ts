// Re-export all physics modules
export * from './constants';
export * from './metrics';
export * from './energy';
export * from './validation';
export * from './waves';
export * from './collapse';
export * from './export';

// Legacy WormholePhysics class for backward compatibility
import { PHYSICS_CONSTANTS, EXOTIC_MATTER } from './constants';
import { calculateMetric, calculateRicciScalar } from './metrics';
import { calculateEnergyRequirements, calculateTidalForces } from './energy';
import { validateParameters } from './validation';
import { simulateGravitationalWave } from './waves';
import { calculateCollapseRisk } from './collapse';
import { generateDataExport } from './export';

export class WormholePhysics {
  // Physical constants (SI units)
  static readonly G = PHYSICS_CONSTANTS.G;
  static readonly c = PHYSICS_CONSTANTS.c;
  static readonly h = PHYSICS_CONSTANTS.h;
  static readonly k_B = PHYSICS_CONSTANTS.k_B;
  
  // Exotic matter parameters
  static readonly EXOTIC_MATTER_DENSITY = EXOTIC_MATTER.DENSITY;
  static readonly CASIMIR_PRESSURE = EXOTIC_MATTER.CASIMIR_PRESSURE;
  
  static calculateMetric = calculateMetric;
  static calculateRicciScalar = calculateRicciScalar;
  static calculateEnergyRequirements = calculateEnergyRequirements;
  static calculateTidalForces = calculateTidalForces;
  static validateParameters = validateParameters;
  static simulateGravitationalWave = simulateGravitationalWave;
  static calculateCollapseRisk = calculateCollapseRisk;
  static generateDataExport = generateDataExport;
}