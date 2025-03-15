import DeleteIcon from "@mui/icons-material/Delete"; // Import the trash icon
import { Chip, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

interface TagChipProps {
	text: string;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
	enableHold?: boolean;
	onHold?: () => void;
}

const TagChip: React.FC<TagChipProps> = ({ text, onClick, enableHold, onHold }) => {
	const [holding, setHolding] = useState(false);
	const [progress, setProgress] = useState(0);
	const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null);
	const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null);
	const [holdCompleted, setHoldCompleted] = useState(false);

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
		<div style={{ position: "relative", overflow: "visible" }}>
			<Chip
				label={text}
				onClick={onClick}
				onMouseDown={enableHold ? handleMouseDown : () => {}}
				onMouseUp={enableHold ? handleMouseUp : () => {}}
				onMouseLeave={enableHold ? endHold : () => {}}
				onTouchStart={enableHold ? handleTouchStart : () => {}}
				onTouchEnd={enableHold ? handleTouchEnd : () => {}}
				sx={{
					width: enableHold ? "60px" : "32px",
					padding: "0px",
					display: "flex",
					justifyContent: "flex-start",
					"& .MuiChip-label": {
						padding: 0,
						fontSize: "24px",
						textAlign: "left",
						display: "block",
					},
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

export default TagChip;
