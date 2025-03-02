import { Box } from "@mui/material";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import QrFrame from "../../assets/qr-frame.svg";

interface QrReaderProps {
	onScanSuccess: (result: QrScanner.ScanResult) => void;
}

const QrReader: React.FC<QrReaderProps> = ({ onScanSuccess }) => {
	const scanner = useRef<QrScanner>();
	const videoEl = useRef<HTMLVideoElement>(null);
	const qrBoxEl = useRef<HTMLDivElement>(null);
	const [qrOn, setQrOn] = useState<boolean>(true);

	const onScanFail = (err: string | Error) => {
		if (err !== "No QR code found") {
			console.log(err);
		}
	};

	useEffect(() => {
		if (videoEl?.current && !scanner.current) {
			scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
				onDecodeError: onScanFail,
				preferredCamera: "environment",
				highlightScanRegion: true,
				highlightCodeOutline: true,
				overlay: qrBoxEl?.current || undefined,
			});

			scanner.current
				.start()
				.then(() => setQrOn(true))
				.catch((err) => {
					if (err) setQrOn(false);
				});
		}

		return () => {
			if (!videoEl?.current) {
				scanner?.current?.stop();
			}
		};
	}, [onScanSuccess]);

	useEffect(() => {
		if (!qrOn) {
			alert(
				"Camera is blocked or not accessible. Please allow camera in your browser permissions and reload.",
			);
		}
	}, [qrOn]);

	return (
		<Box
			sx={{
				width: "300px",
				height: "300px",
				position: "relative",
			}}
			className="qr-reader"
		>
			<Box
				component="video"
				ref={videoEl}
				sx={{
					width: "100%",
					height: "100%",
					objectFit: "cover",
				}}
			/>
			<Box
				ref={qrBoxEl}
				sx={{
					width: "100% !important",
					left: "0 !important",
					position: "absolute",
				}}
				className="qr-box"
			>
				<Box
					component="img"
					src={QrFrame}
					alt="Qr Frame"
					sx={{
						position: "absolute",
						left: "50%",
						top: "50%",
						transform: "translateX(-50%) translateY(-50%)",
						width: 256,
						height: 256,
					}}
					className="qr-frame"
				/>
			</Box>
		</Box>
	);
};

export default QrReader;
