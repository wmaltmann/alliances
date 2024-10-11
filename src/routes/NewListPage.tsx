import { Stack } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import ASButton from "../components/common/ASButton";
import ASTextField from "../components/common/ASTextField";
import Page from "../components/page/Page";
import TopBar from "../components/page/TopBar";

const CreateListPage: FC = () => {
	const navigate = useNavigate();
	const [name, setName] = useState<string>("");

	const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleCreatePicklist = () => {
		console.log("click");
	};

	const handleOnClickBack = () => {
		navigate(`/lists`);
	};

	return (
		<Page>
			<TopBar onClickBack={handleOnClickBack} />
			<Stack height="100%" alignItems="center" justifyContent="center" paddingTop="60px">
				<Stack spacing={3} component="form" onSubmit={handleCreatePicklist} width="300px">
					<ASTextField
						required
						id="name"
						label="Picklist Name"
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

export default CreateListPage;
