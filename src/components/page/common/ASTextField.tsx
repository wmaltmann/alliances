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
}

const EmailField: React.FC<EmailFieldProps> = ({
	type = "but",
	required,
	id,
	value,
	onChange,
	fullWidth,
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
		</>
	);
};

export default EmailField;
