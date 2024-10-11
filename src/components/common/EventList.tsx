import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "../../model/event/event.Model";
import FloatingButton from "./FloatingButton";

interface EventListProps {
	events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
	const navigate = useNavigate();

	const handleItemClick = (id: string | number) => {
		navigate(`/${id}/list`);
	};

	const handleDelete = (id: string | number) => {
		console.log(`Delete event with ID: ${id}`);
	};

	const handleNew = () => {
		console.log("Add Event");
	};

	return (
		<>
			<List>
				{events.map((event, index) => (
					<ListItem
						key={index}
						onClick={() => handleItemClick(event.id)}
						sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
					>
						<Typography>{event.name}</Typography>
						<IconButton
							edge="end"
							color="error"
							onClick={(e) => {
								e.stopPropagation();
								handleDelete(event.id);
							}}
						>
							<DeleteIcon />
						</IconButton>
					</ListItem>
				))}
			</List>
			<FloatingButton text="+" onClick={handleNew} />
		</>
	);
};

export default EventList;
