import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from "@hello-pangea/dnd";
import { List, ListItem, useTheme } from "@mui/material";
import { memo } from "react";
import { Picklist, Team } from "../../model/picklist/picklist.Model";
import TeamDivider from "./TeamDivider";
import TeamListItem from "./TeamListItem";

interface TeamListProps {
	picklist: Picklist;
	onDragEnd: OnDragEndResponder;
}

const TeamList = memo(({ picklist, onDragEnd }: TeamListProps) => {
	const theme = useTheme();

	const addDividers = (teams: Team[]): Team[] => {
		const result: Team[] = [];
		let dividerCount = 1;

		for (let i = 0; i < teams.length; i++) {
			const currentTeam = teams[i];
			const previousTeam = result[result.length - 1];

			// If the category is different from the previous one, add a divider
			if (i === 0 || previousTeam.category !== currentTeam.category) {
				result.push({
					number: `D${dividerCount++}`, // Dynamic divider number for each new category
					name: currentTeam.category, // Name the divider based on the upcoming category
					category: currentTeam.category, // Continue with the new category
					listPosition: -1, // Divider indicator
				});
			}

			// Add the current team to the result
			result.push(currentTeam);
		}

		return result;
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="teamList">
				{(provided) => (
					<List ref={provided.innerRef} {...provided.droppableProps}>
						{addDividers(picklist.teams).map((team, index) => (
							<Draggable
								key={team.number}
								draggableId={String(team.number)}
								index={index}
							>
								{(provided, snapshot) => (
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
											bgcolor: snapshot.isDragging
												? "background.paper"
												: "default",
											borderRadius: "20px",
										}}
									>
										{team.listPosition < 0 ? (
											<TeamDivider teamCategory={team.category} />
										) : (
											<TeamListItem team={team} />
										)}
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
