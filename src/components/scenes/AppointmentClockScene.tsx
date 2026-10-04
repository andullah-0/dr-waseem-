import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneCanvas, Float } from './SceneCanvas';
import { useTheme } from '../../context/ThemeContext';

function NightClock3D({ isDark }: { isDark: boolean }) {
  const clockGroupRef = useRef<THREE.Group>(null!);
  const minuteHandRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (clockGroupRef.current) {
      clockGroupRef.current.rotation.y += delta * 0.15;
    }
    if (minuteHandRef.current) {
      minuteHandRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.3 - 0.5;
    }
  });

  const accentColor = isDark ? '#2dd4bf' : '#0d9488';
  const rimColor = isDark ? '#38bdf8' : '#0284c7';

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1}>
      <group ref={clockGroupRef} position={[1.8, 0, 0]} rotation={[0.1, -0.3, 0]}>
        <mesh>
          <torusGeometry args={[1.3, 0.06, 16, 64]} />
          <meshStandardMaterial
            color={rimColor}
            emissive={rimColor}
            emissiveIntensity={isDark ? 0.6 : 0.2}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        <mesh position={[0, 0, -0.02]}>
          <cylinderGeometry args={[1.25, 1.25, 0.04, 48]} />
          <meshPhysicalMaterial
            color={isDark ? '#0f172a' : '#f8fafc'}
            roughness={0.3}
            transmission={0.4}
            transparent
            opacity={0.8}
          />
        </mesh>

        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x = Math.sin(angle) * 1.05;
          const y = Math.cos(angle) * 1.05;
          const isNightHour = i === 10 || i === 11;
          return (
            <mesh key={i} position={[x, y, 0.03]} rotation={[0, 0, -angle]}>
              <boxGeometry args={[0.04, isNightHour ? 0.18 : 0.1, 0.03]} />
              <meshBasicMaterial color={isNightHour ? '#f59e0b' : accentColor} />
            </mesh>
          );
        })}

        <mesh position={[-0.22, 0.26, 0.05]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.05, 0.6, 0.03]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
        </mesh>

        <mesh ref={minuteHandRef} position={[0, -0.35, 0.07]}>
          <boxGeometry args={[0.04, 0.8, 0.03]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
        </mesh>

        <mesh position={[0, 0, 0.09]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.9} />
        </mesh>

        <mesh position={[0.7, 0.7, 0.2]} rotation={[0, 0, 0.3]}>
          <torusGeometry args={[0.25, 0.06, 12, 32, Math.PI * 1.3]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#f59e0b"
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
}

export const AppointmentClockScene: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <SceneCanvas camera={{ position: [0, 0, 5], fov: 45 }} className="w-full h-full absolute inset-0 pointer-events-none">
      <ambientLight intensity={isDark ? 0.7 : 0.9} />
      <directionalLight position={[4, 6, 4]} intensity={1.5} color="#e0f2fe" />
      <pointLight position={[2, 2, 3]} intensity={2.5} color="#fbbf24" />
      <pointLight position={[-3, -2, 2]} intensity={1.8} color={isDark ? '#06b6d4' : '#0284c7'} />

      <NightClock3D isDark={isDark} />
    </SceneCanvas>
  );
};
