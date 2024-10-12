import { List, ListItem, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PicklistCore } from "../../model/picklist/picklist.Model";

interface PicklistsProps {
	picklists: PicklistCore[];
}

const EventList: React.FC<PicklistsProps> = ({ picklists }) => {
	const navigate = useNavigate();
	const theme = useTheme();

	const handleItemClick = (id: string) => {
		navigate(`/${id}/list`);
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
							margin: theme.spacing(1),
							paddingTop: theme.spacing(1),
							paddingBottom: theme.spacing(1),
						}}
					>
						<Typography>{picklist.name}</Typography>
						{/**<IconButton
							edge="end"
							color="error"
							onClick={(e) => {
								e.stopPropagation();
								handleDelete(picklist.id);
							}}
						>
							<DeleteIcon />
						</IconButton>**/}
					</ListItem>
				))}
			</List>
		</>
	);
};

export default EventList;
