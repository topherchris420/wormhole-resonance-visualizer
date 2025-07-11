import { PHYSICS_CONSTANTS, EXOTIC_MATTER } from './constants';

export interface EnergyRequirements {
  totalEnergy: number; // Joules
  powerConsumption: number; // Watts
  exoticMatterMass: number; // kg
  casimirContribution: number; // Joules
}

/**
 * Calculate energy requirements using Einstein field equations
 * T_μν = (c⁴/8πG) G_μν
 */
export function calculateEnergyRequirements(
  throatRadius: number, 
  stabilityFactor: number,
  gravitationalWaveAmplitude: number
): EnergyRequirements {
  const volume = (4/3) * Math.PI * Math.pow(throatRadius, 3);
  const surfaceArea = 4 * Math.PI * throatRadius * throatRadius;
  
  // Exotic matter energy (negative)
  const exoticMatterMass = Math.abs(EXOTIC_MATTER.DENSITY * volume);
  const exoticEnergy = exoticMatterMass * PHYSICS_CONSTANTS.c * PHYSICS_CONSTANTS.c;
  
  // Casimir effect contribution
  const casimirEnergy = Math.abs(EXOTIC_MATTER.CASIMIR_PRESSURE * surfaceArea * throatRadius);
  
  // Gravitational wave energy
  const gwEnergy = 0.5 * gravitationalWaveAmplitude * gravitationalWaveAmplitude * volume * 1e12;
  
  // Stabilization energy (proportional to instability)
  const stabilizationEnergy = (1 - stabilityFactor) * exoticEnergy * 0.1;
  
  const totalEnergy = exoticEnergy + casimirEnergy + gwEnergy + stabilizationEnergy;
  const powerConsumption = totalEnergy / 1000; // Assuming 1000s operation time
  
  return {
    totalEnergy,
    powerConsumption,
    exoticMatterMass,
    casimirContribution: casimirEnergy
  };
}

/**
 * Calculate tidal forces at throat
 * F_tidal = GMm(2r)/R³
 */
export function calculateTidalForces(radius: number, mass: number, objectMass: number = 70): number {
  const tidalForce = (PHYSICS_CONSTANTS.G * mass * objectMass * 2 * radius) / Math.pow(radius, 3);
  return Math.abs(tidalForce); // Newtons
}