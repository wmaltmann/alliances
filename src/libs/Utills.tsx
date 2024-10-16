export const getRandomColor = () => {
	const colors = [
		"#7FFFD4",
		"#F0FFFF",
		"#FF8C00",
		"#00008B",
		"#8B008B",
		"#8FBC8F",
		"#1E90FF",
		"#228B22",
		"#8B0000",
		"#8B4513",
	];

	const randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex];
};

export const getPickListIdFromPath = (url: string): string => {
	const regex = /^\/([^/]+)\/[a-zA-Z0-9*]+$/;
	const match = url.match(regex);
	return match ? match[1] : "";
};
