import { Stack } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";
import ASButton from "../../components/common/ASButton";
import ASTextField from "../../components/common/ASTextField";
import Page from "../../components/page/Page";
import TopBar from "../../components/page/TopBar";
import { addTeamToPicklist } from "../../model/picklist/picklist.Manager";

const AddTeamPage: FC = () => {
	const navigate = useNavigate();
	const {
		lists: { activePicklistId, activePicklist },
		alerts,
	} = useAppContext();
	const [name, setName] = useState<string>("");
	const [number, setNumber] = useState<string>("");

	const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNumber(event.target.value);
	};

	const handleCreatePicklist = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (activePicklist) {
			console.log("apl", activePicklist);
			try {
				await addTeamToPicklist(activePicklist, name, number);
				navigate(`/${activePicklist.id}/list`);
			} catch (error) {
				console.log(error);
				alerts.addAlert("error", "Failed to add team", 15);
				navigate(`/${activePicklist.id}/list`);
			}
		} else {
			alerts.addAlert("error", "Picklist not found", 15);
			navigate(-1);
		}
	};

	const handleOnClickBack = () => {
		navigate(`/${activePicklistId}/list`);
	};

	return (
		<Page>
			<TopBar onClickBack={handleOnClickBack} />
			<Stack height="100%" alignItems="center" justifyContent="center" paddingTop="60px">
				<Stack spacing={3} component="form" onSubmit={handleCreatePicklist} width="300px">
					<ASTextField
						required
						id="number"
						label="Team Number"
						type="text"
						value={number}
						onChange={handleChangeNumber}
						fullWidth
					/>
					<ASTextField
						required
						id="name"
						label="Team Name"
						type="text"
						value={name}
						onChange={handleChangeName}
						fullWidth
					/>
					<ASButton type="submit" text="Add Team" />
				</Stack>
			</Stack>
		</Page>
	);
};

export default AddTeamPage;
