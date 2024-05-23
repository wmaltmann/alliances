import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";
import { getAppStage } from "../app/AppUtils";

const DEV_CONFIG = {
	apiKey: "AIzaSyADZYyWAe6YydGBcrTfoTgJNyoJoLBsVh4",
	authDomain: "alliance-selector-beta.firebaseapp.com",
	databaseURL: "https://alliance-selector-beta-default-rtdb.firebaseio.com",
	projectId: "alliance-selector-beta",
	storageBucket: "alliance-selector-beta.appspot.com",
	messagingSenderId: "397781631571",
	appId: "1:397781631571:web:76cea58abcc50dec91bca6",
};

const PROD_CONFIG = {
	apiKey: "AIzaSyDhHO7NY6zq87AG0QHdcDmJss8hNmZjSfo",
	authDomain: "alliance-selector-d9518.firebaseapp.com",
	databaseURL: "https://alliance-selector-d9518-default-rtdb.firebaseio.com",
	projectId: "alliance-selector-d9518",
	storageBucket: "alliance-selector-d9518.appspot.com",
	messagingSenderId: "255656016827",
	appId: "1:255656016827:web:0fdb8d06d491667c87a29e",
};

const app = initializeApp(getAppStage() === "prod" ? PROD_CONFIG : DEV_CONFIG);
const fbDb = getDatabase(app);

export const fbAuth = getAuth(app);

export const readFbDb = async (path: string) => {
	const dbRef = ref(fbDb, path);
	try {
		const snapshot = await get(dbRef);
		if (snapshot.exists()) {
			const data = snapshot.val();
			return data;
		} else {
			return undefined;
		}
	} catch (error) {
		console.error("Error reading data: ", error);
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const writeFbDb = async (path: string, data: any) => {
	const dbRef = ref(fbDb, path);
	try {
		await set(dbRef, data);
	} catch (error) {
		console.error("Error writing data: ", error);
	}
};
