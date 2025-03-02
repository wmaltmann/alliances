import { ArrowBackIosNew, FilterList } from "@mui/icons-material";
import { AppBar, IconButton, TextField, Toolbar, Typography, useTheme } from "@mui/material";
import React from "react";

interface TopBarProps {
	onClickBack: React.MouseEventHandler<HTMLButtonElement>;
	headerText?: string;
	variant?: "back" | "filter" | "header";
}

const TopBar: React.FC<TopBarProps> = ({ onClickBack, variant = "back", headerText = "" }) => {
	const theme = useTheme();

	return (
		<AppBar
			position="fixed"
			sx={{
				top: 0,
				left: 0,
				right: 0,
				zIndex: 2,
				height: "60px",
				backgroundColor: theme.palette.background.default,
				color: theme.palette.text.primary,
			}}
		>
			<Toolbar>
				<IconButton edge="start" color="primary" aria-label="back" onClick={onClickBack}>
					<ArrowBackIosNew />
				</IconButton>
				{variant === "header" && (
					<Typography
						variant="h2"
						color="primary.main"
						sx={{ flexGrow: 1, textAlign: "center" }}
						paddingRight="40px"
					>
						{headerText}
					</Typography>
				)}
				{variant === "filter" && (
					<>
						<TextField
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
					</>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default TopBar;
