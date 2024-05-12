import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import React from "react";

const GoogleAuth: React.FC = () => {
	const handleSuccess = (credentialResponse: CredentialResponse) => {
		if (credentialResponse.credential) {
			const userData = jwtDecode(credentialResponse.credential);
			console.log(userData);
		}
	};

	const handleError = () => {
		console.log("Login Failed");
	};

	return (
		<GoogleLogin
			onSuccess={handleSuccess}
			onError={handleError}
			auto_select={false}
			nonce="test"
		/>
	);
};

export default GoogleAuth;
