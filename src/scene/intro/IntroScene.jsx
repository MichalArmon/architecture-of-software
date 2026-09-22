import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import Pavilion from "../Pavilion";
import Ground from "../Ground";
import SceneEnvironment from "../SceneEnvironment";
import { CAMERA_POINTS, CURRENT_CAMERA } from "../cameraPoints";
import SurroundingTrees from "../SurroundingTrees";

function IntroScene() {
  const cameraPoint = CAMERA_POINTS[CURRENT_CAMERA];

  const cameraRef = useRef(null);
  const controlsRef = useRef(null);

  const [views, setViews] = useState([]);
  const [currentView, setCurrentView] = useState(null);

  const saveView = () => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    if (!camera || !controls) return;

    const newView = {
      id: Date.now(),
      name: `View ${views.length + 1}`,
      position: camera.position.toArray(),
      target: controls.target.toArray(),
      fov: camera.fov,
    };

    setViews((prev) => [...prev, newView]);

    console.log("Saved view:", newView);
  };

  const goToView = (view) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    if (!camera || !controls) return;

    camera.position.set(view.position[0], view.position[1], view.position[2]);

    camera.fov = view.fov;
    camera.updateProjectionMatrix();

    controls.target.set(view.target[0], view.target[1], view.target[2]);

    controls.update();

    setCurrentView(view.id);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <Canvas
        shadows
        camera={{
          position: cameraPoint.position,
          fov: 38,
        }}
        onCreated={({ camera }) => {
          cameraRef.current = camera;
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

        <OrbitControls ref={controlsRef} target={cameraPoint.target} />
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          width: 180,
          background: "rgba(255,255,255,0.9)",
          padding: 12,
          borderRadius: 8,
          zIndex: 100,
        }}
      >
        <button
          onClick={saveView}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: 10,
            cursor: "pointer",
          }}
        >
          Save View
        </button>

        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => goToView(view)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: 6,
              cursor: "pointer",
              fontWeight: currentView === view.id ? "bold" : "normal",
            }}
          >
            {view.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default IntroScene;
