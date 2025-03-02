import { render, screen } from "../../test-utils";
import ComingSoonPage from "./ComingSoonPage";

test("renders Typography elements with specific text", () => {
	render(<ComingSoonPage />);

	const welcomeElement = screen.getByText(/Welcome to Alliance Selector/i);
	expect(welcomeElement).toBeInTheDocument();

	const comingSoonElement = screen.getByText(/We are currently building this app/i);
	expect(comingSoonElement).toBeInTheDocument();
});
