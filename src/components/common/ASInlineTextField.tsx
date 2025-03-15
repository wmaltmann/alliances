import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material";
import { IconButton, InputAdornment, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";

interface ASInlineTextFieldProps {
	value: string;
	label?: string;
	onSave?: (newValue: string) => void;
}

const ASInlineTextField: React.FC<ASInlineTextFieldProps> = ({
	value,
	label,
	onSave = () => {},
}) => {
	const theme = useTheme();
	const [isEditing, setIsEditing] = useState(false);
	const [inputValue, setInputValue] = useState(value);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		onSave(inputValue);
		setIsEditing(false);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setInputValue(value);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	return (
		<div>
			{isEditing ? (
				<TextField
					value={inputValue}
					onChange={handleChange}
					autoFocus
					inputRef={inputRef}
					size="small"
					fullWidth={true}
					variant="outlined"
					label="Rank"
					sx={{
						backgroundColor: theme.palette.background.paper,
						borderRadius: "4px",
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={handleCancel}
									onTouchStart={handleCancel}
									size="small"
									color="primary"
								>
									<CloseIcon />
								</IconButton>
								<IconButton
									onClick={handleSave}
									onTouchStart={handleSave}
									size="small"
									color="primary"
								>
									<CheckIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			) : (
				<Stack
					direction="row"
					onClick={handleEditClick}
					onTouchStart={handleEditClick}
					style={{ cursor: "pointer" }}
					spacing={2}
				>
					{label && <Typography>{label}</Typography>}
					<Typography color="primary">{value}</Typography>
				</Stack>
			)}
		</div>
	);
};

export default ASInlineTextField;
