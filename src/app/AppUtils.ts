export const getAppStage = () => {
	return process.env.REACT_APP_STAGE === "local"
		? "local"
		: process.env.REACT_APP_STAGE === "beta"
			? "beta"
			: "prod";
};

export const getAppBaseUrl = () => {
	const stage = getAppStage();
	switch (stage) {
		case "local":
			return "http://localhost:3000/";
		case "beta":
			return "https://alliances-beta.web.app/";
		default:
			return "https://alliances.web.app/";
	}
};
