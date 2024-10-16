import { Stack } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";
import ASButton from "../../components/common/ASButton";
import ASTextField from "../../components/common/ASTextField";
import Page from "../../components/page/Page";
import TopBar from "../../components/page/TopBar";
import { createPicklist } from "../../model/picklist/picklist.Manager";

const CreateListPage: FC = () => {
	const navigate = useNavigate();
	const { user, alerts } = useAppContext();
	const [name, setName] = useState<string>("");

	const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleCreatePicklist = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (user) {
			try {
				const plid = await createPicklist(user.id, name);
				navigate(`/${plid}/list`);
			} catch (error) {
				console.log(error);
				alerts.addAlert("error", "Failed to create new picklist.", 15);
				navigate("/lists");
			}
		} else {
			alerts.addAlert("error", "No user found", 15);
			navigate("/lists");
		}
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
