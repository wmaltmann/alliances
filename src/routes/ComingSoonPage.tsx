import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import Page from "../components/page/Page";

const ComingSoonPage: FC = () => {
	return (
		<Page>
			<Stack height="100%" alignItems="center" justifyContent="center" spacing={2}>
				<Typography variant="h1">Welcome to Alliance Selector</Typography>
				<Typography variant="body1">We are currently building this app</Typography>
			</Stack>
		</Page>
	);
};

export default ComingSoonPage;
