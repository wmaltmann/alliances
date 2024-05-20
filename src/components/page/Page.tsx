import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import TopBar from "./TopBar";

type PageProps = {
	children: ReactNode;
};

const Page: React.FC<PageProps> = ({ children }) => {
	return (
		<Box height={`calc(100vh - 65px)`}>
			<TopBar />
			{children}
		</Box>
	);
};

export default Page;
