import { useGLTF } from "@react-three/drei";

const TREES = [
  // LEFT SIDE
  { position: [12, 0, -54], scale: 0.46, rotation: 0.3 },
  { position: [19, 0, -47], scale: 0.68, rotation: 1.1 },
  { position: [26, 0, -58], scale: 0.5, rotation: 2.2 },
  { position: [33, 0, -52], scale: 0.72, rotation: 0.7 },

  // LEFT BACK
  { position: [18, 0, -66], scale: 0.42, rotation: 2.8 },
  { position: [30, 0, -70], scale: 0.48, rotation: 1.6 },

  // CENTER
  { position: [39, 0, -51], scale: 0.6, rotation: 1.6 },
  { position: [46, 0, -63], scale: 0.45, rotation: 2.4 },

  // problematic
  { position: [60, 0, -44], scale: 0.72, rotation: 0.2 },

  { position: [56, 0, -56], scale: 0.52, rotation: 1.4 },
  { position: [61, 0, -48], scale: 0.64, rotation: 2.1 },

  // CENTER BACK
  { position: [55, 0, -70], scale: 0.45, rotation: 0.8 },
  { position: [66, 0, -66], scale: 0.5, rotation: 2.6 },

  // RIGHT - SECOND LAYER
  { position: [101, 0, -33], scale: 0.74, rotation: 0.4 },
  { position: [106, 0, -42], scale: 0.9, rotation: 1.9 },
  { position: [111, 0, -35], scale: 0.82, rotation: 2.8 },
  { position: [116, 0, -40], scale: 2.0, rotation: 0.8 },

  // FAR RIGHT
  { position: [122, 0, -36], scale: 0.8, rotation: 1.7 },
  { position: [128, 0, -47], scale: 0.92, rotation: 2.3 },
  { position: [134, 0, -39], scale: 0.84, rotation: 0.5 },
  { position: [140, 0, -49], scale: 0.95, rotation: 1.4 },

  // RIGHT BACK LAYER
  { position: [88, 0, -62], scale: 0.5, rotation: 0.3 },
  { position: [98, 0, -68], scale: 0.58, rotation: 1.4 },
  { position: [108, 0, -60], scale: 0.62, rotation: 2.1 },
  { position: [118, 0, -66], scale: 0.55, rotation: 0.9 },
  { position: [130, 0, -64], scale: 0.62, rotation: 2.5 },
  { position: [142, 0, -70], scale: 0.58, rotation: 1.1 },
];

function Tree({ position, scale = 0.5, rotation = [0, 0, 0] }) {
  const { scene } = useGLTF("/models/trees/frene/glt/glt/blender.glb");

  return (
    <primitive
      object={scene.clone()}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
}

function Trees() {
  return (
    <>
      {TREES.map((tree, index) => (
        <Tree
          key={index}
          position={tree.position}
          scale={tree.scale}
          rotation={[0, tree.rotation, 0]}
        />
      ))}
    </>
  );
}

export default Trees;
