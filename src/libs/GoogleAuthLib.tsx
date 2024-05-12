import React from "react";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";

const GoogleAuth: React.FC = () => {
	const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
		console.log(response);
		// Handle authentication response here
	};

	return (
		<GoogleLogin
			clientId="YOUR_CLIENT_ID"
			buttonText="Login with Google"
			onSuccess={responseGoogle}
			onFailure={responseGoogle}
			cookiePolicy={"single_host_origin"}
		/>
	);
};

export default GoogleAuth;
