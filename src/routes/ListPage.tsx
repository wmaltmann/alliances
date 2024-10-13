import { DropResult } from "@hello-pangea/dnd";
import { Stack, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../app/AppContext";
import FloatingButton from "../components/common/FloatingButton";
import TeamList from "../components/common/TeamList";
import BottomBar from "../components/page/BottomBar";
import Page from "../components/page/Page";
import TopBar from "../components/page/TopBar";
import { loadPicklist } from "../model/picklist/picklist.Manager";

const ListPage: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const {
		lists: { activePicklist, setActivePicklistId },
	} = useAppContext();
	useEffect(() => {
		loadPicklist(location, setActivePicklistId);
	}, [location]);

	useEffect(() => {
		console.log(activePicklist);
	}, [activePicklist]);

	const handleBackOnClick = () => {
		setActivePicklistId("");
		navigate(`/events`);
	};

	const handleAddTeam = () => {
		console.log("Add Team Clicked");
	};

	console.log("teams", activePicklist?.teams);

	const onDragEnd = (result: DropResult<string>) => {
		console.log(result);
	};

	return (
		<>
			<TopBar onClickBack={handleBackOnClick} />
			<Page>
				<Stack width="100%" paddingBottom="60px" paddingTop="60px">
					{activePicklist?.teams ? (
						<TeamList picklist={activePicklist} onDragEnd={onDragEnd} />
					) : (
						<Typography>List not found or user missing permissions</Typography>
					)}
				</Stack>
				<FloatingButton text="Add Team" bottomMenu extended onClick={handleAddTeam} />
			</Page>
			<BottomBar />
		</>
	);
};

export default ListPage;
