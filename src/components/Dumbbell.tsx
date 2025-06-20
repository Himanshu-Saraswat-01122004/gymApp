"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const DumbbellModel = () => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.01;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Handle */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 6, 32]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      {/* Weight 1 */}
      <mesh position={[0, 0, -3.5]}>
        <cylinderGeometry args={[2, 2, 1, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      {/* Weight 2 */}
      <mesh position={[0, 0, 3.5]}>
        <cylinderGeometry args={[2, 2, 1, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </group>
  );
};

const Dumbbell = () => {
  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <DumbbellModel />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default Dumbbell;
