import { Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useAppContext } from "../app/AppContext";
import ASButton from "../components/common/ASButton";
import ASTextField from "../components/common/ASTextField";
import Page from "../components/page/Page";

const PicklistCreatePage: FC = () => {
	const [name, setName] = useState<string>("");
	const { user } = useAppContext();
	console.log(user);

	const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleCreatePicklist = () => {
		console.log("click");
	};

	return (
		<Page>
			<Stack height="100%" alignItems="center" justifyContent="center">
				<Stack spacing={3} component="form" onSubmit={handleCreatePicklist} width="300px">
					<Typography variant="body1">Enter a name for your new picklist.</Typography>
					<ASTextField
						required
						id="name"
						label="Picklist name"
						type="text"
						value={name}
						onChange={handleChangeName}
						fullWidth
					/>
					<ASButton type="submit" text="Create picklist" />
				</Stack>
			</Stack>
		</Page>
	);
};

export default PicklistCreatePage;
