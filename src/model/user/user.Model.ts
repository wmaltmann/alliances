export interface User {
	id: string;
	profile: Profile;
}

export interface Profile {
	email: string;
	emailVerified: boolean;
	createdDate: string;
}
