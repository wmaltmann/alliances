import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import TopBar from "./TopBar";

type PageProps = {
	children: ReactNode;
};

const Page: React.FC<PageProps> = ({ children }) => {
	return (
		<Box height="100%">
			<TopBar />
			{children}
		</Box>
	);
};

export default Page;
