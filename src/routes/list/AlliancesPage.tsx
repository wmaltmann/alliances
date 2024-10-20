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
import { getAvailableTeams, sortTeamsByRank } from "../../model/picklist/picklist.Utils";

const AlliancePage: FC = () => {
	const navigate = useNavigate();
	const handleBackOnClick = () => {
		navigate(`/lists`);
	};
	const {
		lists: { activePicklist },
	} = useAppContext();

	const availableTeams = sortTeamsByRank(getAvailableTeams(activePicklist));

	const onDragEnd = async (result: DropResult<string>) => {
		const regex = /\d+-alliance/;
		const allianceNumber = Number((result.destination?.droppableId || "").split("-")[0]);
		if (regex.test(result.destination?.droppableId || "") && activePicklist) {
			await addTeamToAlliance(
				activePicklist,
				activePicklist?.alliances[allianceNumber - 1],
				result.draggableId,
			);
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
