import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { autoLogin } from "../libs/AuthLib";
import { fbAuth } from "../libs/FirebaseLib";
import LoginPage from "../routes/LoginPage";
import PasswordlessLoginPage from "../routes/PasswordlessLoginPage";
import PickListPage from "../routes/PickListPage";
import ProfilePage from "../routes/ProfilePage";
import SignUpPage from "../routes/SignUpPage";
import VerifyEmailPage from "../routes/VerifyEmailPage";
import { useAppContext } from "./AppContext";

function App() {
	const appContextData = useAppContext();
	const [user] = useAuthState(fbAuth);

	useEffect(() => {
		const authenticate = async () => {
			try {
				await user?.reload();
				await autoLogin(user, appContextData);
			} catch (error) {
				// Do nothing
				console.log("Auto Login Error:", error);
			}
		};
		void authenticate();
	}, [user]);

	return (
		<Router>
			<Routes>
				{appContextData.user ? (
					<>
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
						<Route path="*" element={<Navigate to="/login" />} />
					</>
				)}
			</Routes>
		</Router>
	);
}

export default App;
