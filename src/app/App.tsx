import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { autoLogin } from "../libs/AuthLib";
import { fbAuth } from "../libs/FirebaseLib";
import AlliancesPage from "../routes/AlliancesPage";
import DashboardPage from "../routes/DashboardPage";
import ListPage from "../routes/ListPage";
import ListsPage from "../routes/ListsPage";
import LoginPage from "../routes/LoginPage";
import NewListPage from "../routes/NewListPage";
import PasswordlessLoginPage from "../routes/PasswordlessLoginPage";
import ProfilePage from "../routes/ProfilePage";
import SharePage from "../routes/SharePage";
import SignUpPage from "../routes/SignUpPage";
import VerifyEmailPage from "../routes/VerifyEmailPage";
import { useAppContext } from "./AppContext";

function App() {
	const appContextData = useAppContext();
	const [user] = useAuthState(fbAuth);
	const authenticated = user?.emailVerified;

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
				{authenticated ? (
					<>
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/lists" element={<ListsPage />} />
						<Route path="/newlist" element={<NewListPage />} />
						<Route path="/:id/list" element={<ListPage />} />
						<Route path="/:id/dashboard" element={<DashboardPage />} />
						<Route path="/:id/alliances" element={<AlliancesPage />} />
						<Route path="/:id/share" element={<SharePage />} />
						<Route path="*" element={<Navigate to="/lists" />} />
					</>
				) : (
					<>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignUpPage />} />
						<Route path="/verifyemail" element={<VerifyEmailPage />} />
						<Route path="/passwordlesslogin" element={<PasswordlessLoginPage />} />
						<Route path="*" element={<LoginPage />} />
					</>
				)}
			</Routes>
		</Router>
	);
}

export default App;
