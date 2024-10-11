import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import BottomBar from "../components/page/BottomBar";
import Page from "../components/page/Page";
import TopBar from "../components/page/TopBar";

const ListPage: FC = () => {
	const navigate = useNavigate();
	const handleBackOnClick = () => {
		navigate(`/events`);
	};
	return (
		<>
			<TopBar onClickBack={handleBackOnClick} />
			<Page>
				<Stack width="100%" paddingBottom="60px" paddingTop="60px">
					<Typography>TextA</Typography>
					<Typography>TextB</Typography>
					<Typography>TextC</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text</Typography>
					<Typography>Text5</Typography>
					<Typography>Text4</Typography>
					<Typography>Text3</Typography>
					<Typography>Text2</Typography>
					<Typography>Text1</Typography>
				</Stack>
			</Page>
			<BottomBar />
		</>
	);
};

export default ListPage;
