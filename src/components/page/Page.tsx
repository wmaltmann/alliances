import { Box } from "@mui/material";
import React, { HTMLAttributes, ReactNode } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const Page: React.FC<PageProps> = ({ children, ...props }) => {
	return (
		<Box {...props} sx={{ height: "100vh" }}>
			{children}
		</Box>
	);
};

export default Page;
