import { Box, useTheme } from "@mui/material";
import React, { ReactNode } from "react";

interface BorderBoxProps {
	children: ReactNode;
	width?: string;
}

const BorderBox: React.FC<BorderBoxProps> = ({ children, width }) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				border: `2px solid ${theme.palette.primary.main}`,
				borderRadius: "16px",
				padding: "16px",
				width: width ? width : "auto",
			}}
		>
			{children}
		</Box>
	);
};

export default BorderBox;
