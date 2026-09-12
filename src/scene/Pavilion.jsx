import { useGLTF, Sky, Clouds, Cloud } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Pavilion() {
  const { scene } = useGLTF("/models/pavilion/pavilion.glb");

  const waterMeshes = useRef([]);

  const pavilionScene = useMemo(() => {
    const cloned = scene.clone(true);

    waterMeshes.current = [];

    cloned.traverse((child) => {
      if (!child.isMesh) return;

      child.castShadow = true;
      child.receiveShadow = true;

      const materialName = (child.material?.name || "").toLowerCase();

      // -------------------------
      // COLUMNS - white metal
      // -------------------------
      if (materialName === "crux_columns") {
        child.material = new THREE.MeshStandardMaterial({
          color: "#efefe9",
          metalness: 0.12,
          roughness: 0.38,
        });
        return;
      }

      // -------------------------
      // FRAME - soft silver/white
      // -------------------------
      if (materialName === "frame") {
        child.material = new THREE.MeshStandardMaterial({
          color: "#ddddda",
          metalness: 0.28,
          roughness: 0.32,
        });
        return;
      }

      // -------------------------
      // CHAIRS METAL - chrome
      // -------------------------
      if (materialName === "chairsmetal") {
        child.material = new THREE.MeshStandardMaterial({
          color: "#c7c7c7",
          metalness: 0.88,
          roughness: 0.2,
        });
        return;
      }

      // -------------------------
      // WATER
      // -------------------------
      if (materialName === "water") {
        child.material = new THREE.MeshPhysicalMaterial({
          color: "#e6f7f8",
          metalness: 0.05,
          roughness: 0.02,
          transparent: true,
          opacity: 1,
          transmission: 0.92,
          ior: 1.333,
          reflectivity: 0.8,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          envMapIntensity: 1.5,
        });

        const positionAttribute = child.geometry?.attributes?.position;
        if (positionAttribute) {
          child.userData.originalPositions = positionAttribute.array.slice();
        }

        waterMeshes.current.push(child);
        return;
      }

      // -------------------------
      // GLASS CLEAR
      // -------------------------
      if (materialName === "glass_clear") {
        child.material = new THREE.MeshPhysicalMaterial({
          color: "#e8f1f2",
          metalness: 0,
          roughness: 0.05,
          transmission: 0.9,
          transparent: true,
          opacity: 0.35,
          ior: 1.45,
          thickness: 0.05,
        });
        return;
      }

      // -------------------------
      // ONYX WALLS (G_wall_2 & G_wall_3)
      // -------------------------
      if (materialName === "g_wall_2" || materialName === "g_wall_3") {
        child.material = new THREE.MeshStandardMaterial({
          color: "#e8d5b5",
          roughness: 0.35,
          metalness: 0.05,
        });
        return;
      }

      // -------------------------
      // GREEN MARBLE WALL (G_wall_1)
      // -------------------------
      if (materialName === "g_wall_1") {
        child.material = new THREE.MeshStandardMaterial({
          color: "#7b8d88",
          roughness: 0.3,
          metalness: 0.1,
        });
        return;
      }

      // -------------------------
      // GLASS FROSTED
      // -------------------------
      if (materialName === "glass_frosted") {
        child.material = new THREE.MeshPhysicalMaterial({
          color: "#f0f5f5",
          metalness: 0,
          roughness: 0.4,
          transmission: 0.88,
          transparent: true,
          opacity: 1,
          ior: 1.45,
          thickness: 0.08,
        });
        return;
      }

      // -------------------------
      // GLASS DARK
      // -------------------------
      if (materialName === "glass_dark") {
        child.material = new THREE.MeshPhysicalMaterial({
          color: "#233033",
          metalness: 0,
          roughness: 0.18,
          transmission: 0.2,
          transparent: true,
          opacity: 0.65,
          ior: 1.45,
          thickness: 0.08,
        });
        return;
      }
    });

    return cloned;
  }, [scene]);

  // -------------------------
  // WATER WAVES
  // -------------------------
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    waterMeshes.current.forEach((mesh) => {
      const geometry = mesh.geometry;
      const position = geometry?.attributes?.position;
      const originalPositions = mesh.userData.originalPositions;

      if (!position || !originalPositions) return;
      if (position.count < 100) return;

      for (let i = 0; i < position.count; i++) {
        const index = i * 3;
        const originalX = originalPositions[index];
        const originalY = originalPositions[index + 1];
        const originalZ = originalPositions[index + 2];

        const wave1 = Math.sin(originalX * 0.8 + time * 0.6) * 0.004;
        const wave2 = Math.cos(originalZ * 0.6 + time * 0.5) * 0.003;

        position.setXYZ(i, originalX, originalY + wave1 + wave2, originalZ);
      }

      position.needsUpdate = true;
      geometry.computeVertexNormals();
    });
  });

  return (
    <>
      {/* שמיים אדריכליים מוארים ונקיים */}
      <Sky sunPosition={[100, 20, 100]} inclination={0.2} azimuth={180} />

      {/* עננים רכים ועדינים ברקע מאחורי העצים */}
      <Clouds limit={200} material={THREE.MeshBasicMaterial}>
        <Cloud
          position={[30, 30, -70]}
          speed={0.1}
          opacity={0.25}
          bounds={[320, 15, 20]}
          volume={10}
          seed={2}
          color="#ffffff"
          scale={4}
        />
        <Cloud
          position={[30, 28, -60]}
          speed={0.09}
          opacity={0.3}
          bounds={[150, 10, 10]}
          color="#f4f4f4"
          scale={7}
        />
      </Clouds>

      <primitive object={pavilionScene} />
    </>
  );
}

export default Pavilion;
