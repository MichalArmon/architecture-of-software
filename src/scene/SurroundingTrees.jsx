import { useGLTF } from "@react-three/drei";

function SurroundingTrees() {
  const { scene } = useGLTF("/models/trees/surrounding-trees.glb");

  return <primitive object={scene} />;
}

useGLTF.preload("/models/trees/surrounding-trees.glb");

export default SurroundingTrees;
