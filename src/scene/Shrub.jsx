import { Clone, useGLTF } from "@react-three/drei";
import { useMemo } from "react";

function Shrub({ position, scale = 1, rotationY = 0 }) {
  const { scene } = useGLTF("/models/shrub.glb");

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Clone object={scene} />
    </group>
  );
}

function ShrubsAroundTree({ treePosition, index }) {
  const shrubs = useMemo(() => {
    // מספר קבוע שונה לכל עץ, כדי שהפיזור לא ישתנה בכל render
    const seed = index * 17.31;

    const random = (n) => {
      const x = Math.sin(seed + n * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };

    const amount = 4 + Math.floor(random(1) * 3); // 4–6 שיחים

    return Array.from({ length: amount }, (_, i) => {
      const angle = (i / amount) * Math.PI * 2 + random(i + 10) * 0.7;

      const distance = 0.8 + random(i + 20) * 1.4;

      const x = treePosition[0] + Math.cos(angle) * distance;
      const z = treePosition[2] + Math.sin(angle) * distance;

      return {
        position: [x, treePosition[1], z],

        scale: 0.55 + random(i + 30) * 0.75,

        rotationY: random(i + 40) * Math.PI * 2,
      };
    });
  }, [treePosition, index]);

  return (
    <>
      {shrubs.map((shrub, i) => (
        <Shrub
          key={i}
          position={shrub.position}
          scale={shrub.scale}
          rotationY={shrub.rotationY}
        />
      ))}
    </>
  );
}

export default ShrubsAroundTree;
