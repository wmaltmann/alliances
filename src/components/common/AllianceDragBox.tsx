import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Box, useTheme } from "@mui/material";
import { FC } from "react";
import { Team } from "../../model/picklist/picklist.Model";
import TeamChip from "./TeamChip";

interface AllianceDragBoxProps {
	teams: Team[];
}

const AllianceDragBox: FC<AllianceDragBoxProps> = ({ teams }) => {
	const theme = useTheme();
	return (
		<Droppable droppableId="alliance-drag-box">
			{(provided) => (
				<Box
					{...provided.droppableProps}
					ref={provided.innerRef}
					sx={{
						width: "140px",
						bgcolor: "background.paper",
						padding: theme.spacing(1),
						borderRadius: "20px",
						margin: theme.spacing(1),
						maxHeight: "100%",
						overflow: "auto",
					}}
				>
					{teams.map((team, index) => (
						<Draggable draggableId={team.number} index={index} key={index}>
							{(provided) => (
								<Box
									sx={{ marginBottom: theme.spacing(2) }}
									key={index}
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
								>
									<TeamChip teamCategory="available" text={team.number} large />
								</Box>
							)}
						</Draggable>
					))}
					{provided.placeholder}
				</Box>
			)}
		</Droppable>
	);
};

export default AllianceDragBox;
