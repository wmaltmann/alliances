import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import Page from "../components/page/Page";

const WelcomePage: FC = () => {
	return (
		<Page>
			<Stack height="100%" alignItems="center" justifyContent="center">
				<Typography>Welcome</Typography>
			</Stack>
		</Page>
	);
};

export default WelcomePage;
