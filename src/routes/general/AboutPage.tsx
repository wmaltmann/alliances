import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import LegalLinks from "../../components/common/LegalLinks";
import Page from "../../components/page/Page";
import TopBar from "../../components/page/TopBar";

const AboutPage: FC = () => {
	const navigate = useNavigate();
	return (
		<Page>
			<TopBar
				onClickBack={() => {
					navigate(-1);
				}}
			/>
			<Stack
				height="100%"
				alignItems="center"
				justifyContent="space-between"
				paddingTop="60px"
			>
				<Typography>About Page</Typography>
				<LegalLinks />
			</Stack>
		</Page>
	);
};

export default AboutPage;

//TODO
// add background about why
// add contact
// add github
// add issues
