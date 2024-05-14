import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyDhHO7NY6zq87AG0QHdcDmJss8hNmZjSfo",
	authDomain: "alliance-selector-d9518.firebaseapp.com",
	databaseURL: "https://alliance-selector-d9518-default-rtdb.firebaseio.com",
	projectId: "alliance-selector-d9518",
	storageBucket: "alliance-selector-d9518.appspot.com",
	messagingSenderId: "255656016827",
	appId: "1:255656016827:web:0fdb8d06d491667c87a29e",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
