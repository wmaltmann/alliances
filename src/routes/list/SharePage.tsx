import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import BottomBar from "../../components/page/BottomBar";
import Page from "../../components/page/Page";
import TopBar from "../../components/page/TopBar";

const SharePage: FC = () => {
	const navigate = useNavigate();
	const handleBackOnClick = () => {
		navigate(`/events`);
	};
	return (
		<>
			<TopBar onClickBack={handleBackOnClick} />
			<Page>
				<Stack width="100%" paddingBottom="60px" paddingTop="60px">
					<Typography>Share</Typography>
				</Stack>
			</Page>
			<BottomBar />
		</>
	);
};

export default SharePage;
