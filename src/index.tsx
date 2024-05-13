import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { AppContextProvider } from "./app/AppContext";
import * as serviceWorkerRegistration from "./app/serviceWorkerRegistration";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<GoogleOAuthProvider clientId="837286351398-mfao186rjimfj94783u34bu0ubnuuf63.apps.googleusercontent.com">
		<React.StrictMode>
			<AppContextProvider>
				<App />
			</AppContextProvider>
		</React.StrictMode>
	</GoogleOAuthProvider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
