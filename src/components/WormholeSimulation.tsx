import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface WormholeProps {
  frequency: number;
  amplitude: number;
  phase: number;
  stability: number;
  energy: number;
  isStable: boolean;
}

export const WormholeSimulation: React.FC<WormholeProps> = ({
  frequency,
  amplitude,
  phase,
  stability,
  energy,
  isStable
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [particles, setParticles] = useState<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;
    let particleArray: typeof particles = [];

    const animate = () => {
      time += 0.016; // 60 FPS

      // Clear canvas with cosmic background
      ctx.fillStyle = 'rgba(4, 6, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.15;

      // Calculate wormhole throat parameters
      const waveModulation = Math.sin(time * frequency + phase) * amplitude;
      const throatRadius = baseRadius + waveModulation * 30;
      const distortionFactor = 1 + (energy / 100) * 0.5;

      // Draw spacetime grid distortion
      drawSpacetimeGrid(ctx, centerX, centerY, throatRadius, distortionFactor, time);

      // Draw wormhole throat
      drawWormholeThroat(ctx, centerX, centerY, throatRadius, stability, isStable, time);

      // Generate and update particles
      if (Math.random() < 0.3) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 200 + Math.random() * 100;
        particleArray.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          vx: -Math.cos(angle) * 2,
          vy: -Math.sin(angle) * 2,
          life: 0,
          maxLife: 60 + Math.random() * 40
        });
      }

      // Update and draw particles
      particleArray = particleArray.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        const dx = particle.x - centerX;
        const dy = particle.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Gravitational attraction to wormhole
        if (distance > throatRadius) {
          const force = 0.5 / (distance * distance);
          particle.vx += -dx * force;
          particle.vy += -dy * force;
        }

        // Draw particle
        const alpha = 1 - (particle.life / particle.maxLife);
        const size = 2 + alpha * 3;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(64, 224, 255, ${alpha * 0.8})`;
        ctx.fill();

        // Add particle glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(64, 224, 255, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;

        return particle.life < particle.maxLife && distance > throatRadius * 0.8;
      });

      // Draw gravitational wave visualization
      drawGravitationalWaves(ctx, centerX, centerY, frequency, amplitude, phase, time);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [frequency, amplitude, phase, stability, energy, isStable]);

  const drawSpacetimeGrid = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    throatRadius: number,
    distortionFactor: number,
    time: number
  ) => {
    ctx.strokeStyle = 'rgba(100, 150, 255, 0.2)';
    ctx.lineWidth = 1;

    const gridSize = 40;
    const maxRadius = Math.max(centerX, centerY) * 1.5;

    // Radial grid lines
    for (let radius = gridSize; radius < maxRadius; radius += gridSize) {
      ctx.beginPath();
      for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
        const distortion = radius < throatRadius * 2 ? 
          1 + (1 - radius / (throatRadius * 2)) * distortionFactor * 0.3 : 1;
        const x = centerX + Math.cos(angle) * radius * distortion;
        const y = centerY + Math.sin(angle) * radius * distortion;
        
        if (angle === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    // Angular grid lines
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      const x = centerX + Math.cos(angle) * maxRadius;
      const y = centerY + Math.sin(angle) * maxRadius;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const drawWormholeThroat = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    throatRadius: number,
    stability: number,
    isStable: boolean,
    time: number
  ) => {
    // Inner throat (event horizon)
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, throatRadius
    );
    
    if (isStable) {
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(0.7, 'rgba(64, 224, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(64, 224, 255, 0.2)');
    } else {
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(0.7, 'rgba(255, 100, 100, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 100, 100, 0.2)');
    }

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, throatRadius, 0, Math.PI * 2);
    ctx.fill();

    // Throat ring
    ctx.strokeStyle = isStable ? 
      `rgba(64, 224, 255, ${0.8 + Math.sin(time * 2) * 0.2})` :
      `rgba(255, 100, 100, ${0.8 + Math.sin(time * 4) * 0.2})`;
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.lineDashOffset = time * 20;
    ctx.stroke();
    ctx.setLineDash([]);

    // Stability indicators
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + time;
      const x = centerX + Math.cos(angle) * (throatRadius + 20);
      const y = centerY + Math.sin(angle) * (throatRadius + 20);
      
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${isStable ? '64, 224, 255' : '255, 100, 100'}, ${stability / 100})`;
      ctx.fill();
    }
  };

  const drawGravitationalWaves = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    frequency: number,
    amplitude: number,
    phase: number,
    time: number
  ) => {
    ctx.strokeStyle = 'rgba(200, 100, 255, 0.6)';
    ctx.lineWidth = 2;

    for (let wave = 0; wave < 3; wave++) {
      const waveRadius = 150 + wave * 80 + Math.sin(time * frequency + phase) * amplitude * 10;
      
      ctx.beginPath();
      for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
        const waveModulation = Math.sin(angle * 4 + time * frequency + phase) * amplitude * 0.1;
        const radius = waveRadius + waveModulation * 20;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (angle === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }
  };

  return (
    <Card className="relative bg-card border-border overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full min-h-[400px] bg-transparent"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(10, 20, 40, 0.9), rgba(4, 6, 20, 1))'
        }}
      />
      
      {/* Overlay indicators */}
      <div className="absolute top-4 left-4 text-foreground font-mono text-sm">
        <div className="bg-card/80 backdrop-blur-sm rounded p-2 space-y-1">
          <div>Throat Diameter: {(150 + amplitude * 30).toFixed(1)} km</div>
          <div>Wave Frequency: {frequency.toFixed(2)} Hz</div>
          <div className={`${isStable ? 'text-stability-good' : 'text-destructive'}`}>
            Status: {isStable ? 'STABLE' : 'UNSTABLE'}
          </div>
        </div>
      </div>

      {/* Energy flow visualization */}
      <div className="absolute bottom-4 right-4">
        <div className="w-16 h-2 bg-border rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent animate-energy-flow"
            style={{ width: `${Math.min(energy, 100)}%` }}
          />
        </div>
        <div className="text-xs text-muted-foreground font-mono mt-1">
          Energy: {energy.toFixed(0)}%
        </div>
      </div>
    </Card>
  );
};