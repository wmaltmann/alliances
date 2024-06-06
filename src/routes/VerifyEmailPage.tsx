import { Stack, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../app/AppContext";
import ASLink from "../components/common/ASLink";
import Page from "../components/page/Page";
import { sendVerifyEmail } from "../libs/AuthLib";

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

	const handleSendNewLink = async () => {
		try {
			const email = await sendVerifyEmail();
			return email;
		} catch (error) {
			console.log(error);
		}
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
					<Typography variant="h3">Please verify your email address</Typography>
					<Typography variant="body2">
						We sent a verification link to the email address you used to create your
						account. Please follow the link in the email to complete the verification
						process. Then, click here to
						<ASLink
							text=" continue"
							onClick={() => {
								window.location.reload();
							}}
						/>
						.
					</Typography>
					<Typography variant="body2">
						If your email verification link has expired or did not work. Click here to
						<ASLink
							text=" receive a new link"
							onClick={async () => {
								const email = await handleSendNewLink();
								appContextData.alerts.addAlert(
									"success",
									`Verification email sent to: ${email}`,
								);
							}}
						/>
						.
					</Typography>
				</Stack>
				<Typography variant="body2" paddingBottom={theme.spacing(2)}>
					Already have an account? <ASLink text="login" onClick={handleLogin} />
				</Typography>
			</Stack>
		</Page>
	);
};

export default VerifyEmailPage;
