import { Box, Stack, useTheme } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";
import TeamDivider from "../../components/common/TeamDivider";
import TeamListItem from "../../components/common/TeamListItem";
import BottomBar from "../../components/page/BottomBar";
import Page from "../../components/page/Page";
import TopBar from "../../components/page/TopBar";
import { loadPicklist } from "../../model/picklist/picklist.Manager";
import { getAvailableTeams, getTeamsByCategory } from "../../model/picklist/picklist.Utils";

const SelectionPage: FC = () => {
	const navigate = useNavigate();
	const handleBackOnClick = () => {
		navigate(`/lists`);
	};
	const theme = useTheme();
	const {
		lists: { activePicklist, activePicklistId, setActivePicklistId },
	} = useAppContext();
	const { id } = useParams();
	useEffect(() => {
		if (id) {
			if (activePicklistId) {
				if (activePicklistId === id) {
					return;
				}
			}
			loadPicklist(id, setActivePicklistId);
		}
	}, [id]);

	const availableTeams = getAvailableTeams(activePicklist);

	const pickTeams = getTeamsByCategory(availableTeams, "pick");
	const doNotPickTeams = getTeamsByCategory(availableTeams, "doNotPick");

	return (
		<>
			<TopBar onClickBack={handleBackOnClick} />
			<Page>
				<Box
					sx={{
						width: "100%",
						paddingBottom: "60px",
						paddingTop: "60px",
						height: "100%", // Adjust height for the TopBar and BottomBar
						overflowY: "auto", // Enable vertical scrolling
					}}
				>
					<Stack spacing={theme.spacing(2)}>
						<Box padding={theme.spacing(1)}>
							<TeamDivider teamCategory={"pick"} />
							<Stack spacing={theme.spacing(1)}>
								{pickTeams.map((team, index) => {
									return <TeamListItem team={team} key={index} />;
								})}
							</Stack>
						</Box>
						<Box padding={theme.spacing(1)}>
							<TeamDivider teamCategory={"doNotPick"} />
							<Stack spacing={theme.spacing(1)}>
								{doNotPickTeams.map((team, index) => {
									return <TeamListItem team={team} key={index} />;
								})}
							</Stack>
						</Box>
					</Stack>
				</Box>
			</Page>
			<BottomBar />
		</>
	);
};

export default SelectionPage;
