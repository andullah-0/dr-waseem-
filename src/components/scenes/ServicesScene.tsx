import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneCanvas, Float } from './SceneCanvas';
import { useTheme } from '../../context/ThemeContext';

function DefenseShieldRing({ position, scale = 1, isDark }: { position: [number, number, number]; scale?: number; isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  const color = isDark ? '#14b8a6' : '#0d9488';

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[0.9, 0.05, 16, 48]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isDark ? 0.5 : 0.2}
          wireframe={true}
        />
      </mesh>
    </Float>
  );
}

function MolecularCluster({ position, isDark }: { position: [number, number, number]; isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.15;
    }
  });

  const nodeColor = isDark ? '#38bdf8' : '#0284c7';

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group ref={groupRef} position={position}>
        <mesh>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color={nodeColor}
            emissive={nodeColor}
            emissiveIntensity={isDark ? 0.4 : 0.1}
            wireframe
          />
        </mesh>
      </group>
    </Float>
  );
}

export const ServicesScene: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <SceneCanvas camera={{ position: [0, 0, 6], fov: 45 }} className="w-full h-full absolute inset-0 pointer-events-none">
      <ambientLight intensity={isDark ? 0.7 : 0.9} />
      <pointLight position={[4, 4, 3]} intensity={2} color={isDark ? '#06b6d4' : '#0284c7'} />
      <pointLight position={[-4, -3, 2]} intensity={2} color={isDark ? '#14b8a6' : '#0d9488'} />

      <DefenseShieldRing position={[-3, 1.5, -1]} scale={1.2} isDark={isDark} />
      <DefenseShieldRing position={[3.2, -1.2, -1]} scale={1.5} isDark={isDark} />
      <MolecularCluster position={[-2.2, -1.8, 0]} isDark={isDark} />
      <MolecularCluster position={[2.6, 1.8, 0.2]} isDark={isDark} />
    </SceneCanvas>
  );
};
