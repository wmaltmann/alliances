import { Divider, Typography, useTheme } from "@mui/material";
import React from "react";
import { TeamCategory } from "../../model/picklist/picklist.Model";

interface TeamDividerProps {
	teamCategory: TeamCategory;
}

const TeamDivider: React.FC<TeamDividerProps> = ({ teamCategory }) => {
	const theme = useTheme();
	let color: string;
	let label: string;
	switch (teamCategory) {
		case "pick":
			color = theme.palette.chip.pick;
			label = "Pick List";
			break;
		case "neutral":
			color = theme.palette.chip.neutral;
			label = "Neutral List";
			break;
		case "doNotPick":
			color = theme.palette.chip.doNotPick;
			label = "Do Not Pick List";
			break;
		default:
			color = theme.palette.chip.unassigned;
			label = "Unassigned";
			break;
	}

	return (
		<Divider
			sx={{
				width: "100%",
				height: "32px",
				"&.MuiDivider-withChildren": {
					"&:before": {
						borderColor: color,
						borderWidth: 2,
					},
					"&:after": {
						borderColor: color,
						borderWidth: 2,
					},
				},
			}}
		>
			<Typography
				sx={{
					color: color,
					margin: `0 ${theme.spacing(1)}`,
					whiteSpace: "nowrap",
				}}
			>
				{label}
			</Typography>
		</Divider>
	);
};

export default TeamDivider;
