import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import Page from "../components/page/Page";

const ProfilePage: FC = () => {
	return (
		<Page>
			<Stack height="100%" alignItems="center" justifyContent="center">
				<Typography>Profile Page</Typography>
			</Stack>
		</Page>
	);
};

export default ProfilePage;
