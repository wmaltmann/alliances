import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Box } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";
import AllianceDragBox from "../../components/common/AllianceDragBox";
import AllianceList from "../../components/common/AllianceList";
import BottomBar from "../../components/page/BottomBar";
import Page from "../../components/page/Page";
import TopBar from "../../components/page/TopBar";
import { addTeamToAlliance } from "../../model/picklist/picklist.Manager";
import { Alliance, Team } from "../../model/picklist/picklist.Model";

const AlliancePage: FC = () => {
	const navigate = useNavigate();
	const handleBackOnClick = () => {
		navigate(`/events`);
	};
	const {
		lists: { activePicklist },
	} = useAppContext();

	const getPickedTeams = (alliances: Alliance[]) => {
		const uniqueValues = new Set();

		alliances.forEach((alliance) => {
			if (alliance.captain) uniqueValues.add(alliance.captain);
			if (alliance.firstPick) uniqueValues.add(alliance.firstPick);
			if (alliance.secondPick) uniqueValues.add(alliance.secondPick);
		});

		return Array.from(uniqueValues) as string[];
	};
	const pickedTeams = getPickedTeams(activePicklist?.alliances || []);

	const removePickedTeams = (teams: Team[], pickedTeams: string[]) => {
		return teams.filter((team) => !pickedTeams.includes(team.number));
	};

	const availableTeams = removePickedTeams(activePicklist?.teams || [], pickedTeams);

	availableTeams.sort((a, b) => a.rank - b.rank);

	const onDragEnd = async (result: DropResult<string>) => {
		const regex = /\d+-alliance/;
		const allianceNumber = Number((result.destination?.droppableId || "").split("-")[0]);
		console.log(allianceNumber);
		if (regex.test(result.destination?.droppableId || "") && activePicklist) {
			await addTeamToAlliance(
				activePicklist,
				activePicklist?.alliances[allianceNumber - 1],
				result.draggableId,
			);
			console.log("Valid Drag");
			console.log("result", result);
		}
	};

	return (
		<>
			<TopBar onClickBack={handleBackOnClick} />
			<Page>
				<DragDropContext onDragEnd={onDragEnd}>
					<Box display="flex" height="100%" paddingTop="60px" paddingBottom="60px">
						<AllianceList />
						<AllianceDragBox teams={availableTeams} />
					</Box>
				</DragDropContext>
			</Page>
			<BottomBar />
		</>
	);
};

export default AlliancePage;
