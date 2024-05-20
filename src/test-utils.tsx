import { render, RenderOptions } from "@testing-library/react";
import React, { ReactElement, ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContextProvider } from "./app/AppContext";

interface AllProvidersProps {
	children: ReactNode;
}

const AllProviders: React.FC<AllProvidersProps> = ({ children }) => {
	return (
		<AppContextProvider>
			<Router>{children}</Router>
		</AppContextProvider>
	);
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "queries">) =>
	render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
