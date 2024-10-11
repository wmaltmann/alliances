import AddIcon from "@mui/icons-material/Add";
import { Fab, Typography } from "@mui/material";
import React from "react";

interface FloatingButtonProps {
	text: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	extended?: boolean;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick, text, extended }) => {
	return (
		<Fab
			color="primary"
			aria-label="add"
			onClick={onClick}
			variant={extended ? "extended" : "circular"}
			sx={{
				position: "fixed",
				bottom: 16,
				right: 16,
				textTransform: "none",
			}}
		>
			<AddIcon />
			{extended ? <Typography>{text}</Typography> : <></>}
		</Fab>
	);
};

export default FloatingButton;
