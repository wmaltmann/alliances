import { sendSignInLinkToEmail } from "firebase/auth";
import { NavigateFunction } from "react-router-dom";
import { getAppBaseUrl } from "../app/AppUtils";
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

export const PasswordlessLogin = async (email: string) => {
	const baseUrl = getAppBaseUrl();
	try {
		await sendSignInLinkToEmail(fbAuth, email, {
			url: baseUrl + "login",
			handleCodeInApp: true,
		});
		localStorage.setItem("email", email);
		return {};
	} catch (error) {
		throw new Error(ProcessFirebaseAuthError(error as Error));
	}
};

const ProcessFirebaseAuthError = (error: Error) => {
	switch (error.message) {
		case "Firebase: Error (auth/user-disabled).":
			return "Your account is disabled. Please contact support for more information.";
		default:
			return "Unknown Error: " + error.message;
	}
};
