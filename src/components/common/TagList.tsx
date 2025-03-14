import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react";
import ASButton from "./ASButton";
import ASTextField from "./ASTextField";
import TagChip from "./TagChip";

interface TagListProps {
	tags: string[];
	editable?: boolean;
}

const TagList: FC<TagListProps> = ({ tags, editable }) => {
	const theme = useTheme();
	const [newTag, setNewTag] = useState<string>("");

	const handleAddTag = async () => {
		console.log("add tag submit");
	};

	const handleChangeNewTag = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewTag(event.target.value);
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
							<TagChip text={tag} enableHold={editable} />
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
