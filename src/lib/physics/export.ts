import { PHYSICS_CONSTANTS } from './constants';

/**
 * Generate scientific data export
 */
export function generateDataExport(
  timestamp: number,
  parameters: Record<string, number>,
  metrics: Record<string, number>
): string {
  const data = {
    timestamp: new Date(timestamp).toISOString(),
    simulation_parameters: parameters,
    computed_metrics: metrics,
    physical_constants: {
      G: PHYSICS_CONSTANTS.G,
      c: PHYSICS_CONSTANTS.c,
      h: PHYSICS_CONSTANTS.h,
      k_B: PHYSICS_CONSTANTS.k_B
    },
    metadata: {
      version: '2.1.0',
      coordinate_system: 'Morris-Thorne',
      units: 'SI'
    }
  };
  
  return JSON.stringify(data, null, 2);
}