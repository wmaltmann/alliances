import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { AppContextProvider } from "./app/AppContext";
import * as serviceWorkerRegistration from "./app/serviceWorkerRegistration";
import { themeDark } from "./app/theme";
import AlertsManager from "./components/common/AlertManager";
import StageFlag from "./components/common/StageFlag";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<AppContextProvider>
			<ThemeProvider theme={themeDark}>
				<CssBaseline />
				<AlertsManager />
				<StageFlag />
				<App />
			</ThemeProvider>
		</AppContextProvider>
	</React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
