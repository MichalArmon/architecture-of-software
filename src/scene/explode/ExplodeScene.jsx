import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import Pavilion from "../Pavilion";
import Ground from "../Ground";
import SceneEnvironment from "../SceneEnvironment";
import SurroundingTrees from "../SurroundingTrees";
import { CAMERA_POINTS, CURRENT_CAMERA } from "../cameraPoints";

function ExplodeScene() {
  const cameraPoint = CAMERA_POINTS[CURRENT_CAMERA];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Canvas
        shadows
        camera={{
          position: cameraPoint.position,
          fov: 38,
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.95,
        }}
      >
        <SceneEnvironment />

        <Ground />

        <SurroundingTrees opacity={0} />

        <Pavilion />

        <OrbitControls target={cameraPoint.target} />
      </Canvas>
    </div>
  );
}

export default ExplodeScene;
