import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Gauge, 
  Zap, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Atom
} from 'lucide-react';

interface MetricsDashboardProps {
  stability: number;
  energy: number;
  collapseRisk: number;
  resonanceDepth: number;
  spacetimeCurvature: number;
  frequency: number;
  amplitude: number;
  drrActive: boolean;
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({
  stability,
  energy,
  collapseRisk,
  resonanceDepth,
  spacetimeCurvature,
  frequency,
  amplitude,
  drrActive
}) => {
  const metrics = useMemo(() => {
    // Calculate derived metrics
    const energyEfficiency = drrActive ? Math.min(100, stability * 1.2) : stability * 0.8;
    const harmonicStability = Math.max(0, 100 - (Math.abs(frequency - 1.5) * 20 + Math.abs(amplitude - 1) * 15));
    const systemHealth = (stability + energyEfficiency + harmonicStability) / 3;

    return {
      energyEfficiency,
      harmonicStability,
      systemHealth
    };
  }, [stability, frequency, amplitude, drrActive]);

  const getStatusColor = (value: number, inverted = false) => {
    if (inverted) {
      if (value < 30) return 'text-stability-good';
      if (value < 70) return 'text-yellow-500';
      return 'text-destructive';
    } else {
      if (value > 70) return 'text-stability-good';
      if (value > 40) return 'text-yellow-500';
      return 'text-destructive';
    }
  };

  const getProgressColor = (value: number, inverted = false) => {
    if (inverted) {
      if (value < 30) return 'bg-stability-good';
      if (value < 70) return 'bg-yellow-500';
      return 'bg-destructive';
    } else {
      if (value > 70) return 'bg-stability-good';
      if (value > 40) return 'bg-yellow-500';
      return 'bg-destructive';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {/* Primary Stability Metrics */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm text-foreground">
            <Gauge className="w-4 h-4 text-primary" />
            System Stability
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Wormhole Stability</span>
              <span className={`text-sm font-mono ${getStatusColor(stability)}`}>
                {stability.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={stability} 
              className={`h-2 ${getProgressColor(stability)}`}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Harmonic Stability</span>
              <span className={`text-sm font-mono ${getStatusColor(metrics.harmonicStability)}`}>
                {metrics.harmonicStability.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={metrics.harmonicStability} 
              className={`h-2 ${getProgressColor(metrics.harmonicStability)}`}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Collapse Risk</span>
              <span className={`text-sm font-mono ${getStatusColor(collapseRisk, true)}`}>
                {collapseRisk.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={collapseRisk} 
              className={`h-2 ${getProgressColor(collapseRisk, true)}`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Energy & Resonance */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm text-foreground">
            <Zap className="w-4 h-4 text-accent" />
            Energy Systems
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Energy Output</span>
              <span className={`text-sm font-mono ${getStatusColor(energy)}`}>
                {energy.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={energy} 
              className="h-2 bg-accent"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Energy Efficiency</span>
              <span className={`text-sm font-mono ${getStatusColor(metrics.energyEfficiency)}`}>
                {metrics.energyEfficiency.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={metrics.energyEfficiency} 
              className={`h-2 ${getProgressColor(metrics.energyEfficiency)}`}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">DRR Resonance</span>
              <span className={`text-sm font-mono ${drrActive ? 'text-resonance-active' : 'text-muted-foreground'}`}>
                {resonanceDepth.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={resonanceDepth} 
              className={`h-2 ${drrActive ? 'bg-resonance-active' : 'bg-muted'}`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Spacetime Metrics */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm text-foreground">
            <Atom className="w-4 h-4 text-spacetime-distortion" />
            Spacetime Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Curvature Index</span>
              <span className="text-sm font-mono text-spacetime-distortion">
                {spacetimeCurvature.toFixed(3)}
              </span>
            </div>
            <Progress 
              value={spacetimeCurvature * 20} 
              className="h-2 bg-spacetime-distortion"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">System Health</span>
              <span className={`text-sm font-mono ${getStatusColor(metrics.systemHealth)}`}>
                {metrics.systemHealth.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={metrics.systemHealth} 
              className={`h-2 ${getProgressColor(metrics.systemHealth)}`}
            />
          </div>

          {/* Status Indicators */}
          <div className="flex gap-2 pt-2">
            <Badge 
              variant={stability > 70 ? "default" : "destructive"}
              className={`text-xs ${stability > 70 ? 'bg-stability-good' : ''}`}
            >
              {stability > 70 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {stability > 70 ? 'STABLE' : 'UNSTABLE'}
            </Badge>
            
            {drrActive && (
              <Badge className="text-xs bg-resonance-active">
                <Activity className="w-3 h-3 mr-1" />
                DRR
              </Badge>
            )}
            
            {collapseRisk > 80 && (
              <Badge variant="destructive" className="text-xs">
                <AlertTriangle className="w-3 h-3 mr-1" />
                CRITICAL
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};