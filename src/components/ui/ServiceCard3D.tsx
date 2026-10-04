import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { ThreeErrorBoundary, Float } from '../scenes/SceneCanvas';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  symptoms: string[];
  treatment: string;
  iconShape: 'lungs' | 'droplet' | 'shield' | 'molecule' | 'sinus' | 'testing';
}

function Mini3DIcon({ shape, isDark }: { shape: ServiceCardProps['iconShape']; isDark: boolean }) {
  const meshColor = isDark ? '#2dd4bf' : '#0d9488';
  const emissiveColor = isDark ? '#06b6d4' : '#0284c7';

  return (
    <ThreeErrorBoundary fallback={<div className="w-8 h-8 rounded-full bg-teal-500/20" />}>
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.9} />
        <pointLight position={[2, 2, 2]} intensity={2} color={emissiveColor} />
        <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
          {shape === 'lungs' && (
            <group scale={0.7}>
              <mesh position={[-0.4, 0, 0]}>
                <capsuleGeometry args={[0.3, 0.6, 8, 16]} />
                <meshStandardMaterial color={meshColor} roughness={0.2} metalness={0.6} />
              </mesh>
              <mesh position={[0.4, 0, 0]}>
                <capsuleGeometry args={[0.3, 0.6, 8, 16]} />
                <meshStandardMaterial color={meshColor} roughness={0.2} metalness={0.6} />
              </mesh>
            </group>
          )}
          {shape === 'droplet' && (
            <mesh scale={0.8} rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.6, 1.2, 16]} />
              <meshStandardMaterial color={meshColor} roughness={0.2} metalness={0.7} />
            </mesh>
          )}
          {shape === 'shield' && (
            <mesh scale={0.8}>
              <cylinderGeometry args={[0.6, 0.3, 0.9, 6]} />
              <meshStandardMaterial color={meshColor} roughness={0.3} metalness={0.5} />
            </mesh>
          )}
          {shape === 'molecule' && (
            <group scale={0.7}>
              <mesh>
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshStandardMaterial color={meshColor} />
              </mesh>
              <mesh position={[0.6, 0.3, 0]}>
                <sphereGeometry args={[0.2, 12, 12]} />
                <meshStandardMaterial color={emissiveColor} />
              </mesh>
              <mesh position={[-0.5, -0.4, 0.2]}>
                <sphereGeometry args={[0.2, 12, 12]} />
                <meshStandardMaterial color={emissiveColor} />
              </mesh>
            </group>
          )}
          {shape === 'sinus' && (
            <mesh scale={0.8} rotation={[0.4, 0.3, 0]}>
              <torusGeometry args={[0.5, 0.15, 12, 24]} />
              <meshStandardMaterial color={meshColor} roughness={0.3} />
            </mesh>
          )}
          {shape === 'testing' && (
            <mesh scale={0.8}>
              <octahedronGeometry args={[0.7, 0]} />
              <meshStandardMaterial color={meshColor} roughness={0.2} metalness={0.8} wireframe />
            </mesh>
          )}
        </Float>
      </Canvas>
    </ThreeErrorBoundary>
  );
}

export const ServiceCard3D: React.FC<ServiceCardProps> = ({
  title,
  subtitle,
  description,
  symptoms,
  treatment,
  iconShape,
}) => {
  const { isDark } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['9deg', '-9deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-9deg', '9deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative rounded-2xl glass-panel p-6 sm:p-7 flex flex-col justify-between transition-shadow duration-300 border border-teal-500/20 hover:border-teal-400/50 hover:shadow-xl hover:shadow-teal-500/10 group cursor-pointer"
    >
      <div
        className={`absolute -inset-px rounded-2xl bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10`}
      />

      <div style={{ transform: 'translateZ(30px)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 rounded-xl bg-teal-500/10 dark:bg-slate-900/60 border border-teal-500/30 flex items-center justify-center overflow-hidden">
            <Mini3DIcon shape={iconShape} isDark={isDark} />
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/30">
            {subtitle}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3 text-slate-900 dark:text-white group-hover:text-teal-400 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {description}
        </p>

        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2">
            Frequent Symptoms:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {symptoms.map((s, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="text-xs text-teal-600 dark:text-teal-300/90 font-medium mb-6 bg-teal-500/5 dark:bg-teal-950/30 p-2.5 rounded-lg border border-teal-500/15">
          <strong className="block text-slate-800 dark:text-slate-200 mb-0.5">Clinical Approach:</strong>
          {treatment}
        </div>
      </div>

      <div style={{ transform: 'translateZ(40px)' }} className="pt-2 border-t border-slate-200/50 dark:border-slate-800/80">
        <Link
          to="/appointment"
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform"
        >
          <span>Book Consultation for this</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};
