import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Font Awesome Setup
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Prevent Font Awesome from adding its CSS automatically since we're importing it
config.autoAddCss = false;

library.add(fas, fab, far);

createRoot(document.getElementById("root")!).render(<App />);
