import { AccountTree, FormatListBulleted, GridView, Share } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";

const BottomBar: React.FC = () => {
	const context = useAppContext();
	const state = context.bottomBar.state;
	const setState = context.bottomBar.setState;
	const location = useLocation();
	const navigate = useNavigate();
	const currentPath = location.pathname;

	const basePath = currentPath.split("/").slice(0, -1).join("/");

	useEffect(() => {
		switch (state) {
			case 3:
				//Share
				navigate(basePath + `/share`);
				break;
			case 1:
				//Bracket
				navigate(basePath + `/alliances`);
				break;
			case 2:
				//Selection
				navigate(basePath + `/selection`);
				break;
			default:
				//List
				navigate(basePath + `/list`);
				break;
		}
	}, [state]);

	return (
		<Paper
			sx={{
				position: "fixed",
				height: "60px",
				bottom: 0,
				left: 0,
				right: 0,
				zIndex: 1000,
			}}
			elevation={3}
		>
			<BottomNavigation
				value={state}
				onChange={(event, newValue) => {
					setState(newValue);
				}}
				showLabels
			>
				<BottomNavigationAction label="PickList" icon={<FormatListBulleted />} />
				<BottomNavigationAction label="Alliances" icon={<AccountTree />} />
				<BottomNavigationAction label="Selection" icon={<GridView />} />
				<BottomNavigationAction label="Share" icon={<Share />} />
			</BottomNavigation>
		</Paper>
	);
};

export default BottomBar;
