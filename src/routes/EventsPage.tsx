import { AccountCircle } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import EventList from "../components/common/EventList";
import Page from "../components/page/Page";
import { Event } from "../model/event/event.Model";

const EventsPage: FC = () => {
	const events: Event[] = [
		{ id: "1", name: "Event 1" },
		{ id: "2", name: "Event 2" },
		{ id: "2", name: "Event 2" },
		{ id: "2", name: "Event 2" },
		{ id: "2", name: "Event 2" },
		{ id: "2", name: "Event 2" },
		{ id: "2", name: "Event 2" },
		{ id: "2", name: "Event 2" },
		{ id: "2", name: "Event 2" },
		{ id: "2", name: "Event 2" },
		{ id: "2", name: "Event 2" },
		{ id: "2", name: "Event 2" },
		{ id: "2", name: "Event 2" },
		{ id: "2", name: "Event 2" },
		{ id: "2", name: "Event 2" },
		{ id: "2", name: "Event 2" },
	];
	return (
		<Page>
			<Stack height="100%" width="100%">
				<Stack direction="row">
					<Typography variant="h2">Alliances</Typography>
					<AccountCircle />
				</Stack>
				<EventList events={events}></EventList>
			</Stack>
		</Page>
	);
};

export default EventsPage;
