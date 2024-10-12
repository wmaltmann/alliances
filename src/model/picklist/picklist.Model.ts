export interface Picklist {
	id: string;
	name: string;
	permission: PicklistPermission;
}

export type PicklistPermission = "member" | "owner" | "none";
