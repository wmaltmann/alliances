import { Box, Stack } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import BottomBar from "../../components/page/BottomBar";
import Page from "../../components/page/Page";
import TopBar from "../../components/page/TopBar";

const DashboardPage: FC = () => {
	const navigate = useNavigate();
	const handleBackOnClick = () => {
		navigate(`/events`);
	};
	return (
		<>
			<TopBar onClickBack={handleBackOnClick} />
			<Page>
				<Stack width="100%" paddingBottom="60px" paddingTop="60px">
					<Box bgcolor="primary.main" height="38px" width="60px" padding="2px" />
					<Box bgcolor="primary.main" height="38px" width="60px" padding="2px" />
					<Box bgcolor="primary.main" height="38px" width="60px" padding="2px" />
					<Box bgcolor="primary.main" height="38px" width="60px" padding="2px" />
					<Box bgcolor="primary.main" height="38px" width="60px" padding="2px" />
					<Box bgcolor="primary.main" height="38px" width="60px" padding="2px" />
					<Box bgcolor="primary.main" height="38px" width="60px" padding="2px" />
					<Box bgcolor="primary.main" height="38px" width="60px" padding="2px" />
				</Stack>
			</Page>
			<BottomBar />
		</>
	);
};

export default DashboardPage;
