export interface PicklistCore {
	id: string;
	name: string;
	permission: PicklistPermission;
}

export interface Picklist extends PicklistCore {
	teams: Team[];
	owners: ID[];
	members: ID[];
	alliances: Alliance[];
	tags: string[];
}

export type PicklistPermission = "member" | "owner" | "none";

export interface Team {
	number: string;
	name: string;
	category: TeamCategory;
	listPosition: number;
	rank: number;
	tags: string[];
}

export interface FbDbPicklist {
	name: string;
	teams: { [key: string]: FbDbTeam };
	owners: { [key: string]: string };
	members: { [key: string]: string };
	alliances: { [key: string]: FbDbAlliance };
	tags: string[];
}

export interface ID {
	id: string;
	email: string;
}

export interface FbDbTeam {
	name: string;
	category: TeamCategory;
	listPosition: number;
	rank: number;
	tags: string[];
}

export type TeamCategory = "pick" | "neutral" | "doNotPick" | "unassigned" | "available" | "locked";

export interface FbDbAlliance {
	captain: string;
	firstPick: string;
	secondPick: string;
}

export interface Alliance {
	number: string;
	captain: string;
	firstPick: string;
	secondPick: string;
}

export interface PicklistInvite {
	userId: string;
	email: string;
	picklistId: string;
	inviteDate: Date;
}
