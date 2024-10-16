import { ArrowBack } from "@mui/icons-material";
import { Link, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";
import ASButton from "../../components/common/ASButton";
import ASTextField from "../../components/common/ASTextField";
import BorderBox from "../../components/common/BorderBox";
import Loading from "../../components/common/Loading";
import Page from "../../components/page/Page";
import { getAuthEmail, loginWithLink, passwordlessLogin } from "../../libs/AuthLib";
import { fbAuth } from "../../libs/FirebaseLib";

export const LoginPage = () => {
	const [user] = useAuthState(fbAuth);
	const appContextData = useAppContext();
	const navigate = useNavigate();
	const { search } = useLocation();
	const [email, setEmail] = useState<string>("");
	const [state, setState] = useState<
		"loading" | "login" | "confirmation" | "error" | "reset_password"
	>("login");
	const [error, setError] = useState<string | undefined>(undefined);
	const theme = useTheme();

	useEffect(() => {
		const authenticate = async () => {
			setState("loading");
			try {
				const response = await loginWithLink(appContextData);
				if (response) {
					navigate("/");
				} else {
					setState("login");
				}
			} catch (error) {
				if (email === "") {
					const tempEmail = getAuthEmail();
					if (tempEmail) {
						setEmail(tempEmail);
					}
				}
				setError((error as Error).message);
				setState("error");
			}
		};
		void authenticate();
	}, [user, search, navigate]);

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setState("loading");
		try {
			await passwordlessLogin(email);
			setState("confirmation");
		} catch (error) {
			setError((error as Error).message);
			setState("error");
		}
	};
	const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handleBack = () => {
		navigate("/");
	};

	return (
		<Page>
			<ArrowBack onClick={handleBack} />
			<Stack alignItems="center" height="100%">
				<Typography
					variant="h1"
					color={theme.palette.primary.main}
					paddingTop={theme.spacing(5)}
				>
					Alliance Selector
				</Typography>
				{state === "loading" && <Loading />}
				{state === "login" && (
					<Stack spacing={3} component="form" onSubmit={handleLogin}>
						<Typography variant="body1">Enter your email to Login</Typography>
						<ASTextField
							required
							id="email"
							label="Email"
							type="email"
							value={email}
							onChange={handleEmail}
							fullWidth
						/>
						<ASButton type="submit" text="Sign in" />
					</Stack>
				)}
				{state === "confirmation" && (
					<BorderBox width="300px">
						<Stack spacing={1} alignItems="center">
							<Typography variant="body1">We sent a login link to:</Typography>
							<Typography variant="body1" color={theme.palette.primary.main}>
								{email}
							</Typography>
							<Typography variant="body1">
								Click the link in the email to continue.
							</Typography>
							<Typography variant="body2">
								<Link href="#" onClick={() => setState("login")}>
									return to login page
								</Link>
							</Typography>
						</Stack>
					</BorderBox>
				)}
				{state === "error" && (
					<BorderBox width="300px">
						<Stack spacing={1} alignItems="center">
							<Typography variant="body1">
								We've encountered an error logging you in with email:
							</Typography>
							<Typography variant="body1" color={theme.palette.primary.main}>
								{email}
							</Typography>
							<Typography variant="error1">{error}</Typography>
							<Typography variant="body2">
								<Link href="#" onClick={() => setState("login")}>
									return to login page
								</Link>
							</Typography>
						</Stack>
					</BorderBox>
				)}
			</Stack>
		</Page>
	);
};

export default LoginPage;
