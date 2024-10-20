import AddIcon from "@mui/icons-material/Add";
import { Fab, Typography } from "@mui/material";
import React from "react";

interface RoundButtonProps {
	text: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	extended?: boolean;
}

const RoundButton: React.FC<RoundButtonProps> = ({ onClick, text, extended }) => {
	return (
		<Fab
			color="primary"
			aria-label="add"
			onClick={onClick}
			variant={extended ? "extended" : "circular"}
			sx={{
				textTransform: "none",
				margin: "0 auto", // Center horizontally in a flex container
			}}
		>
			<AddIcon />
			{extended ? <Typography>{text}</Typography> : <></>}
		</Fab>
	);
};

export default RoundButton;
