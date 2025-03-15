import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useAppContext } from "../../app/AppContext";
import {
	editTeamName,
	editTeamNumber,
	editTeamRank,
	removeTeam,
} from "../../model/picklist/picklist.Manager";
import { Team } from "../../model/picklist/picklist.Model";
import ASInlineTextField from "./ASInlineTextField";
import TagSelectionList from "./TagSelectionList";
import TeamChip from "./TeamChip";

interface TeamListItemProps {
	team: Team;
	editMode?: boolean;
}

const TeamListItem: React.FC<TeamListItemProps> = ({ team, editMode = false }) => {
	const theme = useTheme();
	const {
		user,
		alerts,
		lists: { activePicklist },
	} = useAppContext();

	const handleSaveTeamName = async (newName: string) => {
		if (user && activePicklist) {
			try {
				if (team.name !== newName) {
					await editTeamName(activePicklist, team.number, newName);
				}
			} catch (error) {
				console.log(error);
				alerts.addAlert("error", "Failed to update team name.", 15);
			}
		} else {
			if (!user) {
				alerts.addAlert("error", "No user found", 15);
			}
			if (!activePicklist) {
				alerts.addAlert("error", "No picklist found", 15);
			}
		}
	};

	const handleSaveTeamRank = async (newRank: string) => {
		if (user && activePicklist) {
			try {
				if (team.rank.toString() !== newRank) {
					await editTeamRank(activePicklist, team.number, newRank);
				}
			} catch (error) {
				console.log(error);
				alerts.addAlert("error", "Failed to update team rank.", 15);
			}
		} else {
			if (!user) {
				alerts.addAlert("error", "No user found", 15);
			}
			if (!activePicklist) {
				alerts.addAlert("error", "No picklist found", 15);
			}
		}
	};

	const handleSaveTeamNumber = async (newNumber: string) => {
		if (user && activePicklist) {
			try {
				if (team.number.toString() !== newNumber) {
					await editTeamNumber(activePicklist, team.number, newNumber);
				}
			} catch (error) {
				console.log(error);
				alerts.addAlert("error", "Failed to update team number.", 15);
			}
		} else {
			if (!user) {
				alerts.addAlert("error", "No user found", 15);
			}
			if (!activePicklist) {
				alerts.addAlert("error", "No picklist found", 15);
			}
		}
	};

	const handleRemoveTeam = async () => {
		if (user && activePicklist) {
			try {
				await removeTeam(activePicklist, team.number);
			} catch (error) {
				console.log(error);
				alerts.addAlert("error", "Failed to update team number.", 15);
			}
		} else {
			if (!user) {
				alerts.addAlert("error", "No user found", 15);
			}
			if (!activePicklist) {
				alerts.addAlert("error", "No picklist found", 15);
			}
		}
	};

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
				<Stack spacing={theme.spacing(2)} width="100%">
					<TeamChip text={team.listPosition.toString()} teamCategory={team.category} />
					<Stack paddingLeft={theme.spacing(8)}>
						<ASInlineTextField
							value={team.number}
							label="Team Number:"
							onSave={handleSaveTeamNumber}
						/>
						<ASInlineTextField
							value={team.name}
							label="Team Name:"
							onSave={handleSaveTeamName}
						/>
						<ASInlineTextField
							value={team.rank.toString()}
							label="Rank:"
							onSave={handleSaveTeamRank}
						/>
						<TagSelectionList team={team} />
						<Box
							padding={theme.spacing(2)}
							display="flex"
							justifyContent="flex-end"
							width="100%"
						>
							<TeamChip
								text="Remove"
								enableHold
								teamCategory="locked"
								large
								onHold={handleRemoveTeam}
							/>
						</Box>
					</Stack>
				</Stack>
			)}
		</Stack>
	);
};

export default TeamListItem;
