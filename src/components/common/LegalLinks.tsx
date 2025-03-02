import { Stack, useTheme } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import ASLink from "./ASLink";

const LegalLinks: FC = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	return (
		<Stack
			direction="row"
			justifyContent="space-evenly"
			width="100%"
			padding={theme.spacing(1)}
		>
			<ASLink
				text="about"
				onClick={() => {
					navigate("/about");
				}}
				variant="body2"
			/>
			<ASLink
				text="privacy policy"
				onClick={() => {
					navigate("/privacypolicy");
				}}
				variant="body2"
			/>
			<ASLink
				text="terms of service"
				onClick={() => {
					navigate("/terms");
				}}
				variant="body2"
			/>
		</Stack>
	);
};

export default LegalLinks;
