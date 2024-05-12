import { ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "../routes/HomePage";
import LoginPage from "../routes/LoginPage";
import { useAppContext } from "./AppContext";
import { themeLight } from "./theme";

function App() {
	const appContext = useAppContext();
	return (
		<div>
			<ThemeProvider theme={themeLight}>
				<GoogleOAuthProvider clientId="837286351398-mfao186rjimfj94783u34bu0ubnuuf63.apps.googleusercontent.com">
					<Router>
						<Routes>
							{appContext.auth === undefined ? (
								<Route path="*" element={<LoginPage />} />
							) : (
								<>
									<Route path="" element={<LoginPage />} />
									<Route path="*" element={<HomePage />} />
								</>
							)}
						</Routes>
					</Router>
				</GoogleOAuthProvider>
			</ThemeProvider>
		</div>
	);
}

export default App;
