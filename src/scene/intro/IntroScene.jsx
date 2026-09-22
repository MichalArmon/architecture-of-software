import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Pavilion from "../Pavilion";
import Ground from "../Ground";
import SceneEnvironment from "../SceneEnvironment";
import { CAMERA_POINTS, CURRENT_CAMERA } from "../cameraPoints";
import SurroundingTrees from "../SurroundingTrees";
import ViewsButton from "../../config/ViewsButton";

function IntroScene() {
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
        <ViewsButton />
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

export default IntroScene;
