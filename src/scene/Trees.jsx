import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

const VEGETATION_Y_OFFSET = -1.5;

const TREES = [
  // LEFT SIDE
  // {
  //   type: "frene",
  //   position: [12, 0, -54],
  //   scale: 0.46,
  //   rotation: 0.3,
  //   opacity: 1,
  // },
  // {
  //   type: "frene",
  //   position: [19, 0, -47],
  //   scale: 0.68,
  //   rotation: 1.1,
  //   opacity: 1,
  // },
  {
    type: "frene",
    position: [26, 0, -58],
    scale: 1.2,
    rotation: 2.2,
    opacity: 1,
  },
  {
    type: "birch",
    position: [26, 0, -59],
    scale: 1,
    rotation: 2.2,
    opacity: 1,
  },

  {
    type: "frene",
    position: [33, 0, -52],
    scale: 0.72,
    rotation: 0.7,
    opacity: 1,
  },

  // LEFT BACK
  {
    type: "frene",
    position: [18, 0, -66],
    scale: 0.42,
    rotation: 2.8,
    opacity: 1,
  },
  {
    type: "frene",
    position: [30, 0, -70],
    scale: 0.48,
    rotation: 1.6,
    opacity: 1,
  },

  // CENTER
  // {
  //   type: "frene",
  //   position: [39, 0, -51],
  //   scale: 0.6,
  //   rotation: 1.6,
  //   opacity: 1,
  // },
  {
    type: "frene",
    position: [46, 0, -63],
    scale: 0.45,
    rotation: 2.4,
    opacity: 1,
  },

  // problematic
  {
    type: "frene",
    position: [60, 0, -44],
    scale: 0.72,
    rotation: 0.2,
    opacity: 1,
  },

  {
    type: "frene",
    position: [56, 0, -56],
    scale: 0.52,
    rotation: 1.4,
    opacity: 1,
  },
  {
    type: "frene",
    position: [61, 0, -48],
    scale: 0.64,
    rotation: 2.1,
    opacity: 1,
  },

  // CENTER BACK
  // {
  //   type: "frene",
  //   position: [55, 0, -70],
  //   scale: 0.45,
  //   rotation: 0.8,
  //   opacity: 1,
  // },
  // {
  //   type: "frene",
  //   position: [66, 0, -66],
  //   scale: 0.5,
  //   rotation: 2.6,
  //   opacity: 1,
  // },

  // RIGHT - SECOND LAYER
  {
    type: "frene",
    position: [101, 0, -33],
    scale: 0.74,
    rotation: 0.4,
    opacity: 1,
  },
  {
    type: "frene",
    position: [106, 0, -42],
    scale: 0.9,
    rotation: 1.9,
    opacity: 1,
  },
  {
    type: "frene",
    position: [111, 0, -35],
    scale: 0.82,
    rotation: 2.8,
    opacity: 1,
  },
  {
    type: "frene",
    position: [116, 0, -40],
    scale: 1.5,
    rotation: 0.8,
    opacity: 1,
  },
  {
    type: "birch",
    position: [116, -5, -25],
    scale: 1.5,
    rotation: 0.8,
    opacity: 1,
  },

  // RIGHT - first LAYER
  {
    type: "birch",
    position: [80, -2, -25],
    scale: 1.2,
    rotation: 0.8,
    opacity: 1,
  },
  {
    type: "frene",
    position: [80, 0, -13],
    scale: 0.74,
    rotation: 0.4,
    opacity: 1,
  },

  {
    type: "frene",
    position: [90, 0, -15],
    scale: 1.5,
    rotation: 0.8,
    opacity: 1,
  },

  // FAR RIGHT
  {
    type: "frene",
    position: [122, 0, -36],
    scale: 0.8,
    rotation: 1.7,
    opacity: 1,
  },
  {
    type: "frene",
    position: [128, 0, -47],
    scale: 0.92,
    rotation: 2.3,
    opacity: 1,
  },
  {
    type: "frene",
    position: [134, 0, -39],
    scale: 0.84,
    rotation: 0.5,
    opacity: 1,
  },
  {
    type: "frene",
    position: [140, 0, -49],
    scale: 0.95,
    rotation: 1.4,
    opacity: 1,
  },

  // RIGHT BACK LAYER
  {
    type: "frene",
    position: [88, 0, -62],
    scale: 0.5,
    rotation: 0.3,
    opacity: 1,
  },
  {
    type: "frene",
    position: [98, 0, -68],
    scale: 0.58,
    rotation: 1.4,
    opacity: 1,
  },
  {
    type: "frene",
    position: [108, 0, -60],
    scale: 0.62,
    rotation: 2.1,
    opacity: 1,
  },
  {
    type: "frene",
    position: [118, 0, -66],
    scale: 0.55,
    rotation: 0.9,
    opacity: 1,
  },
  {
    type: "frene",
    position: [130, 0, -64],
    scale: 0.62,
    rotation: 2.5,
    opacity: 1,
  },
];

function Tree({
  type = "frene",
  position,
  scale = 0.5,
  rotation = [0, 0, 0],
  opacity = 1,
}) {
  const frene = useGLTF("/models/trees/blender.glb");
  const birch = useGLTF("/models/trees/Birch.glb");

  const sourceScene = type === "birch" ? birch.scene : frene.scene;

  const scene = useMemo(() => {
    const clone = sourceScene.clone(true);

    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.transparent = true;
        child.material.opacity = opacity;
        child.material.depthWrite = opacity === 1;
        child.material.needsUpdate = true;
      }
    });

    return clone;
  }, [sourceScene, opacity]);

  return (
    <primitive
      object={scene}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
}

function Shrub({ position, scale, rotation }) {
  const { scene } = useGLTF("/models/shrubs/shrub.glb");

  return (
    <primitive
      object={scene.clone()}
      position={position}
      scale={scale}
      rotation={[0, rotation, 0]}
    />
  );
}

function ShrubsAroundTree({ tree, index }) {
  const shrubs = useMemo(() => {
    const seed = index * 13.71;

    const random = (n) => {
      const x = Math.sin(seed + n * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };

    const amount = 8 + Math.floor(random(1) * 3);

    return Array.from({ length: amount }, (_, i) => {
      const angle = (i / amount) * Math.PI * 2 + random(i + 10) * 0.8;

      const distance = 0.8 + random(i + 20) * 2.2;

      const x = tree.position[0] + Math.cos(angle) * distance;

      const z = tree.position[2] + Math.sin(angle) * distance;

      const shrubScale = 1.2 + random(i + 30) * 1.8;

      const rotation = random(i + 40) * Math.PI * 2;

      return {
        position: [x, 0, z],
        scale: shrubScale,
        rotation,
      };
    });
  }, [tree, index]);

  return (
    <>
      {shrubs.map((shrub, shrubIndex) => (
        <Shrub
          key={shrubIndex}
          position={shrub.position}
          scale={shrub.scale}
          rotation={shrub.rotation}
        />
      ))}
    </>
  );
}

function Trees() {
  return (
    <group position={[0, VEGETATION_Y_OFFSET, 0]}>
      {TREES.map((tree, index) => (
        <group key={index}>
          <Tree
            type={tree.type}
            position={tree.position}
            scale={tree.scale}
            rotation={[0, tree.rotation, 0]}
            opacity={tree.opacity ?? 1}
          />

          <ShrubsAroundTree tree={tree} index={index} />
        </group>
      ))}
    </group>
  );
}

useGLTF.preload("/models/trees/blender.glb");
useGLTF.preload("/models/trees/Birch.glb");
useGLTF.preload("/models/shrubs/shrub.glb");

export default Trees;
