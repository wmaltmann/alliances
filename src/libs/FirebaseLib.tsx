import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyBPabAtmvvq-vhzbZuRyZLueVxelaAXbS8",
	authDomain: "alliance-selector.firebaseapp.com",
	databaseURL: "https://alliance-selector-default-rtdb.firebaseio.com",
	projectId: "alliance-selector",
	storageBucket: "alliance-selector.appspot.com",
	messagingSenderId: "678497864213",
	appId: "1:678497864213:web:81519bb5e99b0b105d5c1c",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
