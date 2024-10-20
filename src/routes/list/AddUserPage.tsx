import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";
import Page from "../../components/page/Page";
import TopBar from "../../components/page/TopBar";

const AddUserPage: FC = () => {
	const navigate = useNavigate();
	const {
		lists: { activePicklistId },
	} = useAppContext();
	const handleOnClickBack = () => {
		navigate(`/${activePicklistId}/list`);
	};
	return (
		<Page>
			<TopBar onClickBack={handleOnClickBack} />

			<Stack height="100%" paddingTop="60px">
				<Typography>Test</Typography>
			</Stack>
		</Page>
	);
};

export default AddUserPage;
