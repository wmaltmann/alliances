import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useAppContext } from "../app/AppContext";
import Page from "../components/page/Page";

const ProfilePage: FC = () => {
	const { user } = useAppContext();
	return (
		<Page>
			<Stack height="100%" alignItems="center" justifyContent="center">
				<Box>
					<Typography variant="h1">Profile</Typography>
					<Typography>{`Email: ${user?.profile.email}`}: </Typography>
				</Box>
			</Stack>
		</Page>
	);
};

export default ProfilePage;
