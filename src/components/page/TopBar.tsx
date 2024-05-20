import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";
import { getAppStage } from "../../app/AppUtils";
import { signOut } from "../../libs/AuthLib";
import { auth as fbAuth } from "../../libs/FirebaseLib";

enum MenuOptions {
	About = "About",
	Profile = "Profile",
	Home = "Home",
}

const TopBar: FC = () => {
	const [user] = useAuthState(fbAuth);
	const { auth } = useAppContext();
	const navigate = useNavigate();
	const stage = getAppStage();

	useEffect(() => {
		if (user) {
			auth.setUser(user);
		} else auth.setUser(undefined);
	}, [user]);

	const handleLoginClick = () => {
		navigate("/login");
	};

	const handleLogoutClick = async () => {
		await signOut(navigate, auth);
	};

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = (menuOption: MenuOptions) => {
		setAnchorEl(null);
		switch (menuOption) {
			case MenuOptions.About:
				navigate("/about");
				break;
			case MenuOptions.Profile:
				navigate("/profile");
				break;
			case MenuOptions.Home:
				navigate("/");
				break;
			default:
				break;
		}
	};
	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
					onClick={handleClick}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
					{stage === "beta"
						? "Alliance Selector Beta"
						: stage === "local"
							? "Alliance Selector Local"
							: "Alliance Selector"}
				</Typography>
				{auth.user ? (
					<>
						<AccountCircle />
						<Button color="inherit" onClick={handleLogoutClick}>
							Logout
						</Button>
					</>
				) : (
					<Button color="inherit" onClick={handleLoginClick}>
						Login
					</Button>
				)}
			</Toolbar>
			<Menu
				id="basic-menu"
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				{auth.user ? (
					<>
						<MenuItem onClick={() => handleClose(MenuOptions.Profile)}>
							Profile
						</MenuItem>
						<MenuItem onClick={() => handleClose(MenuOptions.About)}>About</MenuItem>
					</>
				) : (
					<>
						<MenuItem onClick={() => handleClose(MenuOptions.Home)}>Home</MenuItem>
						<MenuItem onClick={() => handleClose(MenuOptions.About)}>About</MenuItem>
					</>
				)}
			</Menu>
		</AppBar>
	);
};

export default TopBar;
