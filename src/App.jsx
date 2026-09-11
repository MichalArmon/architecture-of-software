import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

const CAMERA_POINTS = {
  hero: {
    position: [58.65, 4.12, 1.72],
    target: [40.82, 3.5, -23.81],
  },

  side: {
    position: [30, 8, 20],
    target: [40, 3, -20],
  },

  closeUp: {
    position: [48, 5, -10],
    target: [42, 4, -22],
  },

  pool: {
    position: [52, 3, -5],
    target: [39, 1.5, -24],
  },

  plan: {
    position: [40, 65, -20],
    target: [40, 0, -20],
  },

  exploded: {
    position: [55, 25, 5],
    target: [40, 10, -20],
  },
};

const CURRENT_CAMERA = "hero";

function Pavilion() {
  const { scene } = useGLTF("/models/pavilion.glb");

  return <primitive object={scene} />;
}

function App() {
  const cameraPoint = CAMERA_POINTS[CURRENT_CAMERA];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{
          position: cameraPoint.position,
          fov: 45,
        }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 10, 5]} intensity={2} />

        <Pavilion />

        <Environment preset="city" />

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
