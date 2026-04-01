import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Weathercard from "./weathercard";
import Statblock from "./statblock";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Weathercard />
  </StrictMode>,
);
