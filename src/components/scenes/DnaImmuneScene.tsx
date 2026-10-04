import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneCanvas, Float } from './SceneCanvas';
import { useTheme } from '../../context/ThemeContext';

function DnaHelix({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const count = 30;
  const radius = 0.8;
  const height = 5.5;

  const helixData = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4;
      const y = (i / count) * height - height / 2;
      const x1 = Math.cos(t) * radius;
      const z1 = Math.sin(t) * radius;
      const x2 = Math.cos(t + Math.PI) * radius;
      const z2 = Math.sin(t + Math.PI) * radius;
      pairs.push({ x1, y, z1, x2, z2, angle: t });
    }
    return pairs;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  const strandColor1 = isDark ? '#38bdf8' : '#0284c7';
  const strandColor2 = isDark ? '#2dd4bf' : '#0d9488';
  const rungColor = isDark ? '#a78bfa' : '#7c3aed';

  return (
    <group ref={groupRef} position={[1.8, 0, 0]} rotation={[0.2, 0, 0.15]}>
      {helixData.map((pair, idx) => (
        <group key={idx}>
          <mesh position={[pair.x1, pair.y, pair.z1]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial
              color={strandColor1}
              emissive={strandColor1}
              emissiveIntensity={isDark ? 0.6 : 0.2}
              roughness={0.2}
            />
          </mesh>

          <mesh position={[pair.x2, pair.y, pair.z2]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial
              color={strandColor2}
              emissive={strandColor2}
              emissiveIntensity={isDark ? 0.6 : 0.2}
              roughness={0.2}
            />
          </mesh>

          <mesh position={[(pair.x1 + pair.x2) / 2, pair.y, (pair.z1 + pair.z2) / 2]} rotation={[0, -pair.angle, 0]}>
            <cylinderGeometry args={[0.015, 0.015, radius * 2, 8]} />
            <meshStandardMaterial
              color={rungColor}
              emissive={rungColor}
              emissiveIntensity={isDark ? 0.4 : 0.1}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function ImmuneCell({ position, scale = 1, isDark }: { position: [number, number, number]; scale?: number; isDark: boolean }) {
  const ref = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.z += delta * 0.2;
    }
  });

  const cellColor = isDark ? '#2dd4bf' : '#0d9488';

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.2}>
      <group ref={ref} position={position} scale={scale}>
        <mesh>
          <sphereGeometry args={[0.35, 24, 24]} />
          <meshPhysicalMaterial
            color={cellColor}
            emissive={cellColor}
            emissiveIntensity={isDark ? 0.4 : 0.15}
            roughness={0.3}
            transmission={0.4}
            transparent
            opacity={0.9}
          />
        </mesh>
        {[
          [0, 0.4, 0],
          [0, -0.4, 0],
          [0.4, 0, 0],
          [-0.4, 0, 0],
          [0, 0, 0.4],
          [0, 0, -0.4],
          [0.28, 0.28, 0],
          [-0.28, -0.28, 0],
        ].map((dir, idx) => (
          <mesh key={idx} position={dir as [number, number, number]}>
            <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
            <meshStandardMaterial color={isDark ? '#67e8f9' : '#0284c7'} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export const DnaImmuneScene: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <SceneCanvas camera={{ position: [0, 0, 5], fov: 45 }} className="w-full h-full absolute inset-0 pointer-events-none">
      <ambientLight intensity={isDark ? 0.6 : 0.8} />
      <directionalLight position={[4, 6, 4]} intensity={1.5} color="#e0f2fe" />
      <pointLight position={[-3, 2, 2]} intensity={2} color={isDark ? '#06b6d4' : '#0284c7'} />
      <pointLight position={[3, -2, 2]} intensity={2} color={isDark ? '#14b8a6' : '#0d9488'} />

      <DnaHelix isDark={isDark} />
      <ImmuneCell position={[-2, 1.2, 0]} scale={0.9} isDark={isDark} />
      <ImmuneCell position={[-2.4, -1.4, -0.5]} scale={0.7} isDark={isDark} />
      <ImmuneCell position={[0.2, -1.8, 0.5]} scale={0.6} isDark={isDark} />
    </SceneCanvas>
  );
};
