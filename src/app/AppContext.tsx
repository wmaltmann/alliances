import React, { ReactNode, createContext, useContext, useState } from "react";
import Alerts from "../model/alerts/alerts.model";
import { migratePicklist } from "../model/picklist/picklist.Manager";
import { FbDbPicklist, Picklist, PicklistCore } from "../model/picklist/picklist.Model";
import { User } from "../model/user/user.Model";

export interface AppContextData {
	user: User | undefined;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
	lists: {
		activePicklist: Picklist | undefined;
		setActivePicklist: (
			loadingPicklistId: string,
			picklist: FbDbPicklist | undefined,
			userId: string | undefined,
		) => void;
		activePicklistId: string;
		setActivePicklistId: React.Dispatch<React.SetStateAction<string>>;
		picklists: PicklistCore[] | undefined;
		setPicklists: React.Dispatch<React.SetStateAction<PicklistCore[] | undefined>>;
	};
	bottomBar: {
		state: number;
		setState: React.Dispatch<React.SetStateAction<number>>;
	};
	alerts: Alerts;
}

const AppContext = createContext<AppContextData | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | undefined>(undefined);
	const [activePicklist, setActivePicklist] = useState<Picklist | undefined>(undefined);
	const [activePicklistId, setActivePicklistId] = useState<string>("");
	const [picklists, setPicklists] = useState<PicklistCore[] | undefined>(undefined);
	const [bottomBarState, setBottomBarState] = useState<number>(0);
	const alerts = new Alerts();

	const picklistETL = (
		loadingPicklistId: string,
		picklist: FbDbPicklist | undefined,
		userId: string | undefined,
	) => {
		setActivePicklist(migratePicklist(loadingPicklistId, userId, picklist));
	};

	const contextValue: AppContextData = {
		user,
		setUser,
		lists: {
			activePicklist,
			setActivePicklist: picklistETL,
			activePicklistId,
			setActivePicklistId,
			picklists,
			setPicklists,
		},
		bottomBar: {
			state: bottomBarState,
			setState: setBottomBarState,
		},
		alerts,
	};

	return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used within a AppContext.Provider");
	}
	return context;
};
