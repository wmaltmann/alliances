import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";

interface EmailFieldProps {
	value: unknown;
	id?: string;
	label?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	required?: boolean;
	type?: string;
	fullWidth?: boolean;
	error?: string;
}

const EmailField: React.FC<EmailFieldProps> = ({
	type = "but",
	required,
	id,
	value,
	onChange,
	fullWidth,
	error,
}) => {
	return (
		<>
			<TextField
				variant="standard"
				required={required}
				id={id}
				label="Email"
				type={type}
				value={value}
				onChange={onChange}
				fullWidth={fullWidth}
			/>
			{error && <Typography variant="error">{error}</Typography>}
		</>
	);
};

export default EmailField;
