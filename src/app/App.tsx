import { ThemeProvider } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { auth } from "../libs/FirebaseLib";
import ComingSoonPage from "../routes/ComingSoonPage";
import { themeLight } from "./theme";

function App() {
	const [user, loading, error] = useAuthState(auth);
	console.log("U:", user, "L", loading, "E", error);
	return (
		<ThemeProvider theme={themeLight}>
			<Router>
				<Routes>
					{user ? (
						<>
							<Route path="*" element={<ComingSoonPage />} />
						</>
					) : (
						<>
							<Route path="*" element={<ComingSoonPage />} />
						</>
					)}
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
