import { Avatar, Stack, Typography, useTheme } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";
import EventList from "../../components/common/EventList";
import FloatingButton from "../../components/common/FloatingButton";
import Page from "../../components/page/Page";
import { getUserPicklists } from "../../model/picklist/picklist.Manager";

const ListsPage: FC = () => {
	const navigate = useNavigate();
	const { user, lists } = useAppContext();
	const picklists = lists.picklists;
	const setPicklists = lists.setPicklists;

	const theme = useTheme();

	useEffect(() => {
		const loading = async () => {
			if (user) {
				const newPicklists = await getUserPicklists(user?.id);
				setPicklists(newPicklists);
			}
		};
		void loading();
	}, [user]);

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
				<EventList picklists={picklists ? picklists : []}></EventList>
			</Stack>
			<FloatingButton
				text="Create Picklist"
				onClick={handleNew}
				extended={(picklists?.length || 0) < 2}
			/>
		</Page>
	);
};

export default ListsPage;
