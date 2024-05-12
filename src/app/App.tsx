import { ThemeProvider } from "@mui/material";
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
			</ThemeProvider>
		</div>
	);
}

export default App;
