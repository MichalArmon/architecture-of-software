import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

function ViewsButton() {
  const { camera, controls } = useThree();

  const saveView = async () => {
    const newView = {
      name: `view-${Date.now()}`,

      position: [
        Number(camera.position.x.toFixed(3)),
        Number(camera.position.y.toFixed(3)),
        Number(camera.position.z.toFixed(3)),
      ],

      target: controls
        ? [
            Number(controls.target.x.toFixed(3)),
            Number(controls.target.y.toFixed(3)),
            Number(controls.target.z.toFixed(3)),
          ]
        : [0, 0, 0],

      fov: camera.fov,
    };

    const response = await fetch("/api/camera-views", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newView),
    });

    const data = await response.json();

    console.log("View saved:", data);
  };

  return (
    <Html fullscreen>
      <button
        onClick={saveView}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: "10px 16px",
          zIndex: 9999,
          cursor: "pointer",
        }}
      >
        Save View
      </button>
    </Html>
  );
}

export default ViewsButton;
