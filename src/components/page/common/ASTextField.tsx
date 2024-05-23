import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

interface EmailFieldProps {
	value: unknown;
	id?: string;
	label?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	required?: boolean;
	type?: "text" | "email" | "password";
	fullWidth?: boolean;
}

const EmailField: React.FC<EmailFieldProps> = ({
	type = "text",
	required,
	id,
	value,
	onChange,
	fullWidth,
	label,
}) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
	return (
		<TextField
			variant="standard"
			required={required}
			id={id}
			label={label}
			type={type === "password" ? (showPassword ? "text" : "password") : type}
			value={value}
			onChange={onChange}
			fullWidth={fullWidth}
			InputProps={{
				endAdornment: (
					<>
						{type === "password" && (
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						)}
					</>
				),
			}}
		/>
	);
};

export default EmailField;
