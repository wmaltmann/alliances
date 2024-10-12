import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, List, ListItem, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Picklist } from "../../model/picklist/picklist.Model";

interface PicklistsProps {
	picklists: Picklist[];
}

const EventList: React.FC<PicklistsProps> = ({ picklists }) => {
	const navigate = useNavigate();
	const theme = useTheme();

	const handleItemClick = (id: string | number) => {
		navigate(`/${id}/list`);
	};

	const handleDelete = (id: string | number) => {
		console.log(`Delete event with ID: ${id}`);
	};

	return (
		<>
			<List>
				{picklists.map((picklist, index) => (
					<ListItem
						key={index}
						onClick={() => handleItemClick(picklist.id)}
						sx={{
							display: "flex",
							justifyContent: "space-between",
							width: `calc(100% - ${theme.spacing(2)})`,
							bgcolor: "background.paper",
							margin: theme.spacing(1),
							paddingTop: theme.spacing(1),
							paddingBottom: theme.spacing(1),
						}}
					>
						<Typography>{picklist.name}</Typography>
						<IconButton
							edge="end"
							color="error"
							onClick={(e) => {
								e.stopPropagation();
								handleDelete(picklist.id);
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
