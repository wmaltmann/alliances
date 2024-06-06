import { Link } from "@mui/material";
import React from "react";

interface ASLinkProps {
	text: string;
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const ASLink: React.FC<ASLinkProps> = ({ text, onClick }) => {
	const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		if (onClick) {
			onClick(event);
		}
	};

	return (
		<Link sx={{ textDecoration: "none" }} href="" onClick={handleClick}>
			{text}
		</Link>
	);
};

export default ASLink;
