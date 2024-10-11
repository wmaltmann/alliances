import { ArrowBackIosNew } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, useTheme } from "@mui/material";
import React from "react";

interface TopBarProps {
	onClickBack: React.MouseEventHandler<HTMLButtonElement>;
}

const TopBar: React.FC<TopBarProps> = ({ onClickBack }) => {
	const theme = useTheme();
	return (
		<AppBar
			position="fixed"
			sx={{
				top: 0,
				left: 0,
				right: 0,
				zIndex: 1000,
				height: "50px",
				backgroundColor: theme.palette.background.default,
				color: theme.palette.text.primary,
			}}
		>
			<Toolbar>
				<IconButton edge="start" color="primary" aria-label="back" onClick={onClickBack}>
					<ArrowBackIosNew />
				</IconButton>
				{/**<TextField
					variant="outlined"
					placeholder="Search"
					sx={{ flexGrow: 1, marginX: 2 }}
					InputProps={{
						inputProps: {
							style: { textAlign: "center" },
						},
					}}
				/>
				<IconButton edge="end" aria-label="filter" color="primary">
					<FilterList />
				</IconButton>
				**/}
			</Toolbar>
		</AppBar>
	);
};

export default TopBar;
