import { Environment, Sky } from "@react-three/drei";

import {
  EffectComposer,
  Bloom,
  Vignette,
  SSAO,
} from "@react-three/postprocessing";

function SceneEnvironment() {
  return (
    <>
      <color attach="background" args={["#d8e4e9"]} />

      <fog attach="fog" args={["#d8e4e9", 85, 190]} />

      <Sky
        sunPosition={[70, 18, 45]}
        turbidity={5}
        rayleigh={1.4}
        mieCoefficient={0.004}
        mieDirectionalG={0.8}
      />

      <Environment preset="park" environmentIntensity={1} />

      <ambientLight intensity={0.45} />

      <directionalLight
        position={[20, 28, 12]}
        intensity={2.4}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={160}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
        shadow-bias={-0.0002}
      />

      <directionalLight
        position={[-8, 7, -3]}
        intensity={0.8}
        color="#fff7ed"
      />

      <directionalLight
        position={[25, 8, -35]}
        intensity={0.35}
        color="#eef5ff"
      />

      <EffectComposer>
        <SSAO samples={20} radius={0.12} intensity={0.75} />

        <Bloom
          intensity={0.04}
          luminanceThreshold={1.2}
          luminanceSmoothing={0.85}
        />

        <Vignette eskil={false} offset={0.18} darkness={0.12} />
      </EffectComposer>
    </>
  );
}

export default SceneEnvironment;
