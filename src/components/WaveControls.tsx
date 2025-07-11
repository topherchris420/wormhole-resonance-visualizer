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
    <Card className="bg-card border-border shadow-sm rounded-2xl">
      <CardHeader className="pb-4 px-6 pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-foreground font-heading text-lg">
            <div className="p-2 rounded-xl bg-gravitational-wave/10">
              <Waves className="w-5 h-5 text-gravitational-wave" />
            </div>
            Gravitational Wave Controls
          </CardTitle>
          <Badge 
            variant={isStable ? "secondary" : "destructive"}
            className={isStable ? "bg-secondary/50 text-secondary-foreground border-0 rounded-full px-3 py-1" : "bg-destructive/10 text-destructive border border-destructive/20 rounded-full px-3 py-1"}
          >
            {isStable ? "Stable" : "Critical"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 px-6 pb-6">
        {/* Frequency Control */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              Frequency (Hz)
            </label>
            <span className="text-sm font-mono text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-lg">
              {frequency.toFixed(2)}
            </span>
          </div>
          <Slider
            value={[frequency]}
            onValueChange={(value) => onFrequencyChange(value[0])}
            max={5}
            min={0.1}
            step={0.1}
            className="[&_[role=slider]]:bg-gravitational-wave [&_[role=slider]]:border-gravitational-wave [&_[role=slider]]:shadow-sm"
          />
          <div className="text-xs text-muted-foreground font-medium">
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
        <div className="flex gap-3 pt-6 border-t border-border">
          <Button
            onClick={onDrrToggle}
            variant={drrActive ? "default" : "outline"}
            className={`flex-1 rounded-xl font-medium h-11 ${drrActive ? 'bg-gemini-purple hover:bg-gemini-purple/90 text-white shadow-sm' : 'border-2 hover:bg-secondary/50'}`}
          >
            <Zap className="w-4 h-4 mr-2" />
            DRR {drrActive ? 'On' : 'Off'}
          </Button>
          
          <Button
            onClick={onReset}
            variant="outline"
            className="border-2 rounded-xl font-medium h-11 hover:bg-secondary/50"
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