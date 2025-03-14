import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { Team } from "../../model/picklist/picklist.Model";
import TeamChip from "./TeamChip";

interface TeamListItemProps {
	team: Team;
	editMode?: boolean;
}

const TeamListItem: React.FC<TeamListItemProps> = ({ team, editMode = false }) => {
	const theme = useTheme();
	return (
		<Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
			{!editMode && (
				<>
					<Stack direction="row" alignItems="center" spacing={theme.spacing(2)}>
						<TeamChip
							text={team.listPosition.toString()}
							teamCategory={team.category}
						/>
						<Typography>{team.number}</Typography>
						<Typography>{team.name}</Typography>
					</Stack>
					<Stack direction="row" alignItems="center">
						{team.tags && (
							<>
								{team.tags.map((tag) => {
									return <Typography>{tag}</Typography>;
								})}
							</>
						)}
					</Stack>
				</>
			)}
			{editMode && (
				<>
					<Stack direction="row" alignItems="center" spacing={theme.spacing(2)}>
						<TeamChip
							text={team.listPosition.toString()}
							teamCategory={team.category}
						/>
						<Typography>{team.number}</Typography>
						<Typography>{team.name}</Typography>
					</Stack>
					<Stack direction="row" alignItems="center">
						{team.tags && (
							<>
								{team.tags.map((tag, index) => {
									return <Typography key={index}>{tag}</Typography>;
								})}
							</>
						)}
					</Stack>
				</>
			)}
		</Stack>
	);
};

export default TeamListItem;
