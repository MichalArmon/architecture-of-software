function Ground() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[70, -0.1, -60]}
      receiveShadow
    >
      <planeGeometry args={[220, 180]} />

      <meshStandardMaterial color="#89937a" roughness={1} metalness={0} />
    </mesh>
  );
}

export default Ground;
