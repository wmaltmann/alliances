import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useAppContext } from "../app/AppContext";
import Page from "../components/page/Page";

const ProfilePage: FC = () => {
	const { user } = useAppContext();
	return (
		<Page>
			<Stack height="100%" alignItems="center" justifyContent="center">
				<Stack spacing={3}>
					<Typography variant="h1">Profile</Typography>
					<Stack>
						<Typography>{`Email: ${user?.profile.email}`} </Typography>
					</Stack>
				</Stack>
			</Stack>
		</Page>
	);
};

export default ProfilePage;
