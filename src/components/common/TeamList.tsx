import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from "@hello-pangea/dnd";
import { DragIndicator } from "@mui/icons-material";
import { List, ListItem, Typography, useTheme } from "@mui/material";
import { memo } from "react";
import { Picklist } from "../../model/picklist/picklist.Model";
import TeamChip from "./TeamChip";

interface TeamListProps {
	picklist: Picklist;
	onDragEnd: OnDragEndResponder;
}

const TeamList = memo(({ picklist, onDragEnd }: TeamListProps) => {
	const theme = useTheme();

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="teamList">
				{(provided) => (
					<List ref={provided.innerRef} {...provided.droppableProps}>
						{picklist.teams.map((team, index) => (
							<Draggable
								key={team.number}
								draggableId={String(team.number)}
								index={index}
							>
								{(provided) => (
									<ListItem
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
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
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</List>
				)}
			</Droppable>
		</DragDropContext>
	);
});

export default TeamList;
