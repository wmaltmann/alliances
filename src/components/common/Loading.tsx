import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import React from "react";

interface LoadingProps {
	message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height="100%"
		>
			<CircularProgress />
			<Typography variant="body1" color="textSecondary" mt={2}>
				{message}
			</Typography>
		</Box>
	);
};

export default Loading;
