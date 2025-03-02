import { Alliance, Picklist, Team, TeamCategory } from "./picklist.Model";

const getPickedTeams = (alliances: Alliance[]) => {
	const uniqueValues = new Set();

	alliances.forEach((alliance) => {
		if (alliance.captain) uniqueValues.add(alliance.captain);
		if (alliance.firstPick) uniqueValues.add(alliance.firstPick);
		if (alliance.secondPick) uniqueValues.add(alliance.secondPick);
	});

	return Array.from(uniqueValues) as string[];
};

const removePickedTeams = (teams: Team[], pickedTeams: string[]) => {
	return teams.filter((team) => !pickedTeams.includes(team.number));
};

export const getAvailableTeams = (activePicklist: Picklist | undefined) => {
	if (!activePicklist) {
		return [];
	}
	const pickedTeams = getPickedTeams(activePicklist?.alliances || []);
	const availableTeams = removePickedTeams(activePicklist?.teams || [], pickedTeams);
	return availableTeams;
};

export const sortTeamsByRank = (teams: Team[]) => {
	return teams.sort((a, b) => a.rank - b.rank);
};

export const sortTeamsByTeamNumber = (teams: Team[]) => {
	return teams.sort((a, b) => Number(a.number) - Number(b.number));
};

export const getTeamsByCategory = (teams: Team[], category: TeamCategory): Team[] => {
	return teams.filter((team) => team.category === category);
};
