import { AccountTree, FormatListBulleted, GridView, Share } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getFirstSegmentOfUrl } from "../../libs/Utills";

const BottomBar: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const segment = getFirstSegmentOfUrl(location);

	let state = 0;

	switch (segment) {
		case "share":
			state = 3;
			break;
		case "selection":
			state = 2;
			break;
		case "alliances":
			state = 1;
			break;
		default:
			state = 0;
			break;
	}

	return (
		<Paper
			sx={{
				position: "fixed",
				height: "60px",
				bottom: 0,
				left: 0,
				right: 0,
				zIndex: 2,
			}}
			elevation={3}
		>
			<BottomNavigation
				value={state}
				onChange={(event, newValue) => {
					switch (newValue) {
						case 3:
							//Share
							navigate(`/share/${id}`);
							break;
						case 1:
							//Alliances
							navigate(`/alliances/${id}`);
							break;
						case 2:
							//Selection
							navigate(`/selection/${id}`);
							break;
						default:
							//List
							navigate(`/list/${id}`);
							break;
					}
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
