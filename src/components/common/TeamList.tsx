import { DragIndicator } from "@mui/icons-material";
import { List, ListItem, Typography, useTheme } from "@mui/material";
import React from "react";
import { Picklist } from "../../model/picklist/picklist.Model";
import TeamChip from "./TeamChip";

interface TeamListProps {
	picklist: Picklist;
}

const TeamList: React.FC<TeamListProps> = ({ picklist }) => {
	const theme = useTheme();

	const handleItemClick = (id: string) => {
		console.log(id, "clicked");
	};

	return (
		<List>
			{picklist.teams.map((team, index) => {
				return (
					<ListItem
						key={index}
						onClick={() => handleItemClick(team.number)}
						sx={{
							display: "flex",
							justifyContent: "space-between",
							width: `calc(100% - ${theme.spacing(2)})`,
							margin: theme.spacing(1),
							paddingTop: theme.spacing(1),
							paddingBottom: theme.spacing(1),
						}}
					>
						<TeamChip
							text={team.listPosition.toString()}
							teamCategory={team.category}
						/>
						<Typography>{team.number}</Typography>
						<Typography>{team.name}</Typography>
						<DragIndicator />
					</ListItem>
				);
			})}
		</List>
	);
};

export default TeamList;
