import { Add, Delete } from "@mui/icons-material";
import { IconButton, Stack, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../app/AppContext";
import BottomBar from "../../components/page/BottomBar";
import Page from "../../components/page/Page";
import TopBar from "../../components/page/TopBar";
import { removeUserFromPicklist } from "../../model/picklist/picklist.Manager";

const SharePage: FC = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const handleBackOnClick = () => {
		navigate(`/lists`);
	};
	const {
		lists: { activePicklist },
	} = useAppContext();

	const removeUser = async (type: "owners" | "members", id: string) => {
		try {
			if (activePicklist) {
				await removeUserFromPicklist(activePicklist, type, id);
			}
		} catch (error) {
			//
		}
	};
	const addUser = async (type: "owners" | "members") => {
		if (activePicklist) {
			navigate(`/${activePicklist.id}/adduser/${type}`);
		}
	};
	return (
		<>
			<TopBar onClickBack={handleBackOnClick} />
			<Page>
				<Stack
					width="100%"
					paddingBottom="60px"
					paddingTop="60px"
					spacing={theme.spacing(2)}
				>
					<Stack padding={theme.spacing(1)}>
						<Stack direction="row" alignItems="center" justifyContent="space-between">
							<Typography variant="h2" color="primary.main">
								Editors
							</Typography>
							{(activePicklist?.permission || "") === "owner" && (
								<IconButton
									sx={{ height: "24px" }}
									onClick={() => addUser("owners")}
								>
									<Add color="primary" />
								</IconButton>
							)}
						</Stack>
						{activePicklist?.owners &&
							activePicklist.owners.map((owner, index) => {
								return (
									<Stack
										direction="row"
										justifyContent="space-between"
										alignItems="center"
										key={index}
									>
										<Typography>{owner.email}</Typography>
										{activePicklist.permission === "owner" &&
											activePicklist.owners.length > 1 && (
												<IconButton
													onClick={() => removeUser("owners", owner.id)}
												>
													<Delete color="primary" />
												</IconButton>
											)}
									</Stack>
								);
							})}
					</Stack>
					<Stack padding={theme.spacing(1)}>
						<Stack direction="row" alignItems="center" justifyContent="space-between">
							<Typography variant="h2" color="primary.main">
								Members
							</Typography>
							{(activePicklist?.permission || "") === "owner" && (
								<IconButton
									sx={{ height: "24px" }}
									onClick={() => addUser("members")}
								>
									<Add color="primary" />
								</IconButton>
							)}
						</Stack>
						{activePicklist?.members &&
							activePicklist.members.map((member, index) => {
								return (
									<Stack
										direction="row"
										justifyContent="space-between"
										alignItems="center"
										key={index}
									>
										<Typography>{member.email}</Typography>
										{activePicklist.permission === "owner" && (
											<IconButton
												onClick={() => removeUser("members", member.id)}
											>
												<Delete color="primary" />
											</IconButton>
										)}
									</Stack>
								);
							})}
					</Stack>
				</Stack>
			</Page>
			<BottomBar />
		</>
	);
};

export default SharePage;
