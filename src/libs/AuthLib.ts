import { NavigateFunction } from "react-router-dom";
import { auth as fbAuth } from "../libs/FirebaseLib";
import { Auth } from "../model/user/authModel";

export const signOut = async (navigate: NavigateFunction, auth: Auth) => {
	try {
		await fbAuth.signOut();
		auth.setUser(undefined);
		console.log("User logged out");
		navigate("/");
	} catch (err) {
		console.error("Error logging out:", err);
	}
};
