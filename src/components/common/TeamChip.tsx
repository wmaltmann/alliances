import DeleteIcon from "@mui/icons-material/Delete"; // Import the trash icon
import { Chip, CircularProgress, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TeamCategory } from "../../model/picklist/picklist.Model";

interface TeamChipProps {
	text: string;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
	teamCategory: TeamCategory;
	large?: boolean;
	enableHold?: boolean;
	onHold?: () => void;
}

const TeamChip: React.FC<TeamChipProps> = ({
	text,
	onClick,
	teamCategory,
	large,
	enableHold,
	onHold,
}) => {
	const theme = useTheme();
	const [holding, setHolding] = useState(false);
	const [progress, setProgress] = useState(0);
	const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null);
	const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null);
	const [holdCompleted, setHoldCompleted] = useState(false);

	let bgColor: string;
	switch (teamCategory) {
		case "pick":
			bgColor = theme.palette.chip.pick;
			break;
		case "neutral":
			bgColor = theme.palette.chip.neutral;
			break;
		case "doNotPick":
			bgColor = theme.palette.chip.doNotPick;
			break;
		case "available":
			bgColor = "primary.main";
			break;
		case "locked":
			bgColor = "primary.main";
			break;
		default:
			bgColor = theme.palette.chip.unassigned;
			break;
	}

	const startHold = () => {
		if (enableHold) {
			setHolding(true);
			setProgress(0);
			setHoldCompleted(false);

			const interval = setInterval(() => {
				setProgress((prev) => {
					if (prev >= 100) {
						clearInterval(interval);
						return 100;
					}
					return prev + 16;
				});
			}, 100);
			setProgressInterval(interval);

			const timeout = setTimeout(() => {
				setHoldCompleted(true);
				setProgress(100);
			}, 1000);
			setHoldTimeout(timeout);
		}
	};

	const endHold = () => {
		if (holdTimeout) {
			clearTimeout(holdTimeout);
		}
		if (progressInterval) {
			clearInterval(progressInterval);
		}
		if (holdCompleted && onHold) {
			onHold();
		}
		setHolding(false);
		setProgress(0);
		setHoldCompleted(false);
	};

	const handleMouseDown = (event: React.MouseEvent) => {
		event.preventDefault();
		startHold();
	};

	const handleMouseUp = (event: React.MouseEvent) => {
		event.preventDefault();
		endHold();
	};

	const handleTouchStart = (event: React.TouchEvent) => {
		event.preventDefault();
		startHold();
	};

	const handleTouchEnd = (event: React.TouchEvent) => {
		event.preventDefault();
		endHold();
	};

	useEffect(() => {
		return () => {
			if (holdTimeout) {
				clearTimeout(holdTimeout);
			}
			if (progressInterval) {
				clearInterval(progressInterval);
			}
		};
	}, [holdTimeout, progressInterval]);

	return (
		<div style={{ position: "relative" }}>
			<Chip
				label={text}
				onClick={onClick}
				onMouseDown={enableHold ? handleMouseDown : () => {}}
				onMouseUp={enableHold ? handleMouseUp : () => {}}
				onMouseLeave={enableHold ? endHold : () => {}}
				onTouchStart={enableHold ? handleTouchStart : () => {}}
				onTouchEnd={enableHold ? handleTouchEnd : () => {}}
				sx={{
					border: "2px solid",
					borderColor: bgColor,
					backgroundColor:
						teamCategory === "available" ? "primary.main" : "background.default",
					width: large ? "92px" : "32px",
					padding: "0px",
					"& .MuiChip-label": { padding: 0 },
				}}
			/>
			{enableHold && holding && (
				<>
					<CircularProgress
						variant="determinate"
						value={progress}
						size={24}
						thickness={4}
						sx={{
							position: "absolute",
							right: 4,
							top: 4,
							zIndex: 1,
						}}
					/>
					<DeleteIcon
						sx={{
							position: "absolute",
							right: 8,
							top: 8,
							zIndex: 2,
							height: "16px",
							width: "16px",
							color: "primary.main",
						}}
					/>
				</>
			)}
		</div>
	);
};

export default TeamChip;
