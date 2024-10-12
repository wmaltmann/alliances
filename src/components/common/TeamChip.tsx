import { Chip } from "@mui/material";
import React from "react";
import { TeamCategory } from "../../model/picklist/picklist.Model";

interface TeamChipProps {
	text: string;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
	teamCategory: TeamCategory;
}

const TeamChip: React.FC<TeamChipProps> = ({ text, onClick, teamCategory }) => {
	let bgColor: string;
	switch (teamCategory) {
		case "pick":
			bgColor = "#006600";
			break;
		case "neutral":
			bgColor = "#856F00";
			break;
		case "doNotPick":
			bgColor = "#A30000";
			break;
		default:
			bgColor = "#595959";
			break;
	}
	return <Chip label={text} onClick={onClick} sx={{ bgcolor: bgColor, width: "32px" }} />;
};

export default TeamChip;
