import { Stack, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../app/AppContext";
import ASButton from "../components/common/ASButton";
import Page from "../components/page/Page";
import TopBar from "../components/page/TopBar";
import { signOut } from "../libs/AuthLib";

const ProfilePage: FC = () => {
	const appContextData = useAppContext();
	const navigate = useNavigate();
	const { user } = appContextData;
	const theme = useTheme();

	const handleLogoutClick = async () => {
		try {
			await signOut(appContextData);
			navigate("/");
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	const handleOnClickBack = () => {
		navigate(`/lists`);
	};

	return (
		<Page>
			<TopBar onClickBack={handleOnClickBack} variant="header" headerText="Profile" />
			<Stack height="100%" padding={theme.spacing(2)} paddingTop="60px">
				<Stack spacing={3}>
					<Typography>{`Email: ${user?.profile.email}`} </Typography>
					<ASButton text="Log Out" onClick={() => handleLogoutClick()}></ASButton>
				</Stack>
			</Stack>
		</Page>
	);
};

export default ProfilePage;
