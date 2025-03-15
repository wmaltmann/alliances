import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { useAppContext } from "../../app/AppContext";
import { editPicklistTags } from "../../model/picklist/picklist.Manager";
import ASButton from "./ASButton";
import ASTextField from "./ASTextField";
import TagChip from "./TagChip";

interface TagListProps {
	tags: string[];
	editable?: boolean;
}

const TagList: FC<TagListProps> = ({ tags, editable }) => {
	const theme = useTheme();
	const { user, alerts } = useAppContext();
	const [newTag, setNewTag] = useState<string>("");
	const {
		lists: { activePicklist },
	} = useAppContext();

	const handleAddTag = async () => {
		if (user && activePicklist) {
			try {
				if (tags.includes(newTag)) {
					alerts.addAlert("warning", "Tag already exists.", 15);
				} else if (newTag !== "") {
					const newTags = tags.concat(newTag);
					await editPicklistTags(activePicklist, newTags);
				}
				setNewTag("");
			} catch (error) {
				console.log(error);
				alerts.addAlert("error", "Failed to add tag.", 15);
			}
		} else {
			if (!user) {
				alerts.addAlert("error", "No user found", 15);
			}
			if (!activePicklist) {
				alerts.addAlert("error", "No picklist found", 15);
			}
		}
	};

	const handleChangeNewTag = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewTag(event.target.value);
	};

	const handleTagDelete = async (oldTag: string) => {
		if (user && activePicklist) {
			try {
				const newTags = tags.filter((tag) => tag !== oldTag);
				await editPicklistTags(activePicklist, newTags);
				setNewTag("");
			} catch (error) {
				console.log(error);
				alerts.addAlert("error", "Failed to add tag.", 15);
			}
		} else {
			if (!user) {
				alerts.addAlert("error", "No user found", 15);
			}
			if (!activePicklist) {
				alerts.addAlert("error", "No picklist found", 15);
			}
		}
	};

	return (
		<Box
			sx={{
				position: "relative",
				height: "100%",
				width: "100%",
				flexGrow: 1,
				maxHeight: "100%",
				overflow: "auto",
				justifyContent: "center",
			}}
		>
			<Typography>Tags</Typography>
			<Grid
				container
				marginBottom={theme.spacing(1)}
				marginTop={theme.spacing(1)}
				sx={(theme) => ({
					border: `2px solid ${theme.palette.primary.main}`,
					borderRadius: "8px",
					padding: theme.spacing(1),
				})}
			>
				{tags.map((tag, index) => {
					return (
						<Grid item key={index}>
							<TagChip
								text={tag}
								enableHold={editable}
								onHold={() => {
									void handleTagDelete(tag);
								}}
							/>
						</Grid>
					);
				})}
			</Grid>
			{editable && (
				<Stack spacing={3} paddingTop={3}>
					<ASTextField
						type="text"
						label="New Tag"
						value={newTag}
						fullWidth
						onChange={handleChangeNewTag}
					/>
					<ASButton type="button" text="Add Tag" onClick={handleAddTag} />
				</Stack>
			)}
		</Box>
	);
};

export default TagList;
