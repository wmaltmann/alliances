import { Stack, Typography } from "@mui/material";
import AppContainer from "../components/AppContainer";
import TopBar from "../components/TopBar";
import GoogleAuth from "../libs/GoogleAuthLib";

const LoginPage = () => {
	return (
		<>
			<TopBar />
			<AppContainer>
				<Stack alignItems="center" justifyContent="center" height="100%">
					<Typography variant="body1"> Login to continue</Typography>
					<GoogleAuth />
				</Stack>
			</AppContainer>
		</>
	);
};

export default LoginPage;
