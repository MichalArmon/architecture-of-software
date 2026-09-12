import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

function Pavilion() {
  const { scene } = useGLTF("/models/pavilion.glb");

  const pavilionScene = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child) => {
      if (!child.isMesh || !child.material) return;

      child.castShadow = true;
      child.receiveShadow = true;

      const material = child.material.clone();
      const name = child.name.toLowerCase();

      if (material.color) {
        material.color.offsetHSL(0, -0.12, 0.02);
      }

      if (
        name.includes("travertine") ||
        name.includes("floor") ||
        name.includes("base")
      ) {
        material.color.multiply(new THREE.Color("#f1ede2"));

        material.roughness = Math.max(material.roughness ?? 0.8, 0.7);
      }

      if (name.includes("onyx") || name.includes("marble")) {
        if (material.color) {
          material.color.multiply(new THREE.Color("#d1b29a"));
        }

        material.roughness = 0.55;
      }

      if (name.includes("glass")) {
        material.color = new THREE.Color("#d9e1df");
        material.transparent = true;
        material.opacity = 0.35;
        material.roughness = 0.12;
        material.metalness = 0;
      }

      if (
        name.includes("frame") ||
        name.includes("column") ||
        name.includes("steel") ||
        name.includes("chrome")
      ) {
        material.color = new THREE.Color("#d8d8d5");
        material.metalness = 0.9;
        material.roughness = 0.18;
      }

      if (
        name.includes("bench") ||
        name.includes("chair") ||
        name.includes("furniture") ||
        name.includes("barcelona")
      ) {
        material.color = new THREE.Color("#ded9cf");
        material.roughness = 0.55;
      }

      if (name.includes("water")) {
        material.color = new THREE.Color("#9aafc2");
        material.roughness = 0.08;
        material.metalness = 0;
        material.transparent = true;
        material.opacity = 0.9;
      }

      child.material = material;
    });

    return cloned;
  }, [scene]);

  return <primitive object={pavilionScene} />;
}

export default Pavilion;
