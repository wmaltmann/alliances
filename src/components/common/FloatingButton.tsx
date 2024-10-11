import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import React from "react";

interface FloatingButtonProps {
	text: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
	return (
		<Fab
			color="primary"
			aria-label="add"
			onClick={onClick}
			sx={{
				position: "fixed",
				bottom: 16,
				left: 16,
			}}
		>
			<AddIcon />
		</Fab>
	);
};

export default FloatingButton;
