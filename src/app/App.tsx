import { ThemeProvider } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { auth } from "../libs/FirebaseLib";
import AboutPage from "../routes/AboutPage";
import HomePage from "../routes/HomePage";
import LoginPage from "../routes/LoginPage";
import ProfilePage from "../routes/ProfilePage";
import WelcomePage from "../routes/WelcomePage";
import { themeLight } from "./theme";

function App() {
	const [user] = useAuthState(auth);
	return (
		<ThemeProvider theme={themeLight}>
			<Router>
				<Routes>
					{user ? (
						<>
							<Route path="/about" element={<AboutPage />} />
							<Route path="/profile" element={<ProfilePage />} />
							<Route path="*" element={<HomePage />} />
						</>
					) : (
						<>
							<Route path="/login" element={<LoginPage />} />
							<Route path="/about" element={<AboutPage />} />
							<Route path="*" element={<WelcomePage />} />
						</>
					)}
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
