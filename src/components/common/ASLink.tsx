import { Link, TypographyVariant } from "@mui/material";
import React from "react";

interface ASLinkProps {
	text: string;
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
	variant?: TypographyVariant;
}

const ASLink: React.FC<ASLinkProps> = ({ text, onClick, variant }) => {
	const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		if (onClick) {
			onClick(event);
		}
	};

	return (
		<Link sx={{ textDecoration: "none", typography: variant }} href="" onClick={handleClick}>
			{text}
		</Link>
	);
};

export default ASLink;
