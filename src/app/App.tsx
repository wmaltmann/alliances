import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { autoLogin } from "../libs/AuthLib";
import { fbAuth } from "../libs/FirebaseLib";
import { listenToPicklist } from "../model/picklist/picklist.Manager";
import AddTeamPage from "../routes/list/AddTeamPage";
import AlliancesPage from "../routes/list/AlliancesPage";
import ListPage from "../routes/list/ListPage";
import SelectionPage from "../routes/list/SelectionPage";
import SharePage from "../routes/list/SharePage";
import ListsPage from "../routes/lists/ListsPage";
import NewListPage from "../routes/lists/NewListPage";
import ProfilePage from "../routes/lists/ProfilePage";
import LoginPage from "../routes/login/LoginPage";
import PasswordlessLoginPage from "../routes/login/PasswordlessLoginPage";
import SignUpPage from "../routes/login/SignUpPage";
import VerifyEmailPage from "../routes/login/VerifyEmailPage";
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

	useEffect(() => {
		const unsubscribe = listenToPicklist(
			appContextData.lists.activePicklistId,
			appContextData.lists.setActivePicklist,
			appContextData.user?.id,
		);

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [appContextData.lists.activePicklistId, appContextData?.user?.id]);

	return (
		<Router>
			<Routes>
				{authenticated ? (
					<>
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/lists" element={<ListsPage />} />
						<Route path="/newlist" element={<NewListPage />} />
						<Route path="/:id/list" element={<ListPage />} />
						<Route path="/:id/selection" element={<SelectionPage />} />
						<Route path="/:id/alliances" element={<AlliancesPage />} />
						<Route path="/:id/share" element={<SharePage />} />
						<Route path="/:id/addteam" element={<AddTeamPage />} />
						<Route path="*" element={<ListsPage />} />
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
