import { Close } from "@mui/icons-material";
import { Alert, IconButton } from "@mui/material";
import React from "react";

interface AlertBoxProps {
	message: string;
	onDismiss?: () => void;
	severity?: "info" | "error" | "success" | "warning";
}

const AlertBox: React.FC<AlertBoxProps> = ({ message, severity = "info", onDismiss }) => {
	return (
		<Alert
			severity={severity}
			action={
				onDismiss && (
					<IconButton aria-label="close" color="inherit" size="small" onClick={onDismiss}>
						<Close fontSize="inherit" />
					</IconButton>
				)
			}
			sx={{ m: 2 }}
		>
			{message}
		</Alert>
	);
};

export default AlertBox;
