import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { pwaManager } from "./lib/pwa.ts";

// Initialize PWA functionality
pwaManager;

createRoot(document.getElementById("root")!).render(<App />);
