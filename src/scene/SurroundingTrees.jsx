import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

function SurroundingTrees({ opacity = 1 }) {
  const { scene } = useGLTF("/models/trees/surrounding-trees.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh) return;

      child.material = child.material.clone();
      child.material.transparent = true;
    });
  }, [scene]);

  useFrame((_, delta) => {
    scene.traverse((child) => {
      if (!child.isMesh) return;

      child.material.opacity = THREE.MathUtils.lerp(
        child.material.opacity,
        opacity,
        delta * 2,
      );
    });
  });

  return <primitive object={scene} />;
}

useGLTF.preload("/models/trees/surrounding-trees.glb");

export default SurroundingTrees;
