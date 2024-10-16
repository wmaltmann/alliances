import { Box } from "@mui/material";
import React, { ReactNode } from "react";

type PageProps = {
	children: ReactNode;
};

const Page: React.FC<PageProps> = ({ children }) => {
	return <Box sx={{ height: "100vh" }}>{children}</Box>;
};

export default Page;
