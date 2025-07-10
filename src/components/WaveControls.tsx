import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Waves, RotateCcw, AlertTriangle } from 'lucide-react';

interface WaveControlsProps {
  frequency: number;
  amplitude: number;
  phase: number;
  onFrequencyChange: (value: number) => void;
  onAmplitudeChange: (value: number) => void;
  onPhaseChange: (value: number) => void;
  onReset: () => void;
  isStable: boolean;
  drrActive: boolean;
  onDrrToggle: () => void;
}

export const WaveControls: React.FC<WaveControlsProps> = ({
  frequency,
  amplitude,
  phase,
  onFrequencyChange,
  onAmplitudeChange,
  onPhaseChange,
  onReset,
  isStable,
  drrActive,
  onDrrToggle
}) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Waves className="w-5 h-5 text-gravitational-wave" />
            Gravitational Wave Controls
          </CardTitle>
          <Badge 
            variant={isStable ? "default" : "destructive"}
            className={isStable ? "bg-stability-good" : ""}
          >
            {isStable ? "STABLE" : "CRITICAL"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Frequency Control */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              Frequency (Hz)
            </label>
            <span className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
              {frequency.toFixed(2)}
            </span>
          </div>
          <Slider
            value={[frequency]}
            onValueChange={(value) => onFrequencyChange(value[0])}
            max={5}
            min={0.1}
            step={0.1}
            className="[&_[role=slider]]:bg-gravitational-wave [&_[role=slider]]:border-gravitational-wave"
          />
          <div className="text-xs text-muted-foreground">
            Controls the oscillation rate of gravitational waves
          </div>
        </div>

        {/* Amplitude Control */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              Amplitude
            </label>
            <span className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
              {amplitude.toFixed(2)}
            </span>
          </div>
          <Slider
            value={[amplitude]}
            onValueChange={(value) => onAmplitudeChange(value[0])}
            max={2}
            min={0}
            step={0.1}
            className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
          />
          <div className="text-xs text-muted-foreground">
            Wave intensity affecting spacetime curvature
          </div>
        </div>

        {/* Phase Control */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              Phase Shift (rad)
            </label>
            <span className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
              {phase.toFixed(2)}
            </span>
          </div>
          <Slider
            value={[phase]}
            onValueChange={(value) => onPhaseChange(value[0])}
            max={6.28}
            min={0}
            step={0.1}
            className="[&_[role=slider]]:bg-spacetime-distortion [&_[role=slider]]:border-spacetime-distortion"
          />
          <div className="text-xs text-muted-foreground">
            Phase offset for wave synchronization
          </div>
        </div>

        {/* Control Actions */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button
            onClick={onDrrToggle}
            variant={drrActive ? "default" : "outline"}
            className={`flex-1 ${drrActive ? 'bg-resonance-active hover:bg-resonance-active/80' : ''}`}
          >
            <Zap className="w-4 h-4 mr-2" />
            DRR {drrActive ? 'ON' : 'OFF'}
          </Button>
          
          <Button
            onClick={onReset}
            variant="outline"
            className="border-muted-foreground/30"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Warning Alert */}
        {!isStable && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <div className="text-sm text-destructive">
              Warning: Wormhole instability detected. Adjust parameters to stabilize.
            </div>
          </div>
        )}

        {/* DRR Status */}
        {drrActive && (
          <div className="p-3 bg-resonance-active/10 border border-resonance-active/20 rounded-lg">
            <div className="text-sm text-resonance-active font-medium mb-2">
              Dynamic Resonance Rooting Active
            </div>
            <div className="text-xs text-muted-foreground">
              Automatic stabilization system engaged. Wave parameters will be adjusted to maintain optimal throat geometry.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};