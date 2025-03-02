import { QrCode2 } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";
import ASButton from "../../components/common/ASButton";
import LegalLinks from "../../components/common/LegalLinks";
import Page from "../../components/page/Page";
import TopBar from "../../components/page/TopBar";
import { signOut } from "../../libs/AuthLib";

const ProfilePage: FC = () => {
	const appContextData = useAppContext();
	const navigate = useNavigate();
	const { user } = appContextData;
	const theme = useTheme();
	const [qrValue, setQrValue] = useState<string>("");

	useEffect(() => {
		if (user) {
			setQrValue(JSON.stringify({ id: user.id, email: user.profile.email }));
		} else {
			setQrValue("");
		}
	}, [user]);

	const handleLogoutClick = async () => {
		try {
			await signOut(appContextData);
			navigate("/");
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	const handleOnClickBack = () => {
		navigate(`/lists`);
	};

	return (
		<Page>
			<TopBar onClickBack={handleOnClickBack} variant="header" headerText="Profile" />
			<Stack height="100%" padding={theme.spacing(2)} paddingTop="60px">
				<Stack spacing={8}>
					<Typography>{`Email: ${user?.profile.email}`} </Typography>
					<Box alignSelf="center" border="10px solid" bgcolor="#ffffff">
						{qrValue ? (
							<QRCodeCanvas
								value={qrValue}
								size={256}
								bgColor="#ffffff"
								fgColor="#000000"
								level="L"
							/>
						) : (
							<QrCode2 />
						)}
					</Box>

					<ASButton text="Log Out" onClick={() => handleLogoutClick()}></ASButton>
					<LegalLinks />
				</Stack>
			</Stack>
		</Page>
	);
};

export default ProfilePage;
