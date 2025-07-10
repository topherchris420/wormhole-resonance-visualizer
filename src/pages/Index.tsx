import React, { useState, useEffect, useCallback } from 'react';
import { WormholeSimulation } from '@/components/WormholeSimulation';
import { WaveControls } from '@/components/WaveControls';
import { MetricsDashboard } from '@/components/MetricsDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Atom, 
  Zap, 
  Shield, 
  AlertTriangle,
  Activity,
  Waves
} from 'lucide-react';

const Index = () => {
  // Wave parameters
  const [frequency, setFrequency] = useState(1.5);
  const [amplitude, setAmplitude] = useState(1.0);
  const [phase, setPhase] = useState(0);

  // System state
  const [drrActive, setDrrActive] = useState(false);
  const [systemTime, setSystemTime] = useState(0);

  // Calculated metrics
  const [stability, setStability] = useState(75);
  const [energy, setEnergy] = useState(45);
  const [collapseRisk, setCollapseRisk] = useState(25);
  const [resonanceDepth, setResonanceDepth] = useState(0);
  const [spacetimeCurvature, setSpacetimeCurvature] = useState(2.5);

  // Simulation calculations
  const calculateMetrics = useCallback(() => {
    // Stability calculation based on optimal parameters
    const optimalFreq = 1.5;
    const optimalAmp = 1.0;
    
    const freqDeviation = Math.abs(frequency - optimalFreq);
    const ampDeviation = Math.abs(amplitude - optimalAmp);
    
    let baseStability = 100 - (freqDeviation * 30 + ampDeviation * 25);
    
    // DRR bonus
    if (drrActive) {
      baseStability = Math.min(100, baseStability * 1.2);
      setResonanceDepth(Math.min(100, 60 + Math.sin(systemTime * 0.1) * 20));
    } else {
      setResonanceDepth(0);
    }
    
    // Add some dynamic variation
    const timeVariation = Math.sin(systemTime * 0.05) * 5;
    const newStability = Math.max(0, Math.min(100, baseStability + timeVariation));
    
    // Energy usage
    const energyUsage = 30 + amplitude * 25 + frequency * 15;
    const newEnergy = Math.max(0, Math.min(100, energyUsage + Math.sin(systemTime * 0.08) * 10));
    
    // Collapse risk
    const riskFromInstability = Math.max(0, 100 - newStability);
    const riskFromEnergy = newEnergy > 80 ? (newEnergy - 80) * 2 : 0;
    const newCollapseRisk = Math.max(0, Math.min(100, riskFromInstability + riskFromEnergy));
    
    // Spacetime curvature
    const newCurvature = 1 + amplitude * 2 + Math.sin(systemTime * frequency + phase) * 0.5;
    
    setStability(newStability);
    setEnergy(newEnergy);
    setCollapseRisk(newCollapseRisk);
    setSpacetimeCurvature(newCurvature);
  }, [frequency, amplitude, phase, drrActive, systemTime]);

  // Auto-DRR when system becomes unstable
  useEffect(() => {
    if (stability < 40 && !drrActive) {
      // Auto-engage DRR in critical situations
      setDrrActive(true);
    }
  }, [stability, drrActive]);

  // DRR auto-adjustment
  useEffect(() => {
    if (drrActive && stability < 60) {
      // Gradually adjust parameters toward optimal values
      const freqAdjustment = (1.5 - frequency) * 0.02;
      const ampAdjustment = (1.0 - amplitude) * 0.02;
      
      setFrequency(prev => prev + freqAdjustment);
      setAmplitude(prev => Math.max(0, prev + ampAdjustment));
    }
  }, [drrActive, stability, frequency, amplitude]);

  // Update system time and metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemTime(prev => prev + 1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    calculateMetrics();
  }, [calculateMetrics]);

  const handleReset = () => {
    setFrequency(1.5);
    setAmplitude(1.0);
    setPhase(0);
    setDrrActive(false);
  };

  const isStable = stability > 50 && collapseRisk < 70;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <Atom className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  DRR Wormhole Stabilization System
                </h1>
                <p className="text-sm text-muted-foreground">
                  Defense Research Simulation Platform v2.1
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge 
                variant={isStable ? "default" : "destructive"}
                className={`${isStable ? 'bg-stability-good' : ''} animate-quantum-pulse`}
              >
                {isStable ? (
                  <Shield className="w-3 h-3 mr-1" />
                ) : (
                  <AlertTriangle className="w-3 h-3 mr-1" />
                )}
                {isStable ? 'OPERATIONAL' : 'CRITICAL'}
              </Badge>
              
              {drrActive && (
                <Badge className="bg-resonance-active animate-quantum-pulse">
                  <Activity className="w-3 h-3 mr-1" />
                  DRR ACTIVE
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Interface */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Metrics Dashboard */}
        <MetricsDashboard
          stability={stability}
          energy={energy}
          collapseRisk={collapseRisk}
          resonanceDepth={resonanceDepth}
          spacetimeCurvature={spacetimeCurvature}
          frequency={frequency}
          amplitude={amplitude}
          drrActive={drrActive}
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Wormhole Visualization */}
          <div className="xl:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Waves className="w-5 h-5 text-primary" />
                  Wormhole Throat Visualization
                  <Badge variant="outline" className="ml-auto text-xs">
                    Real-time
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <WormholeSimulation
                  frequency={frequency}
                  amplitude={amplitude}
                  phase={phase}
                  stability={stability}
                  energy={energy}
                  isStable={isStable}
                />
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <WaveControls
              frequency={frequency}
              amplitude={amplitude}
              phase={phase}
              onFrequencyChange={setFrequency}
              onAmplitudeChange={setAmplitude}
              onPhaseChange={setPhase}
              onReset={handleReset}
              isStable={isStable}
              drrActive={drrActive}
              onDrrToggle={() => setDrrActive(!drrActive)}
            />

            {/* System Status */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm text-foreground">
                  <Zap className="w-4 h-4 text-accent" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Runtime</div>
                    <div className="font-mono text-foreground">
                      {Math.floor(systemTime / 600)}:{String(Math.floor((systemTime % 600) / 10)).padStart(2, '0')}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Cycles</div>
                    <div className="font-mono text-foreground">
                      {systemTime.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Throat Integrity</span>
                    <span className={stability > 70 ? 'text-stability-good' : 'text-destructive'}>
                      {stability > 70 ? 'STABLE' : 'DEGRADED'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Energy Consumption</span>
                    <span className="text-foreground">{energy.toFixed(0)} MW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Field Resonance</span>
                    <span className="text-resonance-active">
                      {drrActive ? 'SYNCHRONIZED' : 'INACTIVE'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Info */}
        <Card className="bg-card/50 border-border">
          <CardContent className="p-4">
            <div className="text-center text-sm text-muted-foreground">
              <p className="mb-2">
                <strong>Classification:</strong> Research Simulation • 
                <strong> Purpose:</strong> Theoretical Teleportation Mechanics • 
                <strong> Platform:</strong> Desktop/Tablet Compatible
              </p>
              <p>
                This simulation demonstrates theoretical Dynamic Resonance Rooting (DRR) control systems 
                for gravitational wave-stabilized wormhole geometries. Real-time physics calculations 
                include spacetime curvature, throat diameter modulation, and collapse risk assessment.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
