import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneCanvas, Float } from './SceneCanvas';
import { useTheme } from '../../context/ThemeContext';

function PollenParticles({ isDark }: { isDark: boolean }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const { width } = useThree((state) => state.viewport);
  const count = width < 6 ? 160 : 320;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorTeal = new THREE.Color(isDark ? '#2dd4bf' : '#0d9488');
    const colorCyan = new THREE.Color(isDark ? '#38bdf8' : '#0284c7');
    const colorAmber = new THREE.Color('#f59e0b');

    for (let i = 0; i < count; i++) {
      const radius = 3.2 + Math.random() * 4.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = Math.random() > 0.4 ? (Math.random() > 0.5 ? colorTeal : colorCyan) : colorAmber;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [isDark, count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={width < 6 ? 0.05 : 0.06}
        vertexColors
        transparent
        opacity={isDark ? 0.8 : 0.6}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

function AllergenMolecule({ position, scale = 1, isDark }: { position: [number, number, number]; scale?: number; isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.2;
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  const mainColor = isDark ? '#38bdf8' : '#0284c7';
  const subColor = isDark ? '#2dd4bf' : '#0d9488';

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <group ref={groupRef} position={position} scale={scale}>
        <mesh>
          <sphereGeometry args={[0.3, 24, 24]} />
          <meshStandardMaterial
            color={mainColor}
            emissive={mainColor}
            emissiveIntensity={isDark ? 0.4 : 0.1}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        {[
          [0.45, 0.2, 0],
          [-0.4, 0.3, 0.2],
          [0, -0.45, 0.2],
          [-0.2, -0.2, -0.4],
        ].map((pos, idx) => (
          <group key={idx}>
            <mesh position={pos as [number, number, number]}>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial
                color={subColor}
                emissive={subColor}
                emissiveIntensity={isDark ? 0.5 : 0.2}
                roughness={0.3}
              />
            </mesh>
            <mesh position={[pos[0] * 0.5, pos[1] * 0.5, pos[2] * 0.5]}>
              <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
              <meshBasicMaterial color={isDark ? '#67e8f9' : '#0f766e'} transparent opacity={0.6} />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
}

function StylizedLungs({ isDark }: { isDark: boolean }) {
  const rootRef = useRef<THREE.Group>(null!);
  const leftLobeRef = useRef<THREE.Mesh>(null!);
  const rightLobeRef = useRef<THREE.Mesh>(null!);
  const { width } = useThree((state) => state.viewport);

  // Responsive position and scale for Mobile, Tablet, and Desktop
  const responsivePosition: [number, number, number] = useMemo(() => {
    if (width < 5) return [0.5, 0.3, -0.8]; // Mobile: pushed back slightly so text remains prominent
    if (width < 8) return [1.1, 0.1, -0.3]; // Tablet
    return [1.5, 0, 0]; // Desktop
  }, [width]);

  const responsiveScale = useMemo(() => {
    if (width < 5) return 0.78;
    if (width < 8) return 0.95;
    return 1.15;
  }, [width]);

  useFrame((state) => {
    const targetX = state.pointer.x * 0.4;
    const targetY = state.pointer.y * 0.25;

    if (rootRef.current) {
      rootRef.current.rotation.y += (targetX - rootRef.current.rotation.y) * 0.05;
      rootRef.current.rotation.x += (-targetY - rootRef.current.rotation.x) * 0.05;
    }

    const breath = 1 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.05;
    if (leftLobeRef.current && rightLobeRef.current) {
      leftLobeRef.current.scale.set(breath, breath * 1.05, breath * 0.95);
      rightLobeRef.current.scale.set(breath, breath * 1.05, breath * 0.95);
    }
  });

  const lobeColor = isDark ? '#06b6d4' : '#0284c7';
  const airwayColor = isDark ? '#2dd4bf' : '#0d9488';

  return (
    <group ref={rootRef} position={responsivePosition} scale={responsiveScale}>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.09, 0.1, 0.9, 16]} />
        <meshStandardMaterial
          color={airwayColor}
          emissive={airwayColor}
          emissiveIntensity={isDark ? 0.5 : 0.2}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {[-0.2, 0, 0.2].map((y, i) => (
        <mesh key={i} position={[0, 1.2 + y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.11, 0.02, 12, 24]} />
          <meshBasicMaterial color={isDark ? '#5eead4' : '#0f766e'} />
        </mesh>
      ))}

      <mesh position={[-0.35, 0.7, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.06, 0.08, 0.6, 12]} />
        <meshStandardMaterial color={airwayColor} emissive={airwayColor} emissiveIntensity={isDark ? 0.3 : 0.1} />
      </mesh>

      <mesh position={[0.35, 0.7, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.06, 0.08, 0.6, 12]} />
        <meshStandardMaterial color={airwayColor} emissive={airwayColor} emissiveIntensity={isDark ? 0.3 : 0.1} />
      </mesh>

      <mesh ref={leftLobeRef} position={[-0.85, 0.1, 0]}>
        <capsuleGeometry args={[0.48, 1.1, 16, 24]} />
        <meshPhysicalMaterial
          color={lobeColor}
          emissive={lobeColor}
          emissiveIntensity={isDark ? 0.35 : 0.1}
          transmission={0.65}
          opacity={isDark ? 0.85 : 0.75}
          transparent
          roughness={0.2}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      <mesh ref={rightLobeRef} position={[0.85, 0.05, 0]}>
        <capsuleGeometry args={[0.52, 1.15, 16, 24]} />
        <meshPhysicalMaterial
          color={lobeColor}
          emissive={lobeColor}
          emissiveIntensity={isDark ? 0.35 : 0.1}
          transmission={0.65}
          opacity={isDark ? 0.85 : 0.75}
          transparent
          roughness={0.2}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      <BronchioleNodes isDark={isDark} />
    </group>
  );
}

function BronchioleNodes({ isDark }: { isDark: boolean }) {
  const nodes: [number, number, number][] = [
    [-0.7, 0.3, 0.1],
    [-0.9, 0.1, -0.1],
    [-0.65, -0.2, 0.15],
    [-0.8, -0.4, 0],
    [-1.0, -0.1, 0.1],
    [0.7, 0.3, -0.1],
    [0.9, 0.1, 0.1],
    [0.65, -0.2, -0.15],
    [0.85, -0.4, 0.05],
    [1.0, -0.1, -0.1],
  ];

  return (
    <group>
      {nodes.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color={isDark ? '#6ee7b7' : '#0d9488'} />
        </mesh>
      ))}
    </group>
  );
}

function ResponsiveSceneElements({ isDark }: { isDark: boolean }) {
  const { width } = useThree((state) => state.viewport);
  const isMobile = width < 5.5;

  return (
    <>
      <PollenParticles isDark={isDark} />
      <AllergenMolecule
        position={isMobile ? [-1.6, 1.6, -0.8] : [-2.4, 1.4, -0.5]}
        scale={isMobile ? 0.55 : 0.75}
        isDark={isDark}
      />
      <AllergenMolecule
        position={isMobile ? [-1.4, -1.8, 0] : [-1.8, -1.5, 0.2]}
        scale={isMobile ? 0.5 : 0.65}
        isDark={isDark}
      />
      {!isMobile && (
        <AllergenMolecule position={[2.8, -1.8, -0.8]} scale={0.8} isDark={isDark} />
      )}
      <StylizedLungs isDark={isDark} />
    </>
  );
}

export const HomeHeroScene: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <SceneCanvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      className="w-full h-full absolute inset-0 pointer-events-none"
    >
      <ambientLight intensity={isDark ? 0.7 : 0.9} />
      <directionalLight position={[5, 8, 5]} intensity={isDark ? 1.5 : 1.8} color="#e0f2fe" />
      <pointLight position={[-4, -2, 2]} intensity={isDark ? 2.5 : 1.5} color={isDark ? '#06b6d4' : '#0284c7'} />
      <pointLight position={[3, 4, 3]} intensity={isDark ? 2.0 : 1.2} color={isDark ? '#14b8a6' : '#0d9488'} />

      <ResponsiveSceneElements isDark={isDark} />
    </SceneCanvas>
  );
};
