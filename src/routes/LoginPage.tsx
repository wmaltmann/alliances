import { Link, Stack, Typography, useTheme } from "@mui/material";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../app/AppContext";
import Page from "../components/page/Page";
import ASButton from "../components/page/common/ASButton";
import ASTextField from "../components/page/common/ASTextField";
import BorderBox from "../components/page/common/BorderBox";
import Loading from "../components/page/common/Loading";
import { PasswordlessLogin } from "../libs/AuthLib";
import { auth as fbAuth } from "../libs/FirebaseLib";

export const LoginPage = () => {
	const { auth } = useAppContext();
	const [user] = useAuthState(fbAuth);
	const navigate = useNavigate();
	const { search } = useLocation();
	const [email, setEmail] = useState("");
	const [state, setState] = useState<"loading" | "login" | "confirmation" | "error">("login");
	const [error, setError] = useState<string | undefined>(undefined);
	const theme = useTheme();

	useEffect(() => {
		const authenticateUser = async () => {
			if (user) {
				auth.setUser(user);
				navigate("/");
				return;
			}
			if (isSignInWithEmailLink(fbAuth, window.location.href)) {
				const emailFromStorage = localStorage.getItem("email");
				if (!emailFromStorage) {
					console.log("error");
				}
				setState("loading");
				try {
					await signInWithEmailLink(fbAuth, emailFromStorage!, window.location.href);
					//localStorage.removeItem("email");
					navigate("/");
				} catch (error) {
					console.log("error", error);
					navigate("/login");
					setState("login");
				}
			}
		};
		void authenticateUser();
	}, [user, search, navigate]);

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setState("loading");
		try {
			await PasswordlessLogin(email);
		} catch (error) {
			setError((error as Error).message);
			setState("error");
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	return (
		<Page>
			<Stack alignItems="center" justifyContent="center" height="100%">
				{state === "loading" && <Loading />}
				{state === "login" && (
					<BorderBox width="300px">
						<Stack
							spacing={3}
							component="form"
							onSubmit={handleLogin}
							alignItems="center"
						>
							<Typography variant="body1">Enter your email to Login</Typography>
							<ASTextField
								required
								id="email"
								label="Email"
								type="email"
								value={email}
								onChange={handleChange}
								fullWidth
							/>
							<ASButton type="submit" text="Submit" width="120px" />
						</Stack>
					</BorderBox>
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
