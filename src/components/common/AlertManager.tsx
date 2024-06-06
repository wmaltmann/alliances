import { Box, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../app/AppContext";
import { AlertData } from "../../model/alerts/alerts.model";
import AlertBox from "./AlertBox";

const AlertsManager: React.FC = () => {
	const { alerts } = useAppContext();
	const [alertList, setAlertList] = useState<AlertData[]>([]);
	const theme = useTheme();

	useEffect(() => {
		const unsubscribe = alerts.subscribe((newAlerts) => {
			setAlertList(newAlerts);
		});
		return () => unsubscribe();
	}, [alerts]);

	return (
		<Box
			sx={{
				position: "fixed",
				top: theme.spacing(2),
				left: "50%",
				transform: "translateX(-50%)",
				zIndex: 1000,
				width: "100%",
			}}
		>
			{alertList.map((alert) => (
				<AlertBox
					key={alert.id}
					severity={alert.severity}
					message={alert.message}
					onDismiss={() => alerts.removeAlert(alert.id)}
				/>
			))}
		</Box>
	);
};

export default AlertsManager;
