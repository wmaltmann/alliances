import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

export const getAppStage = () => {
	return process.env.REACT_APP_STAGE === "prod" ? "prod" : "dev";
};

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

const app = initializeApp(getAppStage() === "dev" ? DEV_CONFIG : PROD_CONFIG);
export const db = getDatabase(app);
export const auth = getAuth(app);
