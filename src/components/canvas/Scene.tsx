import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Instance, Instances, Line, Sphere, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../store';

// A simple floating 3D Neural Node component for the Projects / Experience section
function NeuralNetwork({ activeSection }: { activeSection: string }) {
  const visible = activeSection === 'projects' || activeSection === 'experience';
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current && visible) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  if (!visible) return null;

  return (
    <group ref={group} position={[2, 0, -5]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Instances limit={50} range={50}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#06b6d4" toneMapped={false} />
          {Array.from({ length: 50 }).map((_, i) => (
            <Instance
              key={i}
              position={[
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
              ]}
            />
          ))}
        </Instances>
        {/* Simple connecting lines representation */}
        <Line 
          points={[[0, 0, 0], [1, 1, 0], [-1, 2, 1], [0, 0, 0]]} 
          color="#8b5cf6" 
          lineWidth={1}
          opacity={0.3}
          transparent
        />
      </Float>
    </group>
  );
}

// Engineering Lab Flow
function EngineeringLabFlow({ activeSection }: { activeSection: string }) {
  const visible = activeSection === 'engineering-lab';
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current && visible) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  if (!visible) return null;

  const nodes = [
    { pos: [-3, 2, 0], label: 'LEXER' },
    { pos: [-1, 1, -1], label: 'PARSER' },
    { pos: [1, 0, 1], label: 'SEMANTIC' },
    { pos: [2, -1, -2], label: 'QUALITY' },
    { pos: [3, -2, 0], label: 'OUTPUT' },
  ];

  return (
    <group ref={group} position={[0, 0, -4]}>
      {nodes.map((n, i) => (
        <Float key={i} speed={2} floatIntensity={2}>
          <Sphere args={[0.2, 32, 32]} position={n.pos as [number, number, number]}>
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#10b981" : "#14b8a6"} 
              emissive={i % 2 === 0 ? "#10b981" : "#14b8a6"}
              emissiveIntensity={1.5}
            />
          </Sphere>
        </Float>
      ))}
      <Line
        points={nodes.map(n => n.pos as [number, number, number])}
        color="#10b981"
        lineWidth={2}
        opacity={0.6}
        transparent
      />
      <Sparkles count={100} scale={8} size={2} color="#10b981" opacity={0.2} speed={0.4} />
    </group>
  );
}

// Cinematic Camera controller
function CameraController() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const isHeroVisible = useAppStore(state => state.isHeroVisible);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!isHeroVisible) {
      // Subtle parallax when outside hero
      const targetX = mouse.current.x * 0.5;
      const targetY = mouse.current.y * 0.5;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, -5);
    }
  });

  return null;
}

export default function Scene() {
  const activeSection = useAppStore(state => state.activeSection);
  const isHeroVisible = useAppStore(state => state.isHeroVisible);

  // If hero is visible, we completely hide the WebGL scene to not interfere
  // and save performance as requested.
  if (isHeroVisible) return null;

  // Determine ambient colors based on active section
  const fogColor = useMemo(() => {
    switch (activeSection) {
      case 'engineering-lab': return '#022c22'; // Dark emerald
      case 'achievements': return '#451a03'; // Dark amber
      case 'contact': return '#3b0764'; // Dark purple
      default: return '#080c14'; // Dark cyan/blue
    }
  }, [activeSection]);

  return (
    <>
      <color attach="background" args={[fogColor]} />
      <fog attach="fog" args={[fogColor, 5, 20]} />

      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#06b6d4" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />

      {/* Global Background Particles */}
      <Stars radius={50} depth={20} count={2000} factor={2} saturation={1} fade speed={0.5} />

      {/* Section specific 3D environments */}
      <NeuralNetwork activeSection={activeSection} />
      <EngineeringLabFlow activeSection={activeSection} />

      <CameraController />
    </>
  );
}
