export interface User {
	id: string;
	profile: Profile;
	picklists: string[];
	activePicklist: string | undefined;
}

export interface Profile {
	email: string;
	emailVerified: boolean;
	createdDate: string;
	color: string;
}
