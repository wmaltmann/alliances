import { User as FbUser } from "firebase/auth";
import { readFbDb, writeFbDb } from "../../libs/FirebaseLib";
import { getRandomColor } from "../../libs/Utills";
import { Profile, User } from "./user.Model";

export const loadOrCreateUser = async (fbUser: FbUser) => {
	if (!fbUser?.uid) {
		throw new Error("No user id provided");
	}
	const user = await readFbDb(`/users/${fbUser.uid}`);
	if (user) {
		user.id = fbUser.uid;
		return user as User;
	} else {
		const today = new Date();
		const profileData: Profile = {
			email: fbUser.email || "",
			emailVerified: fbUser.emailVerified,
			createdDate: today.toISOString(),
			color: getRandomColor(),
		};
		await writeFbDb(`/users/${fbUser.uid}/profile`, profileData);
		const newUser: User = {
			id: fbUser.uid,
			profile: profileData,
			picklists: [],
			activePicklist: undefined,
		};
		return newUser;
	}
};
