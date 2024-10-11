import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Picklist } from "../../model/picklist/picklist.Model";

interface PicklistsProps {
	picklists: Picklist[];
}

const EventList: React.FC<PicklistsProps> = ({ picklists }) => {
	const navigate = useNavigate();

	const handleItemClick = (id: string | number) => {
		navigate(`/${id}/list`);
	};

	const handleDelete = (id: string | number) => {
		console.log(`Delete event with ID: ${id}`);
	};

	return (
		<>
			<List>
				{picklists.map((event, index) => (
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
		</>
	);
};

export default EventList;
