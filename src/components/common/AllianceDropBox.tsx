import { Droppable } from "@hello-pangea/dnd";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { useAppContext } from "../../app/AppContext";
import { removeTeamFromAlliance } from "../../model/picklist/picklist.Manager";
import { Alliance } from "../../model/picklist/picklist.Model";
import TeamChip from "./TeamChip";

interface AllianceDropBoxProps {
	alliance: Alliance;
}

const AllianceDropBox: FC<AllianceDropBoxProps> = ({ alliance }) => {
	const theme = useTheme();
	const {
		lists: { activePicklist },
	} = useAppContext();

	const captainOnHold = async () => {
		if (activePicklist) {
			await removeTeamFromAlliance(activePicklist, Number(alliance.number), "captain");
		}
	};

	const firstOnHold = async () => {
		if (activePicklist) {
			await removeTeamFromAlliance(activePicklist, Number(alliance.number), "firstPick");
		}
	};

	const secondOnHold = async () => {
		if (activePicklist) {
			await removeTeamFromAlliance(activePicklist, Number(alliance.number), "secondPick");
		}
	};
	return (
		<Droppable droppableId={`${alliance.number}-alliance`}>
			{(provided) => (
				<Box
					{...provided.droppableProps}
					ref={provided.innerRef}
					sx={{
						bgcolor: "background.paper",
						marginTop: theme.spacing(1),
						marginBottom: theme.spacing(1),
						marginLeft: theme.spacing(1),
						borderRadius: "20px",
						padding: theme.spacing(2),
						position: "relative",
					}}
				>
					<Typography
						variant="h1"
						sx={{
							position: "absolute",
							top: theme.spacing(2),
							left: theme.spacing(2),
						}}
					>
						{alliance.number}
					</Typography>

					<Stack alignItems="center" width="100%" spacing={theme.spacing(2)}>
						<Stack direction="row">
							<Stack alignItems="center" spacing={theme.spacing(1)}>
								<Typography variant="h2">Captain</Typography>
								<TeamChip
									text={alliance.captain}
									teamCategory={alliance.captain ? "locked" : "unassigned"}
									large
									enableHold={alliance.captain !== ""}
									onHold={captainOnHold}
								/>
							</Stack>
						</Stack>

						<Stack direction="row" justifyContent="space-evenly" width="100%">
							<Stack alignItems="center" spacing={theme.spacing(1)}>
								<Typography variant="h2">1st</Typography>
								<TeamChip
									text={alliance.firstPick}
									teamCategory={alliance.firstPick ? "locked" : "unassigned"}
									large
									enableHold={alliance.firstPick !== ""}
									onHold={firstOnHold}
								/>
							</Stack>
							<Stack alignItems="center" spacing={theme.spacing(1)}>
								<Typography variant="h2">2nd</Typography>
								<TeamChip
									text={alliance.secondPick}
									teamCategory={alliance.secondPick ? "locked" : "unassigned"}
									large
									enableHold={alliance.secondPick !== ""}
									onHold={secondOnHold}
								/>
							</Stack>
						</Stack>
					</Stack>
				</Box>
			)}
		</Droppable>
	);
};

export default AllianceDropBox;
