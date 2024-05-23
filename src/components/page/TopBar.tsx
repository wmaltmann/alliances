import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";
import { getAppStage } from "../../app/AppUtils";
import { signOut } from "../../libs/AuthLib";
import { fbAuth } from "../../libs/FirebaseLib";

enum MenuOptions {
	About = "About",
	Profile = "Profile",
	Home = "Home",
}

const TopBar: FC = () => {
	const [user] = useAuthState(fbAuth);
	const appContextData = useAppContext();
	const navigate = useNavigate();
	const stage = getAppStage();

	useEffect(() => {
		if (user) {
			appContextData.auth.setFbUser(user);
		} else appContextData.auth.setFbUser(undefined);
	}, [user]);

	const handleLoginClick = () => {
		navigate("/login");
	};

	const handleLogoutClick = async () => {
		try {
			await signOut(appContextData);
			navigate("/");
		} catch (error) {
			console.error("Error logging out:", error);
		}
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
				{appContextData.user ? (
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
				{appContextData.user
					? [
							<MenuItem
								key="profile"
								onClick={() => handleClose(MenuOptions.Profile)}
							>
								Profile
							</MenuItem>,
							<MenuItem key="about" onClick={() => handleClose(MenuOptions.About)}>
								About
							</MenuItem>,
						]
					: [
							<MenuItem key="home" onClick={() => handleClose(MenuOptions.Home)}>
								Home
							</MenuItem>,
							<MenuItem key="about" onClick={() => handleClose(MenuOptions.About)}>
								About
							</MenuItem>,
						]}
			</Menu>
		</AppBar>
	);
};

export default TopBar;
