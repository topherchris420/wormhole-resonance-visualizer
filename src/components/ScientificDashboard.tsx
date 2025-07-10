import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  FileText, 
  Database,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Atom,
  Waves
} from 'lucide-react';
import { WormholePhysics } from '@/lib/physics';
import { GravitationalWaveData } from '@/lib/gravitationalWaves';

interface ScientificDashboardProps {
  frequency: number;
  amplitude: number;
  phase: number;
  throatRadius: number;
  stability: number;
  energy: number;
  systemTime: number;
  onExportData: () => void;
}

export const ScientificDashboard: React.FC<ScientificDashboardProps> = ({
  frequency,
  amplitude,
  phase,
  throatRadius,
  stability,
  energy,
  systemTime,
  onExportData
}) => {
  // Calculate real physics metrics
  const metric = WormholePhysics.calculateMetric(throatRadius * 2, throatRadius);
  const ricciScalar = WormholePhysics.calculateRicciScalar(throatRadius * 2, throatRadius, energy * 1e12);
  const energyReq = WormholePhysics.calculateEnergyRequirements(throatRadius, stability / 100, amplitude);
  const tidalForces = WormholePhysics.calculateTidalForces(throatRadius, energyReq.exoticMatterMass);
  const validation = WormholePhysics.validateParameters(frequency, amplitude, throatRadius);
  const collapseRisk = WormholePhysics.calculateCollapseRisk(stability / 100, energy * 1e12, amplitude);
  
  // Gravitational wave analysis
  const gwChirp = GravitationalWaveData.generateChirp(systemTime * 0.1, frequency, 30, 20, 400);
  const detectorResponse = GravitationalWaveData.simulateDetectorResponse(gwChirp.strain, gwChirp.frequency, systemTime * 0.1);
  const snr = GravitationalWaveData.calculateSNR(gwChirp.strain, gwChirp.frequency, 1);

  const formatScientific = (value: number, decimals: number = 2): string => {
    return value.toExponential(decimals);
  };

  const formatSI = (value: number, unit: string): string => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)} G${unit}`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)} M${unit}`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)} k${unit}`;
    if (value < 1e-9) return `${(value * 1e12).toFixed(2)} p${unit}`;
    if (value < 1e-6) return `${(value * 1e9).toFixed(2)} n${unit}`;
    if (value < 1e-3) return `${(value * 1e6).toFixed(2)} μ${unit}`;
    return `${value.toFixed(2)} ${unit}`;
  };

  return (
    <div className="space-y-6">
      {/* Physics Validation */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Atom className="w-5 h-5 text-primary" />
              Physics Validation
            </CardTitle>
            <Badge 
              variant={validation.isValid ? "default" : "destructive"}
              className={validation.isValid ? "bg-stability-good" : ""}
            >
              {validation.isValid ? (
                <CheckCircle className="w-3 h-3 mr-1" />
              ) : (
                <XCircle className="w-3 h-3 mr-1" />
              )}
              {validation.isValid ? 'VALID' : 'INVALID'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {validation.warnings.length > 0 && (
            <div className="space-y-2">
              {validation.warnings.map((warning, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-destructive/10 border border-destructive/20 rounded text-sm">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <span className="text-destructive">{warning}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {Object.entries(validation.constraints).map(([key, constraint]) => (
              <div key={key} className="space-y-1">
                <div className="font-medium text-foreground capitalize">{key}</div>
                <div className="font-mono text-muted-foreground">
                  {formatScientific(constraint.current)} {constraint.unit}
                </div>
                <div className="text-xs text-muted-foreground">
                  Range: {formatScientific(constraint.min)} - {formatScientific(constraint.max)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Spacetime Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm text-foreground">
              <Activity className="w-4 h-4 text-spacetime-distortion" />
              Morris-Thorne Metric
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-muted-foreground">g_tt</div>
                <div className="font-mono text-foreground">{formatScientific(metric.g_tt)} m²/s²</div>
              </div>
              <div>
                <div className="text-muted-foreground">g_rr</div>
                <div className="font-mono text-foreground">{metric.g_rr.toFixed(3)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">g_θθ</div>
                <div className="font-mono text-foreground">{formatScientific(metric.g_theta)} m²</div>
              </div>
              <div>
                <div className="text-muted-foreground">g_φφ</div>
                <div className="font-mono text-foreground">{formatScientific(metric.g_phi)} m²</div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ricci Scalar (R)</span>
                <span className="font-mono text-foreground">{formatScientific(ricciScalar)} m⁻²</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tidal Forces</span>
                <span className="font-mono text-foreground">{formatSI(tidalForces, 'N')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm text-foreground">
              <Zap className="w-4 h-4 text-accent" />
              Energy Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Energy</span>
                <span className="font-mono text-foreground">{formatSI(energyReq.totalEnergy, 'J')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Power Consumption</span>
                <span className="font-mono text-foreground">{formatSI(energyReq.powerConsumption, 'W')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Exotic Matter Mass</span>
                <span className="font-mono text-foreground">{formatSI(energyReq.exoticMatterMass, 'kg')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Casimir Energy</span>
                <span className="font-mono text-foreground">{formatSI(energyReq.casimirContribution, 'J')}</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Collapse Probability</span>
                <span className={`font-mono ${collapseRisk.probability > 0.5 ? 'text-destructive' : 'text-stability-good'}`}>
                  {(collapseRisk.probability * 100).toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={collapseRisk.probability * 100} 
                className={`h-2 ${collapseRisk.probability > 0.5 ? 'bg-destructive' : 'bg-stability-good'}`}
              />
              {collapseRisk.timeToCollapse !== Infinity && (
                <div className="text-xs text-destructive">
                  Estimated collapse time: {collapseRisk.timeToCollapse.toFixed(1)}s
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gravitational Wave Detection */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Waves className="w-5 h-5 text-gravitational-wave" />
            Gravitational Wave Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Chirp Parameters</div>
              <div className="space-y-1 text-xs">
                <div>Freq: {formatSI(gwChirp.frequency, 'Hz')}</div>
                <div>Strain: {formatScientific(gwChirp.strain)}</div>
                <div>Phase: {gwChirp.phase.toFixed(3)} rad</div>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">LIGO Hanford</div>
              <div className="font-mono text-xs text-foreground">
                {formatScientific(detectorResponse.hanford)}
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">LIGO Livingston</div>
              <div className="font-mono text-xs text-foreground">
                {formatScientific(detectorResponse.livingston)}
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Virgo</div>
              <div className="font-mono text-xs text-foreground">
                {formatScientific(detectorResponse.virgo)}
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Signal-to-Noise Ratio</div>
              <div className="font-mono text-lg text-foreground">{snr.snr.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">Threshold: {snr.detectionThreshold}</div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Detection Status</div>
              <Badge 
                variant={snr.snr > 8 ? "default" : snr.snr > 5 ? "secondary" : "outline"}
                className={snr.snr > 8 ? "bg-stability-good" : ""}
              >
                {snr.significance}
              </Badge>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Noise Level</div>
              <div className="font-mono text-foreground">{formatScientific(detectorResponse.noise)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Database className="w-5 h-5 text-primary" />
            Scientific Data Export
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-sm text-foreground">Export simulation data for research analysis</div>
              <div className="text-xs text-muted-foreground">
                Includes: Morris-Thorne metrics, energy calculations, GW data, validation results
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={onExportData}
                variant="outline"
                size="sm"
                className="border-primary/30"
              >
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
              <Button 
                onClick={() => {
                  // Future: CSV export
                  console.log('CSV export not yet implemented');
                }}
                variant="outline"
                size="sm"
                className="border-primary/30"
              >
                <FileText className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};