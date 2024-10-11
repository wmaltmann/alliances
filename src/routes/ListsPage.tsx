import { Avatar, Stack, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../app/AppContext";
import EventList from "../components/common/EventList";
import FloatingButton from "../components/common/FloatingButton";
import Page from "../components/page/Page";
import { Picklist } from "../model/picklist/picklist.Model";

const ListsPage: FC = () => {
	const navigate = useNavigate();
	const { user } = useAppContext();
	const theme = useTheme();
	const picklists: Picklist[] = [
		{ id: "1", name: "Event 1" },
		{ id: "2", name: "Event 2" },
		{ id: "2", name: "Event 2" },
		{ id: "2", name: "Event 2" },
	];

	const handleAvatarClick = () => {
		navigate("/profile");
	};

	const handleNew = () => {
		navigate("/newlist");
	};

	return (
		<Page>
			<Stack height="100%" width="100%" spacing={theme.spacing(1)} paddingTop="8px">
				<Typography variant="h1" color="primary.main" textAlign="center">
					Alliances
				</Typography>
				<Stack direction="row" justifyContent="center">
					<Avatar
						sx={{ bgcolor: user?.profile.color }}
						onClick={() => handleAvatarClick()}
					>
						{user?.profile.email.substring(0, 2)}
					</Avatar>
				</Stack>
				<EventList picklists={picklists}></EventList>
			</Stack>
			<FloatingButton text="Create Picklist" onClick={handleNew} extended />
		</Page>
	);
};

export default ListsPage;
