import * as THREE from "three";
import { EXPLODE_CONFIG } from "./explodeConfig";

export function applyExplode(child, progress) {
  const offset = EXPLODE_CONFIG[child.name];

  if (!offset) return;

  const [x, y, z] = offset;

  child.position.x = THREE.MathUtils.lerp(
    child.userData.originalPosition.x,
    child.userData.originalPosition.x + x,
    progress,
  );

  child.position.y = THREE.MathUtils.lerp(
    child.userData.originalPosition.y,
    child.userData.originalPosition.y + y,
    progress,
  );

  child.position.z = THREE.MathUtils.lerp(
    child.userData.originalPosition.z,
    child.userData.originalPosition.z + z,
    progress,
  );
}
