import { Divider, Stack, Typography, useTheme } from "@mui/material";
import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../app/AppContext";
import SignInWithGoogleButton from "../assets/google/web_light_sq_SI.svg";
import ASButton from "../components/common/ASButton";
import ASLink from "../components/common/ASLink";
import ASTextField from "../components/common/ASTextField";
import Page from "../components/page/Page";
import { loginWithPassword } from "../libs/AuthLib";

export const LoginPage = () => {
	const theme = useTheme();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const appContextData = useAppContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (appContextData.user) {
			navigate("/");
		}
	}, [appContextData.user]);

	const signInWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		const auth = getAuth();
		await signInWithRedirect(auth, provider);
	};

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await loginWithPassword(email, password, appContextData);
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};
	const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};
	const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleSignUp = () => {
		navigate("/signup");
	};
	const handleForgotPassword = () => {
		navigate("/forgotpassword");
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
				<Stack spacing={3} component="form" onSubmit={handleLogin}>
					<Typography variant="body1">Login</Typography>
					<ASTextField
						required
						id="email"
						label="Email"
						type="email"
						value={email}
						onChange={handleEmail}
						fullWidth
					/>
					<ASTextField
						required
						id="password"
						label="Password"
						type="password"
						value={password}
						onChange={handlePassword}
						fullWidth
					/>
					<Typography
						textAlign="right"
						variant="body2"
						style={{ marginTop: theme.spacing(1) }}
					>
						<ASLink text="Forgot password?" onClick={handleForgotPassword} />
					</Typography>
					<ASButton type="submit" text="Sign in" />
					<Typography variant="body2">
						<Divider>Or</Divider>
					</Typography>
					<img
						src={SignInWithGoogleButton}
						alt={"Sign in with Google"}
						onClick={() => {
							void signInWithGoogle();
						}}
						style={{ cursor: "pointer", height: "40px" }}
					/>
				</Stack>
				<Typography variant="body2" paddingBottom={theme.spacing(2)}>
					Don't have an account? <ASLink text="Sign up" onClick={handleSignUp} />
				</Typography>
			</Stack>
		</Page>
	);
};

export default LoginPage;
