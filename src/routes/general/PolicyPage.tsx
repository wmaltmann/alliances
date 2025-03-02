import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import ASLink from "../../components/common/ASLink";
import LegalLinks from "../../components/common/LegalLinks";
import Page from "../../components/page/Page";
import TopBar from "../../components/page/TopBar";

const PolicyPage: FC = () => {
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
						Privacy Policy
					</Typography>
					<Typography paddingBottom={theme.spacing(3)}>Updated: Mar 2, 2025</Typography>
					<Typography variant="h2" paddingBottom={theme.spacing(1)}>
						The Short Version
					</Typography>
					<Typography variant="body2" padding={theme.spacing(1)}>
						We collect your information only with your consent; we only collect the
						minimum amount of personal information that is necessary to fulfill the
						purpose of your interaction with us; we don't sell it to third parties; and
						we only use it as this Privacy Policy describes. Of course, the short
						version doesn't tell you everything, so please read on for more details!
					</Typography>
					<Divider sx={{ borderColor: "background.paper", padding: theme.spacing(1) }} />
					<Typography variant="h2" paddingBottom={theme.spacing(1)}>
						What information Alliances collects and why
					</Typography>
					<Typography variant="h3" paddingBottom={theme.spacing(1)}>
						Information from website browsers
					</Typography>
					<Typography variant="body2" padding={theme.spacing(1)}>
						If you're just browsing the website, we collect the same basic information
						that most websites collect. We use common internet technologies, such as
						cookies and web server logs. This is stuff we collect from everybody,
						whether they have an account or not. The information we collect about all
						visitors to our website includes the visitor’s browser type, language
						preference, referring site, additional websites requested, and the date and
						time of each visitor request. We also collect potentially
						personally-identifying information like Internet Protocol (IP) addresses.
						Why do we collect this? We collect this information to better understand how
						our website visitors use Alliances, and to monitor and protect the security
						of the website.
					</Typography>
					<Typography variant="h3" paddingBottom={theme.spacing(1)}>
						Information from users with accounts
					</Typography>
					<Typography variant="body2" padding={theme.spacing(1)}>
						We use your email address or Google sign-in for our accounts. If you create
						an account with us, only your email address is shared with us, not your
						password or any other personal information. You also have the option to give
						us more information, such as your name, which may include "User Personal
						Information." Why do we collect this? We use your name to personalize your
						experience with Alliances. We use your email address as a way to identify
						you across devices so that you can have a consistent experience across
						Alliances. We use your email to communicate with you with information
						regarding your account.Data entered into Alliances is private to your
						account and will not be distributed or made available to other accounts. If
						your data is aggregated for analysis, it will be anonymized at a time of no
						less than 2 months after the creation of the picklist. There is no
						guaranteed data history.
					</Typography>
					<Divider sx={{ borderColor: "background.paper", padding: theme.spacing(1) }} />
					<Typography variant="h2" paddingBottom={theme.spacing(1)}>
						What information Alliances does not collect
					</Typography>
					<Typography variant="body2" padding={theme.spacing(1)}>
						We do not intentionally collect sensitive personal information, such as
						social security numbers, genetic data, health information, or religious
						information. If you're a child under the age of 13, you may not have an
						account on Alliances. Alliances does not knowingly collect information from
						or direct any of our content specifically to children under 13. If we learn
						or have reason to suspect that you are a user who is under the age of 13, we
						will have to close your account.
					</Typography>
					<Divider sx={{ borderColor: "background.paper", padding: theme.spacing(1) }} />
					<Typography variant="h2" paddingBottom={theme.spacing(1)}>
						How we share the information we collect
					</Typography>
					<Typography variant="body2" padding={theme.spacing(1)}>
						We do not share, sell, rent, or trade any User Personal Information with
						third parties.
					</Typography>
					<Divider sx={{ borderColor: "background.paper", padding: theme.spacing(1) }} />
					<Typography variant="h2" paddingBottom={theme.spacing(1)}>
						Our use of cookies and tracking
					</Typography>
					<Typography variant="h3" paddingBottom={theme.spacing(1)}>
						Cookies
					</Typography>
					<Typography variant="body2" padding={theme.spacing(1)}>
						Alliances uses cookies to make interactions with our service easy and
						meaningful. We use cookies (and similar technologies, like HTML5
						localStorage) to keep you logged in and remember your preferences. A cookie
						is a small piece of text that our web server stores on your computer or
						mobile device, which your browser sends to us when you return to our site.
						Cookies do not necessarily identify you if you are merely visiting
						Alliances; however, a cookie may store a unique identifier for each logged
						in user. The cookies Alliances sets are essential for the operation of the
						website, or are used for performance or functionality. By using our website,
						you agree that we can place these types of cookies on your computer or
						device. If you disable your browser or device’s ability to accept cookies,
						you will not be able to log in or use Alliances' services.
					</Typography>
					<Typography variant="h3" paddingBottom={theme.spacing(1)}>
						Google Analytics
					</Typography>
					<Typography variant="body2" padding={theme.spacing(1)}>
						We use Google Analytics as a third party tracking service, but we don’t use
						it to track you individually or collect your User Personal Information. We
						use Google Analytics to collect information about how our website performs
						and how our users, in general, navigate through and use Alliances. This
						helps us evaluate our users' use of Alliances; compile statistical reports
						on activity; and improve our content and website performance. Google
						Analytics gathers certain simple, non-personally identifying information
						over time, such as your IP address, browser type, internet service provider,
						referring and exit pages, time stamp, and similar data about your use of
						Alliances. We do not link this information to any of your personal
						information such as your user name. Alliances will not, nor will we allow
						any third party to, use the Google Analytics tool to track our users
						individually; collect any User Personal Information other than IP address;
						or correlate your IP address with your identity. Google provides further
						information about its own privacy practices and offers a browser add-on to
						opt out of Google Analytics tracking. Certain pages on our site may set
						other third party cookies. For example, we may embed content, such as
						videos, from another site that sets a cookie. While we try to minimize these
						third party cookies, we can’t always control what cookies this third party
						content sets.
					</Typography>
					<Divider sx={{ borderColor: "background.paper", padding: theme.spacing(1) }} />
					<Typography variant="h2" paddingBottom={theme.spacing(1)}>
						License
					</Typography>
					<Typography variant="body2" padding={theme.spacing(1)}>
						This Privacy Policy is adapted from{" "}
						<ASLink
							text="GitHub's Privacy Statement"
							onClick={() => {
								window.open(
									"https://help.github.com/articles/github-privacy-statement/",
									"_blank",
								);
							}}
						/>{" "}
						and is licensed under the{" "}
						<ASLink
							text="Creative Commons Attribution license"
							onClick={() => {
								window.open(
									"https://creativecommons.org/licenses/by/4.0/",
									"_blank",
								);
							}}
						/>
						. You may use it freely under the terms of the Creative Commons license.
					</Typography>
					<Divider sx={{ borderColor: "background.paper", padding: theme.spacing(1) }} />
					<Typography variant="h2" paddingBottom={theme.spacing(1)}>
						Contact
					</Typography>
					For questions please open an issue on{" "}
					<ASLink
						text="GitHub"
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
				</Box>
				<LegalLinks />
			</Stack>
		</Page>
	);
};

export default PolicyPage;
