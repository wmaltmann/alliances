import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { getAppStage } from "../../app/AppUtils";

const StageFlag: FC = () => {
	const stage = getAppStage();

	if (stage === "prod") return null;

	return (
		<Box
			sx={{
				position: "fixed",
				top: "0px",
				right: "0px",
				bgcolor: "primary.main",
				padding: "4px",
				zIndex: 2000,
				borderRadius: "0 0 0 4px",
			}}
		>
			<Typography variant="body1">{stage === "beta" ? "Beta" : "Local"}</Typography>
		</Box>
	);
};

export default StageFlag;
