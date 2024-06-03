import { Stack, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../app/AppContext";
import ASLink from "../components/common/ASLink";
import Page from "../components/page/Page";

export const VerifyEmailPage = () => {
	const theme = useTheme();
	const appContextData = useAppContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (appContextData.user) {
			navigate("/");
		}
	}, [appContextData.user]);

	const handleLogin = () => {
		navigate("/login");
	};

	return (
		<Page>
			<Stack alignItems="center" justifyContent="space-between" height="100%">
				<Typography
					variant="h1"
					color={theme.palette.primary.main}
					paddingTop={theme.spacing(6)}
				>
					Alliance Selector
				</Typography>
				<Stack spacing={3} width="300px">
					<Typography>We sent a verification email.</Typography>
				</Stack>
				<Typography variant="body2" paddingBottom={theme.spacing(2)}>
					Already have an account? <ASLink text="login" onClick={handleLogin} />
				</Typography>
			</Stack>
		</Page>
	);
};

export default VerifyEmailPage;
