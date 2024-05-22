import Button from "@mui/material/Button";
import React from "react";

interface ButtonProps {
	text: string;
	width?: "fit-content" | "auto" | string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	variant?: "text" | "outlined" | "contained";
	type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<ButtonProps> = ({
	variant = "contained",
	text,
	onClick,
	width = "auto",
	type,
}) => {
	return (
		<Button
			variant={variant}
			onClick={onClick}
			sx={{
				width: width === "fit-content" ? "fit-content" : width === "auto" ? "auto" : width,
				textTransform: "none",
			}}
			type={type}
		>
			{text}
		</Button>
	);
};

export default CustomButton;
