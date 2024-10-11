import React, { ReactNode, createContext, useContext, useState } from "react";
import Alerts from "../model/alerts/alerts.model";
import { Event } from "../model/event/event.Model";
import { User } from "../model/user/user.Model";

export interface AppContextData {
	user: User | undefined;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
	picklists: {
		activeEvent: Event | undefined;
		setActiveEvent: React.Dispatch<React.SetStateAction<Event | undefined>>;
		events: Event[] | undefined;
		setEvents: React.Dispatch<React.SetStateAction<Event[] | undefined>>;
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
	const [activeEvent, setActiveEvent] = useState<Event | undefined>(undefined);
	const [events, setEvents] = useState<Event[] | undefined>(undefined);
	const [bottomBarState, setBottomBarState] = useState<number>(0);
	const alerts = new Alerts();

	const contextValue: AppContextData = {
		user,
		setUser,
		picklists: {
			activeEvent,
			setActiveEvent,
			events,
			setEvents,
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
