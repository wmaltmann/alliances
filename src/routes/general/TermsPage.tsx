import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import ASLink from "../../components/common/ASLink";
import LegalLinks from "../../components/common/LegalLinks";
import Page from "../../components/page/Page";
import TopBar from "../../components/page/TopBar";

const TermsPage: FC = () => {
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
						Terms of Use
					</Typography>
					<Typography paddingBottom={theme.spacing(3)}>Updated: Mar 2, 2025</Typography>

					<Typography variant="h2" paddingBottom={theme.spacing(1)}>
						Open-Source License
					</Typography>
					<Typography variant="body2" padding={theme.spacing(1)}>
						Alliances is licensed under the MIT License. You are free to use, modify,
						and distribute the software, provided you include the original license in
						any distributed copies. The full license can be found in the repository.
					</Typography>
					<Divider sx={{ borderColor: "background.paper", padding: theme.spacing(1) }} />

					<Typography variant="h2" paddingBottom={theme.spacing(1)}>
						Contributions
					</Typography>
					<Typography variant="body2" padding={theme.spacing(1)}>
						We welcome contributions! By submitting code, documentation, or other
						content, you agree to license your contributions under the MIT License.
						Please follow our contribution guidelines outlined in the repository.
					</Typography>
					<Divider sx={{ borderColor: "background.paper", padding: theme.spacing(1) }} />

					<Typography variant="h2" paddingBottom={theme.spacing(1)}>
						No Warranties or Guarantees
					</Typography>
					<Typography variant="body2" padding={theme.spacing(1)}>
						This project is provided "as is," without any express or implied warranties.
						The maintainers are not responsible for any issues, data loss, or damages
						that may result from using the software.
					</Typography>
					<Divider sx={{ borderColor: "background.paper", padding: theme.spacing(1) }} />

					<Typography variant="h2" paddingBottom={theme.spacing(1)}>
						No Service Commitments
					</Typography>
					<Typography variant="body2" padding={theme.spacing(1)}>
						Alliances is maintained on a voluntary basis, and we do not guarantee
						updates, bug fixes, or support. Response times for issues and pull requests
						may be slow due to our other commitments.
					</Typography>
					<Divider sx={{ borderColor: "background.paper", padding: theme.spacing(1) }} />

					<Typography variant="h2" paddingBottom={theme.spacing(1)}>
						Third-Party Code & Dependencies
					</Typography>
					<Typography variant="body2" padding={theme.spacing(1)}>
						This project may use third-party libraries or APIs, each with its own
						licensing terms. We are not responsible for issues related to third-party
						dependencies.
					</Typography>
					<Divider sx={{ borderColor: "background.paper", padding: theme.spacing(1) }} />

					<Typography variant="h2" paddingBottom={theme.spacing(1)}>
						Limitation of Liability
					</Typography>
					<Typography variant="body2" padding={theme.spacing(1)}>
						Under no circumstances shall the maintainers be held liable for any damages
						arising from the use or inability to use this software.
					</Typography>
					<Divider sx={{ borderColor: "background.paper", padding: theme.spacing(1) }} />

					<Typography variant="h2" paddingBottom={theme.spacing(1)}>
						Governing Law
					</Typography>
					<Typography variant="body2" padding={theme.spacing(1)}>
						These terms are governed by the laws of Texas. Any disputes must be resolved
						in accordance with these laws.
					</Typography>
					<Divider sx={{ borderColor: "background.paper", padding: theme.spacing(1) }} />

					<Typography variant="h2" paddingBottom={theme.spacing(1)}>
						Contact
					</Typography>
					<Typography variant="body2" padding={theme.spacing(1)}>
						For questions or issues, please open an issue on the{" "}
						<ASLink
							text="GitHub repository"
							onClick={() => {
								window.open(
									"https://github.com/wmaltmann/alliances/issues",
									"_blank",
									"noopener,noreferrer",
								);
							}}
							variant="body2"
						/>
						.
					</Typography>
				</Box>

				<LegalLinks />
			</Stack>
		</Page>
	);
};

export default TermsPage;

//TODO
//What are my terms
