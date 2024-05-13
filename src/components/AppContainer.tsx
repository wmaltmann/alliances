import React, { ReactNode } from "react";

type AppContainerProps = {
	children: ReactNode;
};

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
	return <>{children}</>;
};

export default AppContainer;
