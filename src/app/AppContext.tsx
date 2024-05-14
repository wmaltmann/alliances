import { User } from "firebase/auth";
import React, { ReactNode, createContext, useContext, useState } from "react";
import { Auth } from "../model/user/authModel";

interface AppContextData {
	auth: Auth;
}

const AppContext = createContext<AppContextData | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | undefined>(undefined);

	const contextValue: AppContextData = {
		auth: {
			user,
			setUser,
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
