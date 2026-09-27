import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ChatProvider } from "./context/ChatContext";

import "./styles/global.css";
import "./styles/layout.css";
import "./styles/chat.css";
import "./styles/results.css";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <ChatProvider>
      <App />
    </ChatProvider>
  </React.StrictMode>
);