import {
	User,
	isSignInWithEmailLink,
	sendSignInLinkToEmail,
	signInWithEmailLink,
} from "firebase/auth";
import { getAppBaseUrl } from "../app/AppUtils";
import { auth as fbAuth } from "../libs/FirebaseLib";
import { Auth } from "../model/user/authModel";

export const signOut = async (auth: Auth) => {
	try {
		await fbAuth.signOut();
		auth.setUser(undefined);
		console.log("Successfully logged out");
	} catch (err) {
		console.error("Error logging out:", err);
	}
};

export const passwordlessLogin = async (email: string) => {
	const baseUrl = getAppBaseUrl();
	try {
		await sendSignInLinkToEmail(fbAuth, email, {
			url: baseUrl + "login",
			handleCodeInApp: true,
		});
		localStorage.setItem("email", email);
		return {};
	} catch (error) {
		throw new Error(processFirebaseAuthError(error as Error));
	}
};

const processFirebaseAuthError = (error: Error) => {
	switch (error.message) {
		case "Firebase: Error (auth/user-disabled).":
			return "Your account is disabled. Please contact support for more information.";
		case "Firebase: Error (auth/invalid-action-code).":
			return "Your login link is invalid. Return to the login page to reenter your email and generate a new link.";
		case "Missing cached email":
			return "The email used to login in was not generated from this device. Return to the login page to reenter your email and generate a new link.";
		default:
			return "Unknown Error: " + error.message;
	}
};

export const autoLogin = async (user: User | null | undefined, auth: Auth) => {
	if (user) {
		auth.setUser(user);
		return "success";
	}
	if (isSignInWithEmailLink(fbAuth, window.location.href)) {
		try {
			const emailFromStorage = localStorage.getItem("email");
			if (!emailFromStorage) {
				throw new Error("Missing cached email");
			}
			await signInWithEmailLink(fbAuth, emailFromStorage!, window.location.href);
			return {};
		} catch (error) {
			throw new Error(processFirebaseAuthError(error as Error));
		}
	}
	return "noLogin";
};

export const getAuthEmail = () => {
	return localStorage.getItem("email");
};
