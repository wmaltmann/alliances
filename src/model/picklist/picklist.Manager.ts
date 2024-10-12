import { v4 as uuidv4 } from "uuid";
import { readFbDb, subscribeFbDb, updateFbDb } from "../../libs/FirebaseLib";
import { Picklist, PicklistPermission } from "./picklist.Model";

export const createPicklist = async (userId: string, picklistName: string) => {
	const plid = uuidv4();
	const userPicklistData = { [plid]: true };

	await updateFbDb(`/users/${userId}/picklists`, userPicklistData);

	const picklistsData = {
		name: picklistName,
		owners: { [userId]: true },
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

					const data: Picklist = {
						id: plid,
						name: picklistData.name,
						permission: permission,
					};
					picklistsArray.push(data);
				}
			} catch (error) {
				// If readFbDb fails, skip this picklist
				const data: Picklist = {
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
	setActivePicklist: React.Dispatch<React.SetStateAction<Picklist | undefined>>,
) => {
	if (!picklistId) return undefined;

	return subscribeFbDb(`/picklists/${picklistId}`, setActivePicklist);
};
