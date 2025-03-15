import { Check } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { useAppContext } from "../../app/AppContext";
import { updateTeamTags } from "../../model/picklist/picklist.Manager";
import { Team } from "../../model/picklist/picklist.Model";

interface TagSelectionListProps {
	team: Team;
	listTags: string[];
}

const TagSelectionList: FC<TagSelectionListProps> = ({ team, listTags }) => {
	const theme = useTheme();
	const {
		user,
		alerts,
		lists: { activePicklist },
	} = useAppContext();
	const [editMode, setEditMode] = useState<boolean>(false);

	const handleOnClick = () => {
		if (!editMode) {
			setEditMode(true);
		}
	};

	const handleSave = () => {
		setEditMode(false);
	};

	const handleToggleTag = async (tag: string) => {
		let isTagInTeamTags = false;
		if (team.tags) {
			isTagInTeamTags = team.tags.includes(tag);
		}
		if (isTagInTeamTags) {
			const newTagList = team.tags.filter((teamTag) => teamTag != tag);
			if (user && activePicklist) {
				try {
					await updateTeamTags(activePicklist, team.number, newTagList);
				} catch (error) {
					console.log(error);
					alerts.addAlert("error", "Failed to update team number.", 15);
				}
			} else {
				if (!user) {
					alerts.addAlert("error", "No user found", 15);
				}
				if (!activePicklist) {
					alerts.addAlert("error", "No picklist found", 15);
				}
			}
		} else {
			let newTagList = [];
			if (team.tags) {
				newTagList = team.tags.concat(tag);
			} else {
				newTagList = [tag];
			}

			if (user && activePicklist) {
				try {
					await updateTeamTags(activePicklist, team.number, newTagList);
				} catch (error) {
					console.log(error);
					alerts.addAlert("error", "Failed to update team number.", 15);
				}
			} else {
				if (!user) {
					alerts.addAlert("error", "No user found", 15);
				}
				if (!activePicklist) {
					alerts.addAlert("error", "No picklist found", 15);
				}
			}
		}
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
						{listTags.map((tag, index) => {
							let isTagInTeamTags = false;
							if (team.tags) {
								isTagInTeamTags = team.tags.includes(tag);
							}

							return (
								<Typography
									key={index}
									style={{
										opacity: isTagInTeamTags ? 1 : 0.2,
									}}
									onClick={() => handleToggleTag(tag)}
									paddingRight={4}
								>
									{tag}
								</Typography>
							);
						})}
						<Box>
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
