import { Link } from "@mui/material";
import React from "react";

interface ASLinkProps {
	text: string;
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const ASLink: React.FC<ASLinkProps> = ({ text, onClick }) => {
	return (
		<Link sx={{ textDecoration: "none" }} href="#" onClick={onClick}>
			{text}
		</Link>
	);
};

export default ASLink;
