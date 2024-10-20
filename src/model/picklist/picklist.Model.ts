export interface PicklistCore {
	id: string;
	name: string;
	permission: PicklistPermission;
}

export interface Picklist extends PicklistCore {
	teams: Team[];
	owners: string[];
	members: string[];
	alliances: Alliance[];
}

export type PicklistPermission = "member" | "owner" | "none";

export interface Team {
	number: string;
	name: string;
	category: TeamCategory;
	listPosition: number;
	rank: number;
}

export interface FbDbPicklist {
	name: string;
	teams: { [key: string]: FbDbTeam };
	owners: { [key: string]: true };
	members: { [key: string]: true };
	alliances: { [key: string]: FbDbAlliance };
}

export interface FbDbTeam {
	name: string;
	category: TeamCategory;
	listPosition: number;
	rank: number;
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
