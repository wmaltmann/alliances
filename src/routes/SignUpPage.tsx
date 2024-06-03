import { Divider, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../app/AppContext";
import SignInWithGoogleButton from "../assets/google/web_light_sq_SU.svg";
import ASButton from "../components/common/ASButton";
import ASLink from "../components/common/ASLink";
import ASTextField from "../components/common/ASTextField";
import Page from "../components/page/Page";
import {
	signInWithGoogle,
	signUpWithEmailAndPassword,
	validateEmail,
	validatePassword,
} from "../libs/AuthLib";

export const SignUpPage = () => {
	const theme = useTheme();
	const [email, setEmail] = useState<string>("");
	const [emailError, setEmailError] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordError, setPasswordError] = useState<string>("");
	const appContextData = useAppContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (appContextData.user) {
			navigate("/");
		}
	}, [appContextData.user]);

	const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await signUpWithEmailAndPassword(email, password);
			navigate("/verifyemail");
		} catch (error) {
			console.log(error);
		}
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
		if (emailError) {
			try {
				validateEmail(event.target.value);
				setEmailError("");
			} catch (error) {
				setEmailError((error as Error).message);
			}
		}
	};

	const handleEmailBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
		try {
			validateEmail(event.target.value);
		} catch (error) {
			setEmailError((error as Error).message);
		}
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
		if (passwordError) {
			try {
				validatePassword(event.target.value);
				setPasswordError("");
			} catch (error) {
				setPasswordError((error as Error).message);
			}
		}
	};

	const handlePasswordBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
		try {
			validatePassword(event.target.value);
			setPasswordError("");
		} catch (error) {
			setPasswordError((error as Error).message);
		}
	};

	const handleSignIn = () => {
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
				<Stack spacing={3} component="form" onSubmit={handleSignUp} width="300px">
					<Typography variant="body1">Sign up</Typography>
					<ASTextField
						required
						id="email"
						label="Email"
						type="email"
						value={email}
						onChange={handleEmailChange}
						onBlur={handleEmailBlur}
						error={emailError}
						fullWidth
						showCapsLock
					/>
					<ASTextField
						required
						id="password"
						label="Password"
						type="password"
						value={password}
						onChange={handlePasswordChange}
						onBlur={handlePasswordBlur}
						error={passwordError}
						fullWidth
						showCapsLock
					/>
					<ASButton type="submit" text="Sign up" />
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
					Already have an account? <ASLink text="Login" onClick={handleSignIn} />
				</Typography>
			</Stack>
		</Page>
	);
};

export default SignUpPage;
