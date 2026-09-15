import { useGLTF, Sky, Clouds, Cloud, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Pavilion() {
  const { scene } = useGLTF("/models/pavilion/pavilion.glb");

  const waterNormals = useTexture("/textures/waternormals.jpg");

  const waterObjects = useRef([]);

  // ==================================================
  // WATER NORMAL MAP
  // ==================================================

  useEffect(() => {
    waterNormals.wrapS = THREE.RepeatWrapping;
    waterNormals.wrapT = THREE.RepeatWrapping;
    waterNormals.repeat.set(4, 4);
    waterNormals.needsUpdate = true;
  }, [waterNormals]);

  // ==================================================
  // PAVILION SCENE
  // ==================================================

  const pavilionScene = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child) => {
      if (!child.isMesh) return;

      child.castShadow = true;
      child.receiveShadow = true;

      const materialName = (child.material?.name || "").toLowerCase();

      // ==================================================
      // COLUMNS
      // ==================================================

      if (materialName === "crux_columns") {
        child.material = new THREE.MeshStandardMaterial({
          color: "#efefe9",
          metalness: 0.12,
          roughness: 0.38,
        });

        return;
      }

      // ==================================================
      // FRAME
      // ==================================================

      if (materialName === "frame") {
        child.material = new THREE.MeshStandardMaterial({
          color: "#ddddda",
          metalness: 0.28,
          roughness: 0.42,
        });

        return;
      }

      // ==================================================
      // CHAIRS METAL
      // ==================================================

      if (materialName === "chairsmetal") {
        child.material = new THREE.MeshStandardMaterial({
          color: "#c7c7c7",
          metalness: 0.88,
          roughness: 0.2,
        });

        return;
      }

      // ==================================================
      // WATER (MeshPhysicalMaterial)
      // ==================================================

      if (materialName === "water") {
        // אם צריך להרים מעט את המים ביחס לריינו, אפשר לשחרר את ההערה כאן:
        // child.position.y += 0.05;

        child.material = new THREE.MeshPhysicalMaterial({
          color: "#7ab3cf",
          metalness: 0.1,
          roughness: 0.05,
          transmission: 0.85,
          thickness: 1.2,
          ior: 1.333,
          normalMap: waterNormals,
          normalScale: new THREE.Vector2(0.15, 0.15),
          transparent: true,
          opacity: 0.9,
          side: THREE.DoubleSide,
        });

        child.receiveShadow = true;
        return;
      }

      // ==================================================
      // GLASS CLEAR
      // ==================================================

      if (materialName === "Glass_regular") {
        child.material = new THREE.MeshPhysicalMaterial({
          color: "#ffffff",
          metalness: 0,
          roughness: 0.02,
          transmission: 0.48,
          thickness: 0.1,
          ior: 1.5,
          transparent: true,
          opacity: 1,
          side: THREE.DoubleSide,
        });

        return;
      }

      // ==================================================
      // GLASS FROSTED
      // ==================================================

      if (materialName === "glass_frosted") {
        child.material = new THREE.MeshPhysicalMaterial({
          color: "#e8eff1",
          metalness: 0,
          roughness: 0.45,
          transmission: 0.85,
          thickness: 0.2,
          ior: 1.5,
          transparent: true,
          opacity: 1,
          side: THREE.DoubleSide,
        });

        return;
      }

      // ==================================================
      // GLASS DARK
      // ==================================================

      if (materialName === "glass_dark") {
        child.material = new THREE.MeshPhysicalMaterial({
          color: "#1c282b",
          metalness: 0.1,
          roughness: 0.1,
          transmission: 0.4,
          thickness: 0.15,
          ior: 1.5,
          transparent: true,
          opacity: 1,
          side: THREE.DoubleSide,
        });

        return;
      }
    });

    return cloned;
  }, [scene, waterNormals]);

  // ==================================================
  // WATER ANIMATION
  // ==================================================

  useFrame((_, delta) => {
    if (waterNormals) {
      waterNormals.offset.x += delta * 0.03;
      waterNormals.offset.y += delta * 0.02;
    }
  });

  return (
    <>
      {/* ==================================================
          SKY
          ================================================== */}

      <Sky
        distance={450000}
        sunPosition={[50, 12, -80]}
        turbidity={0.8}
        rayleigh={2}
        mieCoefficient={0.003}
        mieDirectionalG={0.75}
      />

      {/* ==================================================
          CLOUDS
          ================================================== */}

      <Clouds limit={200} material={THREE.MeshBasicMaterial}>
        <Cloud
          position={[30, 30, -70]}
          speed={0.08}
          opacity={0.16}
          bounds={[320, 15, 20]}
          volume={10}
          seed={2}
          color="#ffffff"
          scale={4}
        />

        <Cloud
          position={[30, 28, -60]}
          speed={0.07}
          opacity={0.18}
          bounds={[150, 10, 10]}
          color="#f4f4f4"
          scale={7}
        />
      </Clouds>

      {/* ==================================================
          PAVILION
          ================================================== */}

      <primitive object={pavilionScene} />
    </>
  );
}

export default Pavilion;
