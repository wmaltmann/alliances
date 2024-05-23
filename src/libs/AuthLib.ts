import {
	User,
	isSignInWithEmailLink,
	sendSignInLinkToEmail,
	signInWithEmailAndPassword,
	signInWithEmailLink,
} from "firebase/auth";
import { AppContextData } from "../app/AppContext";
import { getAppBaseUrl } from "../app/AppUtils";
import { fbAuth } from "../libs/FirebaseLib";
import { loadOrCreateUser } from "../model/user/user.Manager";

export const signOut = async (appContext: AppContextData) => {
	try {
		await fbAuth.signOut();
		appContext.auth.setFbUser(undefined);
		appContext.setUser(undefined);
		console.log("Successful logout");
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

export const autoLogin = async (user: User | null | undefined, appContext: AppContextData) => {
	if (user) {
		appContext.auth.setFbUser(user);
		const newUser = await loadOrCreateUser(user);
		appContext.setUser(newUser);
		console.log("Successful auto login");
		return true;
	}
	console.log("Unsuccessful auto login");
	return false;
};

export const loginWithLink = async (appContext: AppContextData) => {
	if (isSignInWithEmailLink(fbAuth, window.location.href)) {
		try {
			const emailFromStorage = localStorage.getItem("email");
			if (!emailFromStorage) {
				throw new Error("Missing cached email");
			}
			const response = await signInWithEmailLink(
				fbAuth,
				emailFromStorage!,
				window.location.href,
			);
			const newUser = await loadOrCreateUser(response.user);
			appContext.setUser(newUser);
			console.log("Successful link login");
			return true;
		} catch (error) {
			throw new Error(processFirebaseAuthError(error as Error));
		}
	}
	console.log("No login link");
	return false;
};

export const loginWithPassword = async (
	email: string,
	password: string,
	appContext: AppContextData,
) => {
	const response = await signInWithEmailAndPassword(fbAuth, email, password);
	const newUser = await loadOrCreateUser(response.user);
	appContext.setUser(newUser);
	console.log("Successful password login");
	return true;
};

export const getAuthEmail = () => {
	return localStorage.getItem("email");
};
