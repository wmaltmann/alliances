import { Box } from "@mui/material";
import React, { ReactNode } from "react";

type PageProps = {
	children: ReactNode;
};

const Page: React.FC<PageProps> = ({ children }) => {
	return <Box height={`100vh`}>{children}</Box>;
};

export default Page;

{
	/* <Box height={`calc(100vh - 65px)`}>
	<TopBar />
	{children}
</Box>; */
}
