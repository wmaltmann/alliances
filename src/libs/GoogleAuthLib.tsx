import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { v4 as uuidv4 } from "uuid";

interface JwtPayload {
	iss?: string;
	sub?: string;
	aud?: string | string[];
	exp?: number;
	iat?: number;
	nonce?: string;
	given_name?: string;
	family_name?: string;
	email_verified?: string;
	email?: string;
}

const GoogleAuth: React.FC = () => {
	const nonce = uuidv4();
	const handleSuccess = (credentialResponse: CredentialResponse) => {
		if (credentialResponse.credential) {
			const jwtPayload: JwtPayload = jwtDecode(credentialResponse.credential);
			if (nonce !== jwtPayload.nonce) {
				console.log("Login Failed");
			}
			console.log(jwtPayload.family_name);
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
			nonce={nonce}
		/>
	);
};

export default GoogleAuth;
