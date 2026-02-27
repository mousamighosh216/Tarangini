import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="Client ID
891885577891-vs0e44f3l8ut3hj7tu0f1q030cpbjanq.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);