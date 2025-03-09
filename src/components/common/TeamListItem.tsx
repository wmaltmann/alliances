import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { Team } from "../../model/picklist/picklist.Model";
import TeamChip from "./TeamChip";

interface TeamListItemProps {
	team: Team;
}

const TeamListItem: React.FC<TeamListItemProps> = ({ team }) => {
	const theme = useTheme();
	console.log(team.tags);
	return (
		<Stack direction="row" alignItems="center" spacing={theme.spacing(2)}>
			<TeamChip text={team.listPosition.toString()} teamCategory={team.category} />
			<Typography>{team.number}</Typography>
			<Typography>{team.name}</Typography>
		</Stack>
	);
};

export default TeamListItem;
