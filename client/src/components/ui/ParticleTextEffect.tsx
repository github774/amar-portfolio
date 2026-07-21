import React, { useEffect, useRef, useState } from 'react';

interface Pointer {
  x?: number;
  y?: number;
}

interface Particle {
  ox: number;
  oy: number;
  cx: number;
  cy: number;
  or: number;
  cr: number;
  pv: number;
  ov: number;
  f: number;
  rgb: number[];
  draw: () => void;
  move: (interactionRadius: number, hasPointer: boolean) => boolean;
}

interface TextBox {
  str: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}

export interface ParticleTextEffectProps {
  text?: string;
  colors?: string[];
  className?: string;
  animationForce?: number;
  particleDensity?: number;
}

const ParticleTextEffect: React.FC<ParticleTextEffectProps> = ({
  text = 'AMAR',
  colors = [
    'ffffff', 'f4f4f5', 'e4e4e7', 'd4d4d8', 'a1a1aa',
    '71717a', '52525b', '3f3f46', '27272a'
  ],
  className = '',
  animationForce = 70,
  particleDensity = 3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef<Pointer>({});
  const hasPointerRef = useRef<boolean>(false);
  const interactionRadiusRef = useRef<number>(100);

  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({
    width: 1200,
    height: 400,
  });

  const [textBox] = useState<TextBox>({ str: text });

  const rand = (max = 1, min = 0, dec = 0): number => {
    return +(min + Math.random() * (max - min)).toFixed(dec);
  };

  class ParticleClass implements Particle {
    ox: number;
    oy: number;
    cx: number;
    cy: number;
    or: number;
    cr: number;
    pv: number;
    ov: number;
    f: number;
    rgb: number[];

    constructor(x: number, y: number, rgb: number[] = [128, 128, 128]) {
      this.ox = x;
      this.oy = y;
      this.cx = x;
      this.cy = y;
      this.or = rand(3.5, 1);
      this.cr = this.or;
      this.pv = 0;
      this.ov = 0;
      this.f = rand(animationForce + 15, animationForce - 15);
      this.rgb = rgb.map(c => Math.max(0, c + rand(15, -15)));
    }

    draw() {
      const ctx = ctxRef.current;
      if (!ctx) return;
      ctx.fillStyle = `rgb(${this.rgb.join(',')})`;
      ctx.beginPath();
      ctx.arc(this.cx, this.cy, this.cr, 0, 2 * Math.PI);
      ctx.fill();
    }

    move(interactionRadius: number, hasPointer: boolean) {
      let moved = false;

      if (hasPointer && pointerRef.current.x !== undefined && pointerRef.current.y !== undefined) {
        const dx = this.cx - pointerRef.current.x;
        const dy = this.cy - pointerRef.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < interactionRadius && dist > 0) {
          const force = Math.min(this.f, (interactionRadius - dist) / dist * 2.5);
          this.cx += (dx / dist) * force;
          this.cy += (dy / dist) * force;
          moved = true;
        }
      }

      const odx = this.ox - this.cx;
      const ody = this.oy - this.cy;
      const od = Math.hypot(odx, ody);

      if (od > 0.5) {
        const restore = Math.min(od * 0.12, 4);
        this.cx += (odx / od) * restore;
        this.cy += (ody / od) * restore;
        moved = true;
      } else {
        this.cx = this.ox;
        this.cy = this.oy;
      }

      this.draw();
      return moved;
    }
  }

  const dottify = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas || textBox.x === undefined || textBox.y === undefined || !textBox.w || !textBox.h) return;

    const data = ctx.getImageData(textBox.x, textBox.y, textBox.w, textBox.h).data;
    const pixels: { x: number; y: number; rgb: number[] }[] = [];

    const effectiveDensity = typeof window !== 'undefined' && window.innerWidth < 768 ? Math.max(particleDensity, 5) : particleDensity;

    for (let y = 0; y < textBox.h; y += effectiveDensity) {
      for (let x = 0; x < textBox.w; x += effectiveDensity) {
        const idx = (y * textBox.w + x) * 4;
        const alpha = data[idx + 3];
        if (alpha > 128) {
          pixels.push({
            x,
            y,
            rgb: [data[idx], data[idx + 1], data[idx + 2]],
          });
        }
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current = pixels.map(p => {
      return new ParticleClass(
        textBox.x! + p.x,
        textBox.y! + p.y,
        p.rgb
      );
    });

    particlesRef.current.forEach(p => p.draw());
  };

  const write = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    textBox.str = text;
    // Adapt size based on screen width
    const responsiveFontSize = Math.min(canvas.height * 0.8, (canvas.width / textBox.str.length) * 1.5);
    textBox.h = Math.floor(responsiveFontSize);

    interactionRadiusRef.current = Math.max(70, textBox.h * 0.8);

    ctx.font = `900 ${textBox.h}px Inter, System-UI, sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    textBox.w = Math.round(ctx.measureText(textBox.str).width);
    textBox.x = 0;
    textBox.y = 0.5 * (canvas.height - textBox.h);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const gradient = ctx.createLinearGradient(textBox.x, textBox.y, textBox.x + textBox.w, textBox.y + textBox.h);
    const N = colors.length - 1;
    colors.forEach((c, i) => gradient.addColorStop(i / N, `#${c}`));
    ctx.fillStyle = gradient;

    ctx.fillText(textBox.str, textBox.x, 0.5 * canvas.height);
    dottify();
  };

  const activeParticlesRef = useRef<boolean>(true);

  const animate = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    // Only redraw when particles are active or pointer is present
    if (activeParticlesRef.current || hasPointerRef.current) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let anyMoved = false;
      const particles = particlesRef.current;
      const radius = interactionRadiusRef.current;
      const hasPointer = hasPointerRef.current;

      for (let i = 0; i < particles.length; i++) {
        if (particles[i].move(radius, hasPointer)) {
          anyMoved = true;
        }
      }
      activeParticlesRef.current = anyMoved;
    }

    animationIdRef.current = requestAnimationFrame(animate);
  };

  const initialize = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    write();
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement;
        if (parent) {
          setCanvasSize({
            width: parent.clientWidth,
            height: Math.min(parent.clientHeight, 350),
          });
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    initialize();
  }, [text, colors, animationForce, particleDensity, canvasSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctxRef.current = ctx;
    initialize();

    // Start animation loop
    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    pointerRef.current.x = (e.clientX - rect.left) * scaleX;
    pointerRef.current.y = (e.clientY - rect.top) * scaleY;
    hasPointerRef.current = true;
  };

  const handlePointerLeave = () => {
    hasPointerRef.current = false;
    pointerRef.current.x = undefined;
    pointerRef.current.y = undefined;
  };

  const handlePointerEnter = () => {
    hasPointerRef.current = true;
  };

  return (
    <canvas
      ref={canvasRef}
      className={`w-full max-h-[350px] ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
    />
  );
};

export { ParticleTextEffect };
