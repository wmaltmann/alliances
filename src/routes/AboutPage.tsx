import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import Page from "../components/page/Page";

const AboutPage: FC = () => {
	return (
		<Page>
			<Stack height="100%" alignItems="center" justifyContent="center">
				<Typography>About Page</Typography>
			</Stack>
		</Page>
	);
};

export default AboutPage;
