import { v4 as uuidv4 } from "uuid";

export const getEventList = () => {
	return [];
};

export const createEvent = () => {
	const t = uuidv4();
	console.log(t);
};
