import { Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";
import Page from "../../components/page/Page";
import TopBar from "../../components/page/TopBar";

const AddUserPage: FC = () => {
	const navigate = useNavigate();
	const {
		lists: { activePicklistId },
	} = useAppContext();
	const handleOnClickBack = () => {
		navigate(`/${activePicklistId}/list`);
	};
	const [scanResult, setScanResult] = useState<string | null>(null);

	const handleScan = (result: string | null) => {
		if (result) {
			setScanResult(result);
		}
	};

	const handleError = () => {
		console.error("error");
	};
	return (
		<Page>
			<TopBar onClickBack={handleOnClickBack} />

			<Stack height="100%" paddingTop="60px">
				<Typography>QR</Typography>
				<QrReader
					onResult={(result, error) => {
						if (result) {
							handleScan(result?.getText());
						}

						if (error) {
							handleError();
						}
					}}
					constraints={{ facingMode: "environment" }}
				/>
				<Typography>{scanResult}</Typography>
			</Stack>
		</Page>
	);
};

export default AddUserPage;
