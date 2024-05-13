import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { AppContextProvider } from "./app/AppContext";
import * as serviceWorkerRegistration from "./app/serviceWorkerRegistration";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<AppContextProvider>
			<App />
		</AppContextProvider>
	</React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
