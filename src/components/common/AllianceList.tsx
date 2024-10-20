import { Box, Stack, useTheme } from "@mui/material";
import { FC } from "react";
import { useAppContext } from "../../app/AppContext";
import { addAllianceToPicklist } from "../../model/picklist/picklist.Manager";
import AllianceDropBox from "./AllianceDropBox";
import RoundButton from "./RoundButton";

const AllianceList: FC = () => {
	const theme = useTheme();
	const {
		lists: { activePicklist },
	} = useAppContext();
	const alliances = activePicklist?.alliances ? activePicklist.alliances : [];
	const addAlliance = async () => {
		if (activePicklist) {
			await addAllianceToPicklist(activePicklist);
		}
	};
	return (
		<Box
			sx={{
				position: "relative",
				height: "100%",
				width: "100%",
				flexGrow: 1,
				maxHeight: "100%",
				overflow: "auto",
				justifyContent: "center",
			}}
		>
			{alliances.length > 0 &&
				alliances.map((alliance, index) => {
					return <AllianceDropBox alliance={alliance} key={index} />;
				})}
			<Stack
				direction="row"
				marginBottom={theme.spacing(1)}
				marginTop={alliances.length === 0 ? theme.spacing(1) : 0}
			>
				<RoundButton
					onClick={addAlliance}
					text={"Add Alliance"}
					extended={alliances.length < 2}
				/>
			</Stack>
		</Box>
	);
};

export default AllianceList;
