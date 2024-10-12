import React, { ReactNode, createContext, useContext, useState } from "react";
import Alerts from "../model/alerts/alerts.model";
import { Picklist } from "../model/picklist/picklist.Model";
import { User } from "../model/user/user.Model";

export interface AppContextData {
	user: User | undefined;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
	lists: {
		activePicklist: Picklist | undefined;
		setActivePicklist: React.Dispatch<React.SetStateAction<Picklist | undefined>>;
		activePicklistId: string;
		setActivePicklistId: React.Dispatch<React.SetStateAction<string>>;
		picklists: Picklist[] | undefined;
		setPicklists: React.Dispatch<React.SetStateAction<Picklist[] | undefined>>;
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
	const [picklists, setPicklists] = useState<Picklist[] | undefined>(undefined);
	const [bottomBarState, setBottomBarState] = useState<number>(0);
	const alerts = new Alerts();

	const contextValue: AppContextData = {
		user,
		setUser,
		lists: {
			activePicklist,
			setActivePicklist,
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
