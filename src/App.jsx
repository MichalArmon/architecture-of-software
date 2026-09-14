import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import Pavilion from "./scene/Pavilion";
import Trees from "./scene/Trees";
import Ground from "./scene/Ground";
import SceneEnvironment from "./scene/SceneEnvironment";

import { CAMERA_POINTS, CURRENT_CAMERA } from "./scene/cameraPoints";
import SurroundingTrees from "./scene/SurroundingTrees";

function App() {
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

        {/* <Trees /> */}

        <Ground />
        <SurroundingTrees />

        <Pavilion />

        <OrbitControls
          target={cameraPoint.target}
          onEnd={(e) => {
            console.log("camera position:", e.target.object.position.toArray());

            console.log("target:", e.target.target.toArray());
          }}
        />
      </Canvas>
    </div>
  );
}

export default App;
