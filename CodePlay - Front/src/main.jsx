import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css"; /* importa index.css via global.css */


console.log('[main] starting app');
createRoot(document.getElementById("root")).render(<App />);