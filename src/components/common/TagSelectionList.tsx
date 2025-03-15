import { Check, Close } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { Team } from "../../model/picklist/picklist.Model";

interface TagSelectionListProps {
	team: Team;
}

const TagSelectionList: FC<TagSelectionListProps> = ({ team }) => {
	const theme = useTheme();
	const [editMode, setEditMode] = useState<boolean>(false);

	const handleOnClick = () => {
		if (!editMode) {
			setEditMode(true);
		}
	};

	const handleSave = () => {
		console.log("save");
		setEditMode(false);
	};

	const handleCancel = () => {
		console.log("cancel");
		setEditMode(false);
	};

	return (
		<Box onClick={handleOnClick}>
			<Stack direction="row" alignItems="center" spacing={theme.spacing(2)}>
				<Typography>Tags:</Typography>

				{!editMode && team.tags && (
					<>
						{team.tags.map((tag, index) => {
							return <Typography key={index}>{tag}</Typography>;
						})}
					</>
				)}
				{editMode && (
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Typography>Editing</Typography>
						<Box>
							<IconButton onClick={handleCancel} size="small" color="primary">
								<Close />
							</IconButton>
							<IconButton onClick={handleSave} size="small" color="primary">
								<Check />
							</IconButton>
						</Box>
					</Box>
				)}
			</Stack>
		</Box>
	);
};

export default TagSelectionList;
