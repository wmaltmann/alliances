import { User as fbUser } from "firebase/auth";
import React, { ReactNode, createContext, useContext, useState } from "react";
import { PickList } from "../model/picklist/picklist.Model";
import { User } from "../model/user/user.Model";

export interface AppContextData {
	auth: {
		fbUser: fbUser | undefined;
		setFbUser: React.Dispatch<React.SetStateAction<fbUser | undefined>>;
	};
	user: User | undefined;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
	picklists: {
		activePicklist: PickList | undefined;
		setActivePicklist: React.Dispatch<React.SetStateAction<PickList | undefined>>;
		picklists: PickList[] | undefined;
		setPicklists: React.Dispatch<React.SetStateAction<PickList[] | undefined>>;
	};
}

const AppContext = createContext<AppContextData | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [fbUser, setFbUser] = useState<fbUser | undefined>(undefined);
	const [user, setUser] = useState<User | undefined>(undefined);
	const [activePicklist, setActivePicklist] = useState<PickList | undefined>(undefined);
	const [picklists, setPicklists] = useState<PickList[] | undefined>(undefined);

	const contextValue: AppContextData = {
		auth: {
			fbUser,
			setFbUser,
		},
		user,
		setUser,
		picklists: {
			activePicklist,
			setActivePicklist,
			picklists,
			setPicklists,
		},
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
