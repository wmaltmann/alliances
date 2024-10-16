export interface PicklistCore {
	id: string;
	name: string;
	permission: PicklistPermission;
}

export interface Picklist extends PicklistCore {
	teams: Team[];
	owners: string[];
	members: string[];
}

export type PicklistPermission = "member" | "owner" | "none";

export interface Team {
	number: string;
	name: string;
	category: TeamCategory;
	listPosition: number;
}

export interface FbDbPicklist {
	name: string;
	teams: { [key: string]: FbDBTeam };
	owners: { [key: string]: true };
	members: { [key: string]: true };
}

export interface FbDBTeam {
	name: string;
	category: TeamCategory;
	listPosition: number;
}

export type TeamCategory = "pick" | "neutral" | "doNotPick" | "unassigned";
