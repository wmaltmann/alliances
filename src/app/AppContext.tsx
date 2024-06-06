import React, { ReactNode, createContext, useContext, useState } from "react";
import Alerts from "../model/alerts/alerts.model";
import { PickList } from "../model/picklist/picklist.Model";
import { User } from "../model/user/user.Model";

export interface AppContextData {
	user: User | undefined;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
	picklists: {
		activePicklist: PickList | undefined;
		setActivePicklist: React.Dispatch<React.SetStateAction<PickList | undefined>>;
		picklists: PickList[] | undefined;
		setPicklists: React.Dispatch<React.SetStateAction<PickList[] | undefined>>;
	};
	alerts: Alerts;
}

const AppContext = createContext<AppContextData | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | undefined>(undefined);
	const [activePicklist, setActivePicklist] = useState<PickList | undefined>(undefined);
	const [picklists, setPicklists] = useState<PickList[] | undefined>(undefined);
	const alerts = new Alerts();

	const contextValue: AppContextData = {
		user,
		setUser,
		picklists: {
			activePicklist,
			setActivePicklist,
			picklists,
			setPicklists,
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
