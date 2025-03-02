import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import ASLink from "../../components/common/ASLink";
import LegalLinks from "../../components/common/LegalLinks";
import Page from "../../components/page/Page";
import TopBar from "../../components/page/TopBar";

const AboutPage: FC = () => {
	const navigate = useNavigate();
	const theme = useTheme();
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
				<Box alignSelf="left" padding={theme.spacing(1)}>
					<Typography variant="h1" color="primary" paddingBottom={theme.spacing(2)}>
						About
					</Typography>
					<Typography paddingBottom={theme.spacing(3)}>Updated: Mar 2, 2025</Typography>
					<Typography variant="h2" paddingBottom={theme.spacing(1)}>
						Who's Behind Alliances
					</Typography>
					<Typography variant="body2" padding={theme.spacing(1)}>
						Alliances was created and beta-tested by a group of FRC mentors to improve
						team communication, streamline picklist creation, and simplify the selection
						process. It's available for all teams to use.
					</Typography>
					<Divider sx={{ borderColor: "background.paper", padding: theme.spacing(1) }} />
					<Typography variant="h2" paddingBottom={theme.spacing(1)}>
						Alliances is Open Source
					</Typography>
					<Typography variant="body2" padding={theme.spacing(1)}>
						The Alliances codebase is available under the MIT license. Check out our
						repo on{" "}
						<ASLink
							text="GitHub"
							onClick={() => {
								window.open(
									"https://github.com/wmaltmann/alliances",
									"_blank",
									"noopener,noreferrer",
								);
							}}
							variant="body2"
						/>
						.
					</Typography>
					<Divider sx={{ borderColor: "background.paper", padding: theme.spacing(1) }} />
					<Typography variant="h2" paddingBottom={theme.spacing(1)}>
						Bugs & Features
					</Typography>
					<Typography variant="body2" padding={theme.spacing(1)}>
						The Alliances codebase is public on GitHub. If you find a bug or have a
						feature request, you can{" "}
						<ASLink
							text="report an issue"
							onClick={() => {
								window.open(
									"https://github.com/wmaltmann/alliances/issues",
									"_blank",
									"noopener,noreferrer",
								);
							}}
							variant="body2"
						/>{" "}
						or submit a pull request.
					</Typography>
				</Box>
				<LegalLinks />
			</Stack>
		</Page>
	);
};

export default AboutPage;
