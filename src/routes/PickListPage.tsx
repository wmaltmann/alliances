import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import Page from "../components/page/Page";
import TopBar from "../components/page/TopBar";

const PickListPage: FC = () => {
	return (
		<Page>
			<TopBar />
			<Stack height="100%" alignItems="center" justifyContent="center">
				<Typography variant="h1">Pick List</Typography>
			</Stack>
		</Page>
	);
};

export default PickListPage;
