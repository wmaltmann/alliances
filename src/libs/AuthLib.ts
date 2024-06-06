import {
	GoogleAuthProvider,
	User,
	createUserWithEmailAndPassword,
	isSignInWithEmailLink,
	sendEmailVerification,
	sendSignInLinkToEmail,
	signInWithEmailAndPassword,
	signInWithEmailLink,
	signInWithRedirect,
} from "firebase/auth";
import { AppContextData } from "../app/AppContext";
import { getAppBaseUrl } from "../app/AppUtils";
import { fbAuth } from "../libs/FirebaseLib";
import { loadOrCreateUser } from "../model/user/user.Manager";

export const signOut = async (appContext: AppContextData) => {
	try {
		await fbAuth.signOut();
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
			url: baseUrl + "passwordlesslogin",
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
		case "Firebase: Error (auth/invalid-credential).":
			return "Incorrect email or password";
		case "Firebase: Exceeded daily quota for email sign-in. (auth/quota-exceeded).":
			return "Passwordless login failed. Login using your password.";
		case "Firebase: Error (auth/email-already-in-use).":
			return "Sign up failed. An account already exists using this email.";
		case "Firebase: Password should be at least 6 characters (auth/weak-password).":
			return "Sign up failed. Password should be at least 6 characters.";
		case "No User":
			return "Please login in and then resend your verification email.";
		case "Email not verified":
			return "Your email is not verified. Check your email for a verification for us and click the link inside.";
		default:
			return "Unknown Error: " + error.message;
	}
};

export const autoLogin = async (user: User | null | undefined, appContext: AppContextData) => {
	if (user) {
		if (user.emailVerified) {
			const newUser = await loadOrCreateUser(user);
			appContext.setUser(newUser);
			console.log("Successful auto login");
			return true;
		} else {
			console.log("Unsuccessful auto login - email not verified");
			return false;
		}
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
	try {
		const response = await signInWithEmailAndPassword(fbAuth, email, password);
		if (response.user.emailVerified) {
			const newUser = await loadOrCreateUser(response.user);
			appContext.setUser(newUser);
			console.log("Successful password login");
			return true;
		} else {
			throw new Error("Email not verified");
		}
	} catch (error) {
		throw new Error(processFirebaseAuthError(error as Error));
	}
};

export const getAuthEmail = () => {
	return localStorage.getItem("email");
};

export const signInWithGoogle = async () => {
	const provider = new GoogleAuthProvider();
	await signInWithRedirect(fbAuth, provider);
};

export const signUpWithEmailAndPassword = async (email: string, password: string) => {
	try {
		const response = await createUserWithEmailAndPassword(fbAuth, email, password);
		await sendEmailVerification(response.user);
	} catch (error) {
		throw new Error(processFirebaseAuthError(error as Error));
	}
};

export const sendVerifyEmail = async () => {
	try {
		if (fbAuth.currentUser) {
			await sendEmailVerification(fbAuth.currentUser);
			return fbAuth.currentUser.email;
		} else {
			throw new Error("No User");
		}
	} catch (error) {
		throw new Error(processFirebaseAuthError(error as Error));
	}
};

export const validatePassword = (password: string) => {
	if (!/.{8,}/.test(password)) {
		throw new Error("Password should be at least 8 characters");
	}
	if (!/[A-Z]/.test(password)) {
		throw new Error("Password should contain at least one capital letter");
	}
	if (!/[a-z]/.test(password)) {
		throw new Error("Password should contain at least one lowercase letter");
	}
	if (!/\d/.test(password)) {
		throw new Error("Password should contain at least one number");
	}
	if (!/[!@#$%^&*(),.?]/.test(password)) {
		throw new Error("Password should contain at least one special character !@#$%^&*(),.?");
	}
	return true;
};

export const validateEmail = (email: string): boolean => {
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		throw new Error("Invalid email address");
	}
	return true;
};
