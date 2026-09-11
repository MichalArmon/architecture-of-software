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

  treesView: {
    position: [5.588350011680717, 7.2798803155386445, -1.2578590922610502],
    target: [18.461529259953497, 6.184742491068559, -18.755368755432176],
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

const CURRENT_CAMERA = "treesView";

function Pavilion() {
  const { scene } = useGLTF("/models/pavilion.glb");

  return <primitive object={scene} />;
}

function Tree({ position, scale = 0.5, rotation = [0, 0, 0] }) {
  const { scene } = useGLTF("/models/realistic_tree.glb");

  return (
    <primitive
      object={scene.clone()}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
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
        <Environment preset="park" background />

        <ambientLight intensity={1} />

        <directionalLight position={[5, 10, 5]} intensity={2} />

        <Tree position={[25, 0, -45]} scale={0.45} />

        <Tree position={[35, 0, -40]} scale={0.6} rotation={[0, 1, 0]} />

        <Tree position={[50, 0, -38]} scale={0.8} rotation={[0, 2, 0]} />

        <Tree position={[70, 0, -30]} scale={0.75} rotation={[0, 0.5, 0]} />

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
