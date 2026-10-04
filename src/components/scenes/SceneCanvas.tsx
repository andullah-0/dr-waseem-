import React, { Suspense, Component, ErrorInfo, ReactNode, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  camera?: any;
}

interface State {
  hasError: boolean;
}

export class ThreeErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('ThreeJS WebGL Error caught:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={`flex items-center justify-center ${this.props.className || 'w-full h-full'}`}>
          <div className="text-center p-4 text-xs text-teal-400/60">
            {this.props.fallback || (
              <div className="w-24 h-24 rounded-full border border-teal-500/20 bg-teal-500/5 animate-pulse mx-auto" />
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export interface FloatProps {
  children: ReactNode;
  speed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
}

export const Float: React.FC<FloatProps> = ({
  children,
  speed = 1.5,
  rotationIntensity = 0.5,
  floatIntensity = 1,
}) => {
  const ref = useRef<THREE.Group>(null!);
  const offset = useRef(Math.random() * 100);

  useFrame((state) => {
    if (!ref.current) return;
    const t = offset.current + state.clock.getElapsedTime() * speed;
    ref.current.rotation.x = Math.cos(t / 4) * 0.08 * rotationIntensity;
    ref.current.rotation.y = Math.sin(t / 4) * 0.08 * rotationIntensity;
    ref.current.rotation.z = Math.sin(t / 4) * 0.05 * rotationIntensity;
    ref.current.position.y = Math.sin(t / 2) * 0.12 * floatIntensity;
  });

  return <group ref={ref}>{children}</group>;
};

export const SceneCanvas: React.FC<Props> = ({
  children,
  className = 'w-full h-full',
  camera = { position: [0, 0, 5], fov: 50 },
}) => {
  return (
    <ThreeErrorBoundary className={className}>
      <div className={`relative ${className}`}>
        <Canvas
          camera={camera}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="pointer-events-none"
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      </div>
    </ThreeErrorBoundary>
  );
};
