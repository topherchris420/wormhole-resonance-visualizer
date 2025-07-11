// Physical constants (SI units)
export const PHYSICS_CONSTANTS = {
  G: 6.67430e-11,           // Gravitational constant
  c: 299792458,             // Speed of light
  h: 6.62607015e-34,        // Planck constant
  k_B: 1.380649e-23,        // Boltzmann constant
} as const;

// Exotic matter parameters
export const EXOTIC_MATTER = {
  DENSITY: -1.5e15,         // kg/m³ (negative energy density)
  CASIMIR_PRESSURE: -1.01e-7, // Pa (Casimir effect pressure)
} as const;