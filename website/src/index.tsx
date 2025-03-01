import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import reportWebVitals from "./reportWebVitals";
import AppTest from "./components/AppTest";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
	<React.StrictMode>
		<AppTest />
	</React.StrictMode>
);

reportWebVitals();
