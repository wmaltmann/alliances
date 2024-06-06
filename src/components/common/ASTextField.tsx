import { KeyboardCapslock, Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

interface EmailFieldProps {
	value: unknown;
	id?: string;
	label?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
	required?: boolean;
	type?: "text" | "email" | "password";
	fullWidth?: boolean;
	showCapsLock?: boolean;
	error?: string;
}

const EmailField: React.FC<EmailFieldProps> = ({
	type = "text",
	required,
	id,
	value,
	onChange,
	onBlur,
	fullWidth,
	label,
	showCapsLock = false,
	error,
}) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isCapsLockOn, setIsCapsLockOn] = useState(false);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.getModifierState && event.getModifierState("CapsLock")) {
				setIsCapsLockOn(true);
			} else {
				setIsCapsLockOn(false);
			}
		};

		const handleKeyUp = (event: KeyboardEvent) => {
			if (event.getModifierState && !event.getModifierState("CapsLock")) {
				setIsCapsLockOn(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<TextField
			variant="outlined"
			required={required}
			id={id}
			label={label}
			type={type === "password" ? (showPassword ? "text" : "password") : type}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			fullWidth={fullWidth}
			helperText={error}
			error={!!error}
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
								{showCapsLock && isCapsLockOn ? <KeyboardCapslock /> : ""}
							</IconButton>
						)}
					</>
				),
			}}
		/>
	);
};

export default EmailField;
