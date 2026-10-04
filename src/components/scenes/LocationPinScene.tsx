import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneCanvas, Float } from './SceneCanvas';
import { useTheme } from '../../context/ThemeContext';

function LocationBeacon({ isDark }: { isDark: boolean }) {
  const pinGroupRef = useRef<THREE.Group>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const { width } = useThree((state) => state.viewport);

  const position: [number, number, number] = width < 6 ? [0.4, 0.4, -0.8] : [1.5, 0, 0];
  const scale = width < 6 ? 0.75 : 1;

  useFrame((state, delta) => {
    if (pinGroupRef.current) {
      pinGroupRef.current.rotation.y += delta * 0.4;
    }

    const t1 = (state.clock.getElapsedTime() * 0.8) % 2;
    if (ring1Ref.current) {
      const s1 = 0.5 + t1 * 0.8;
      ring1Ref.current.scale.set(s1, s1, s1);
      (ring1Ref.current.material as THREE.Material).opacity = Math.max(0, 1 - t1 / 2);
    }

    const t2 = ((state.clock.getElapsedTime() * 0.8) + 1) % 2;
    if (ring2Ref.current) {
      const s2 = 0.5 + t2 * 0.8;
      ring2Ref.current.scale.set(s2, s2, s2);
      (ring2Ref.current.material as THREE.Material).opacity = Math.max(0, 1 - t2 / 2);
    }
  });

  const pinColor = '#14b8a6';
  const accentColor = '#38bdf8';

  return (
    <group position={position} scale={scale}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={pinGroupRef} position={[0, 0.4, 0]}>
          <mesh position={[0, 0.6, 0]}>
            <sphereGeometry args={[0.45, 32, 32]} />
            <meshStandardMaterial
              color={pinColor}
              emissive={pinColor}
              emissiveIntensity={isDark ? 0.6 : 0.2}
              metalness={0.6}
              roughness={0.2}
            />
          </mesh>

          <mesh position={[0, 0.6, 0]}>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial
              color={isDark ? '#e0f2fe' : '#0369a1'}
              emissive={isDark ? '#e0f2fe' : '#0369a1'}
              emissiveIntensity={isDark ? 0.8 : 0.3}
            />
          </mesh>

          <mesh position={[0, 0.1, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.42, 0.85, 32]} />
            <meshStandardMaterial
              color={pinColor}
              emissive={pinColor}
              emissiveIntensity={isDark ? 0.5 : 0.2}
              metalness={0.6}
              roughness={0.2}
            />
          </mesh>
        </group>
      </Float>

      <mesh ref={ring1Ref} position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 0.68, 48]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={ring2Ref} position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 0.68, 48]} />
        <meshBasicMaterial color={pinColor} transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.3, 32]} />
        <meshBasicMaterial color={isDark ? '#1e293b' : '#cbd5e1'} />
      </mesh>
    </group>
  );
}

export const LocationPinScene: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <SceneCanvas camera={{ position: [0, 0, 5], fov: 45 }} className="w-full h-full absolute inset-0 pointer-events-none">
      <ambientLight intensity={isDark ? 0.7 : 0.9} />
      <directionalLight position={[4, 6, 4]} intensity={1.5} color="#e0f2fe" />
      <pointLight position={[2, 2, 3]} intensity={2.5} color="#14b8a6" />
      <pointLight position={[-3, -2, 2]} intensity={1.8} color="#06b6d4" />

      <LocationBeacon isDark={isDark} />
    </SceneCanvas>
  );
};
