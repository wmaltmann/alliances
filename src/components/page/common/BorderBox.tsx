import { Box, useTheme } from "@mui/material";
import React, { ReactNode } from "react";

interface BorderBoxProps {
	children: ReactNode;
}

const BorderBox: React.FC<BorderBoxProps> = ({ children }) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				border: `2px solid ${theme.palette.primary.main}`,
				borderRadius: "16px",
				padding: "16px",
			}}
		>
			{children}
		</Box>
	);
};

export default BorderBox;
