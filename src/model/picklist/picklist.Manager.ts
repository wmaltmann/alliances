import { Location } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
	readFbDb,
	removeFbDb,
	subscribeToFbDbPicklist,
	updateFbDb,
	writeFbDb,
} from "../../libs/FirebaseLib";
import { getPickListIdFromPath } from "../../libs/Utills";
import {
	Alliance,
	FbDbAlliance,
	FbDbPicklist,
	FbDbTeam,
	ID,
	Picklist,
	PicklistCore,
	PicklistPermission,
	Team,
} from "./picklist.Model";

export const createPicklist = async (userId: string, userEmail: string, picklistName: string) => {
	const plid = uuidv4();
	const userPicklistData = { [plid]: true };

	await updateFbDb(`/users/${userId}/picklists`, userPicklistData);

	const picklistsData = {
		name: picklistName,
		owners: { [userId]: userEmail },
	};

	await updateFbDb(`/picklists/${plid}`, picklistsData);

	return plid;
};

export const getUserPicklists = async (userId: string) => {
	// Path to the user's picklists
	const userPicklistsPath = `/users/${userId}/picklists`;
	const userPicklistsData = await readFbDb(userPicklistsPath);

	// If user picklists do not exist, return an empty array
	if (!userPicklistsData) {
		return [];
	}

	// Create an array to hold the picklist details
	const picklistsArray = [];

	// Iterate through the user's picklist IDs (keys)
	for (const plid in userPicklistsData) {
		// Check if the value is true
		if (userPicklistsData[plid]) {
			try {
				// Construct the path for each specific picklist
				const picklistPath = `/picklists/${plid}`;
				const picklistData = await readFbDb(picklistPath);

				// Check if the picklist exists
				if (picklistData) {
					let permission: PicklistPermission = "none";

					// Determine if the user is an owner or a member
					if (picklistData.owners && picklistData.owners[userId]) {
						permission = "owner";
					} else if (picklistData.members && picklistData.members[userId]) {
						permission = "member";
					}

					const data: PicklistCore = {
						id: plid,
						name: picklistData.name,
						permission: permission,
					};
					picklistsArray.push(data);
				}
			} catch (error) {
				// If readFbDb fails, skip this picklist
				const data: PicklistCore = {
					id: plid,
					name: "Access denied",
					permission: "none",
				};
				picklistsArray.push(data);
			}
		}
	}

	return picklistsArray;
};

export const listenToPicklist = (
	picklistId: string,
	setActivePicklist: (
		loadingPicklistId: string,
		picklist: FbDbPicklist | undefined,
		userId: string | undefined,
	) => void,
	userId: string | undefined,
) => {
	if (!picklistId) return undefined;

	return subscribeToFbDbPicklist(picklistId, setActivePicklist, userId);
};

export const loadPicklist = (
	location: Location,
	setActivePicklistId: React.Dispatch<React.SetStateAction<string>>,
) => {
	const picklistId = getPickListIdFromPath(location.pathname);
	setActivePicklistId(picklistId);
};

export const migratePicklist = (
	activePicklistId: string,
	userId: string | undefined,
	fbDbPicklist: FbDbPicklist | undefined,
) => {
	if (!fbDbPicklist) throw new Error("Picklist undefined");
	const members = fbDbPicklist.members ? convertFbDbMembersToMembers(fbDbPicklist.members) : [];
	const owners = fbDbPicklist.owners ? convertFbDbMembersToMembers(fbDbPicklist.owners) : [];
	const permission = checkUserRole(userId || "", members, owners);
	const picklist: Picklist = {
		id: activePicklistId,
		name: fbDbPicklist.name,
		permission: permission,
		teams: fbDbPicklist.teams
			? sortTeamsByListPosition(convertFbDBTeamsToTeams(fbDbPicklist.teams))
			: [],
		members: members,
		owners: owners,
		alliances: fbDbPicklist.alliances
			? convertFbDbAlliancesToAlliances(fbDbPicklist.alliances)
			: [],
	};
	return picklist;
};

const convertFbDbMembersToMembers = (data: { [key: string]: string }): ID[] => {
	return Object.entries(data).map(([id, email]) => ({
		id,
		email,
	}));
};

const checkUserRole = (userId: string, members: ID[], owners: ID[]): PicklistPermission => {
	if (owners.some((idObj) => idObj.id === userId)) {
		return "owner";
	} else if (members.some((idObj) => idObj.id === userId)) {
		return "member";
	} else {
		return "none";
	}
};

const convertFbDBTeamsToTeams = (fbDBTeams: { [key: string]: FbDbTeam }): Team[] => {
	return Object.entries(fbDBTeams).map(([key, team]) => ({
		number: key,
		name: team.name,
		category: team.category,
		listPosition: team.listPosition,
		rank: team.rank,
	}));
};

const convertTeamsToFbDBTeams = (teams: Team[]): { [key: string]: FbDbTeam } => {
	return teams.reduce<{ [key: string]: FbDbTeam }>((acc, team) => {
		acc[team.number] = {
			name: team.name,
			category: team.category,
			listPosition: team.listPosition,
			rank: team.rank,
		};
		return acc;
	}, {});
};

const sortTeamsByListPosition = (teams: Team[]): Team[] => {
	return teams.sort((a, b) => a.listPosition - b.listPosition);
};

export const addTeamToPicklist = async (
	activePicklist: Picklist,
	teamName: string,
	teamNumber: string,
	rank: number,
) => {
	const newTeam: Team = {
		number: teamNumber,
		name: teamName,
		listPosition: activePicklist.teams.length + 1,
		category: "unassigned",
		rank: rank,
	};
	await updateFbDb(`/picklists/${activePicklist.id}/teams/${teamNumber}`, newTeam);
};

export const updatePicklistOrder = async (picklistId: string, newTeamOrder: Team[]) => {
	const path = `/picklists/${picklistId}/teams`;
	await writeFbDb(path, convertTeamsToFbDBTeams(newTeamOrder));
};

const convertFbDbAlliancesToAlliances = (fbDBAlliances: {
	[key: string]: FbDbAlliance;
}): Alliance[] => {
	return Object.entries(fbDBAlliances).map(([key, alliance]) => ({
		number: (Number(key) + 1).toString(),
		captain: alliance.captain,
		firstPick: alliance.firstPick,
		secondPick: alliance.secondPick,
	}));
};

export const convertAlliancesToFbDAlliances = (
	alliances: Alliance[],
): { [key: string]: FbDbAlliance } => {
	return alliances.reduce<{ [key: string]: FbDbAlliance }>((acc, alliance) => {
		acc[alliance.number] = {
			captain: alliance.captain,
			firstPick: alliance.firstPick,
			secondPick: alliance.secondPick,
		};
		return acc;
	}, {});
};

export const addAllianceToPicklist = async (activePicklist: Picklist) => {
	const index = activePicklist.alliances.length;
	const newAlliance: FbDbAlliance = {
		captain: "",
		firstPick: "",
		secondPick: "",
	};
	await updateFbDb(`/picklists/${activePicklist.id}/alliances/${index}/`, newAlliance);
};

export const addTeamToAlliance = async (
	activePicklist: Picklist,
	alliance: Alliance,
	teamNumber: string,
) => {
	const findFirstBlankPosition = (alliance: Alliance): keyof Alliance | undefined => {
		for (const key in alliance) {
			if (alliance[key as keyof Alliance] === "") {
				return key as keyof Alliance;
			}
		}
		return undefined;
	};
	const position = findFirstBlankPosition(alliance);
	if (!position) {
		return;
	}
	await updateFbDb(`/picklists/${activePicklist.id}/alliances/${Number(alliance.number) - 1}/`, {
		[position]: teamNumber,
	});
};

export const removeTeamFromAlliance = async (
	activePicklist: Picklist,
	allianceNumber: number,
	position: "captain" | "firstPick" | "secondPick",
) => {
	await updateFbDb(`/picklists/${activePicklist.id}/alliances/${allianceNumber - 1}/`, {
		[position]: "",
	});
};

export const processPicklistError = (error: Error) => {
	switch (error.message) {
		case "PERMISSION_DENIED: Permission denied":
			return "You don't have permission to edit this picklist";
		default:
			console.log(error);
			return undefined;
	}
};

export const removeUserFromPicklist = async (
	picklist: Picklist,
	type: "owners" | "members",
	id: string,
) => {
	await removeFbDb(`/picklists/${picklist.id}/${type}/${id}`);
};
