import { Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";
import ASButton from "../../components/common/ASButton";
import ASTextField from "../../components/common/ASTextField";
import TagList from "../../components/common/TagList";
import Page from "../../components/page/Page";
import TopBar from "../../components/page/TopBar";
import { editPicklist, loadPicklist } from "../../model/picklist/picklist.Manager";

const CreateListPage: FC = () => {
	const navigate = useNavigate();
	const { user, alerts } = useAppContext();
	const [name, setName] = useState<string>("");

	const {
		lists: { activePicklist, setActivePicklistId, activePicklistId },
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

	useEffect(() => {
		setName(activePicklist?.name ?? "");
	}, [activePicklist]);

	const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleCreatePicklist = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (user && activePicklist) {
			try {
				await editPicklist(activePicklist, name);
				navigate(`/lists`);
			} catch (error) {
				console.log(error);
				alerts.addAlert("error", "Failed to update picklist.", 15);
				navigate("/lists");
			}
		} else {
			if (!user) {
				alerts.addAlert("error", "No user found", 15);
			}
			if (!activePicklist) {
				alerts.addAlert("error", "No picklist found", 15);
			}
			navigate("/lists");
		}
	};

	const handleOnClickBack = () => {
		setActivePicklistId("");
		navigate(`/lists`);
	};

	return (
		<Page>
			<TopBar onClickBack={handleOnClickBack} />
			<Stack
				height="100%"
				alignItems="center"
				justifyContent="center"
				paddingTop="60px"
				spacing={6}
			>
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

					<ASButton type="submit" text="Update picklist name" />
				</Stack>
				<Stack spacing={3} width="300px">
					<TagList tags={activePicklist?.tags ?? []} editable />
				</Stack>
			</Stack>
		</Page>
	);
};

export default CreateListPage;
