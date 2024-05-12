import { Menu } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { FC } from "react";

const TopBar: FC = () => {
	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
				>
					<Menu />
				</IconButton>
				<Typography variant="h1">Alliance Selector</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default TopBar;
