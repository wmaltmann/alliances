import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../libs/FirebaseLib";

export const LoginPage = () => {
	const [user] = useAuthState(auth);
	const navigate = useNavigate();
	const { search } = useLocation();
	const [userEmail, setUserEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [infoMessage, setInfoMessage] = useState("");
	useEffect(() => {
		const authenticateUser = async () => {
			if (user) {
				navigate("/");
				return;
			}
			if (isSignInWithEmailLink(auth, window.location.href)) {
				let emailFromStorage = localStorage.getItem("email");
				if (!emailFromStorage) {
					emailFromStorage = window.prompt("Please provide your email");
				}
				setIsLoading(true);
				try {
					await signInWithEmailLink(auth, emailFromStorage!, window.location.href);
					localStorage.removeItem("email");
					navigate("/");
				} catch (error) {
					setErrorMessage((error as Error).message);
					navigate("/login");
				} finally {
					setIsLoading(false);
				}
			}
		};
		void authenticateUser();
	}, [user, search, navigate]);
	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		try {
			await sendSignInLinkToEmail(auth, userEmail, {
				url: "http://localhost:3000/login",
				handleCodeInApp: true,
			});
			localStorage.setItem("email", userEmail);
			setInfoMessage("We have sent you an email with a link to sign in");
		} catch (error) {
			setErrorMessage((error as Error).message);
		} finally {
			setIsLoading(false);
		}
	};
	const LoginForm = () => (
		<form className="form-group custom-form" onSubmit={handleLogin}>
			<label>Email</label>
			<input
				type="email"
				required
				placeholder="Enter Email"
				className="form-control"
				value={userEmail}
				onChange={(e) => setUserEmail(e.target.value)}
			/>
			<button type="submit" className="btn btn-success btn-md">
				{isLoading ? "Logging you in" : "Login"}
			</button>
			{errorMessage && <div className="error-msg">{errorMessage}</div>}
			{infoMessage && <div className="info-msg">{infoMessage}</div>}
		</form>
	);
	if (isLoading) {
		return <div>Loading...</div>;
	}
	return <div className="box">{user ? <div>Please wait...</div> : <LoginForm />}</div>;
};
/* <TopBar />
			<AppContainer>
				<Stack alignItems="center" justifyContent="center" height="100%">
					<Stack spacing={2} component="form" onSubmit={handleSubmit} width="300px">
						<Typography variant="body1"> Enter email to continue</Typography>
						<TextField
							variant="standard"
							required
							id="email"
							label="Email"
							type="email"
							value={email}
							onChange={handleChange}
						/>
						<Button variant="contained" type="submit" color="primary">
							Submit
						</Button>
					</Stack>
				</Stack>
			</AppContainer> */

export default LoginPage;
