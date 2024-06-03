import { ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { autoLogin } from "../libs/AuthLib";
import { fbAuth } from "../libs/FirebaseLib";
import AboutPage from "../routes/AboutPage";
import LoginPage from "../routes/LoginPage";
import PasswordlessLoginPage from "../routes/PasswordlessLoginPage";
import PickListPage from "../routes/PickListPage";
import ProfilePage from "../routes/ProfilePage";
import SignUpPage from "../routes/SignUpPage";
import VerifyEmailPage from "../routes/VerifyEmailPage";
import { useAppContext } from "./AppContext";
import { themeLight } from "./theme";

function App() {
	const appContextData = useAppContext();
	const [user] = useAuthState(fbAuth);

	useEffect(() => {
		const authenticate = async () => {
			try {
				await autoLogin(user, appContextData);
			} catch (error) {
				// Do nothing
			}
		};
		void authenticate();
	}, [user]);

	return (
		<ThemeProvider theme={themeLight}>
			<Router>
				<Routes>
					{appContextData.user ? (
						<>
							<Route path="/about" element={<AboutPage />} />
							<Route path="/profile" element={<ProfilePage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/signup" element={<SignUpPage />} />
							<Route path="/verifyemail" element={<VerifyEmailPage />} />
							<Route path="*" element={<PickListPage />} />
						</>
					) : (
						<>
							<Route path="/login" element={<LoginPage />} />
							<Route path="/signup" element={<SignUpPage />} />
							<Route path="/verifyemail" element={<VerifyEmailPage />} />
							<Route path="/passwordlesslogin" element={<PasswordlessLoginPage />} />
							<Route path="/about" element={<AboutPage />} />
							<Route path="*" element={<LoginPage />} />
						</>
					)}
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
