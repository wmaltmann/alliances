import { QrCodeScanner } from "@mui/icons-material";
import { IconButton, Stack, Typography, useTheme } from "@mui/material";
import QrScanner from "qr-scanner";
import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";
import ASButton from "../../components/common/ASButton";
import QrReader from "../../components/common/QRReader";
import Page from "../../components/page/Page";
import TopBar from "../../components/page/TopBar";
import { getLastSegmentOfUrl } from "../../libs/Utills";
import { addUserToPicklist, createPicklistInvite } from "../../model/picklist/picklist.Manager";
import { PicklistInvite } from "../../model/picklist/picklist.Model";

const AddUserPage: FC = () => {
	const navigate = useNavigate();
	const {
		lists: { activePicklist },
	} = useAppContext();
	const handleOnClickBack = () => {
		setScanning("start");
		navigate(-1);
	};
	const theme = useTheme();
	const location = useLocation();
	const tempType = getLastSegmentOfUrl(location);
	let type: "owners" | "members" = "members";
	if (tempType === "owners") {
		type = "owners";
	}
	const [scanning, setScanning] = useState<"start" | "scanning" | "success" | "error">("start");
	const [newUser, setNewUser] = useState<{ id: string; email: string } | undefined>(undefined);

	const handleStartScan = async () => {
		setScanning("scanning");
	};

	const onScanSuccess = (result: QrScanner.ScanResult) => {
		try {
			setNewUser(JSON.parse(result.data));
			setScanning("success");
		} catch {
			setScanning("error");
		}
	};

	const handleAddUser = async () => {
		if (activePicklist && newUser) {
			try {
				await addUserToPicklist(activePicklist, type, newUser.id, newUser.email);
				const invite: PicklistInvite = {
					userId: newUser.id,
					email: newUser.email,
					picklistId: activePicklist.id,
					inviteDate: new Date(),
				};
				await createPicklistInvite(invite);
				navigate(`/${activePicklist.id}/share`);
			} catch {
				setScanning("error");
			}
		}
	};

	return (
		<Page>
			<TopBar onClickBack={handleOnClickBack} />
			<Stack height="100%" justifyContent="center" alignItems="center">
				{scanning === "scanning" && (
					<Stack spacing={theme.spacing(2)} alignItems="center">
						<QrReader onScanSuccess={onScanSuccess} />
						<Typography>Scan QR Code from user's profile</Typography>
					</Stack>
				)}
				{scanning === "start" && (
					<>
						<Typography
							textAlign="center"
							color="primary"
							variant="h1"
							onClick={handleStartScan}
						>
							Start Scanner
						</Typography>
						<IconButton onClick={handleStartScan}>
							<QrCodeScanner
								sx={{
									color: theme.palette.primary.main,
									width: "200px",
									height: "200px",
								}}
							/>
						</IconButton>
					</>
				)}
				{scanning === "error" && (
					<>
						<Typography
							textAlign="center"
							color="primary"
							variant="h1"
							onClick={handleStartScan}
						>
							Scanning Error
						</Typography>
						<IconButton onClick={handleStartScan}>
							<QrCodeScanner
								sx={{
									color: theme.palette.primary.main,
									width: "150px",
									height: "150px",
								}}
							/>
						</IconButton>
						<Typography textAlign="center" onClick={handleStartScan}>
							Click to try again
						</Typography>
					</>
				)}
				{scanning === "success" && (
					<Stack spacing={theme.spacing(4)} alignItems="center">
						<Typography
							variant="h2"
							color="primary"
						>{`Add user to ${type} list?`}</Typography>
						<Typography>{newUser?.email}</Typography>
						<ASButton text="Add user" onClick={handleAddUser} />
					</Stack>
				)}
			</Stack>
		</Page>
	);
};

export default AddUserPage;
