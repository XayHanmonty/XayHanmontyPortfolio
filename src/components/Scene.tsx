import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const Scene = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particlesGeometryRef = useRef<THREE.BufferGeometry>(null);

  // Create particles
  const particlesCount = 3000;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 15;
    positions[i + 1] = (Math.random() - 0.5) * 15;
    positions[i + 2] = (Math.random() - 0.5) * 15;
  }

  useFrame((state) => {
    if (!particlesRef.current) return;

    // Rotate particles
    particlesRef.current.rotation.x += 0.0003;
    particlesRef.current.rotation.y += 0.0003;

    // Update particles positions
    if (particlesGeometryRef.current) {
      const positions = particlesGeometryRef.current.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i]) * 0.0003;
      }
      particlesGeometryRef.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <points ref={particlesRef}>
        <bufferGeometry ref={particlesGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color="#00ffff"
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>
    </>
  );
};

export default Scene;