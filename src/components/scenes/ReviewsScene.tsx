import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneCanvas, Float } from './SceneCanvas';
import { useTheme } from '../../context/ThemeContext';

function FloatingStar3D({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#d97706"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function FloatingRing({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.25;
      ref.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1}>
      <mesh ref={ref} position={position}>
        <torusGeometry args={[0.6, 0.03, 16, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} wireframe />
      </mesh>
    </Float>
  );
}

export const ReviewsScene: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <SceneCanvas camera={{ position: [0, 0, 5], fov: 45 }} className="w-full h-full absolute inset-0 pointer-events-none">
      <ambientLight intensity={isDark ? 0.7 : 0.9} />
      <pointLight position={[3, 3, 2]} intensity={2} color="#fbbf24" />
      <pointLight position={[-3, -2, 2]} intensity={1.5} color={isDark ? '#06b6d4' : '#0284c7'} />

      <FloatingStar3D position={[-2.5, 1.5, 0]} scale={1.2} />
      <FloatingStar3D position={[2.6, 1.3, -0.5]} scale={1} />
      <FloatingStar3D position={[-2, -1.5, -0.2]} scale={0.9} />
      <FloatingStar3D position={[2.2, -1.6, 0.2]} scale={1.1} />

      <FloatingRing position={[-2.8, -0.2, -1]} color={isDark ? '#2dd4bf' : '#0d9488'} />
      <FloatingRing position={[2.7, 0.4, -1]} color={isDark ? '#38bdf8' : '#0284c7'} />
    </SceneCanvas>
  );
};
