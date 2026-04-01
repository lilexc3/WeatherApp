import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Weathercard from "./weathercard";
import Statblock from "./statblock";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
