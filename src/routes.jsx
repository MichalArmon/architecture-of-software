import { createBrowserRouter } from "react-router-dom";

import IntroScene from "../scene/intro/IntroScene";
import ExplodeScene from "../scene/explode/ExplodeScene";
import PlanScene from "../scene/plan/PlanScene";
import LogicScene from "../scene/logic/LogicScene";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IntroScene />,
  },
  {
    path: "/explode",
    element: <ExplodeScene />,
  },
  {
    path: "/plan",
    element: <PlanScene />,
  },
  {
    path: "/logic",
    element: <LogicScene />,
  },
]);

export default router;
