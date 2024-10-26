import { Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";
import ASButton from "../../components/common/ASButton";
import ASTextField from "../../components/common/ASTextField";
import Page from "../../components/page/Page";
import TopBar from "../../components/page/TopBar";
import { addTeamToPicklist, loadPicklist } from "../../model/picklist/picklist.Manager";

const AddTeamPage: FC = () => {
	const navigate = useNavigate();
	const {
		lists: { activePicklistId, activePicklist, setActivePicklistId },
		alerts,
	} = useAppContext();

	const { id } = useParams();
	useEffect(() => {
		if (id) {
			if (activePicklistId) {
				if (activePicklistId === id) {
					return;
				}
			}
			loadPicklist(id, setActivePicklistId);
		}
	}, [id]);

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
				await addTeamToPicklist(activePicklist, name, number, 0);
				navigate(`/list/${id}`);
			} catch (error) {
				console.log(error);
				alerts.addAlert("error", "Failed to add team", 15);
				navigate(`/list/${id}`);
			}
		} else {
			alerts.addAlert("error", "Picklist not found", 15);
			navigate(-1);
		}
	};

	const handleOnClickBack = () => {
		navigate(`/list//${id}`);
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
						type="number"
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
