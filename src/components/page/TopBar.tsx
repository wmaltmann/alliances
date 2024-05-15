import { AccountCircle, Menu } from "@mui/icons-material";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";
import { signOut } from "../../libs/AuthLib";
import { auth as fbAuth, getAppStage } from "../../libs/FirebaseLib";

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
		</AppBar>
	);
};

export default TopBar;
