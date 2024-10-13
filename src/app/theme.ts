import { createTheme } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

declare module "@mui/system" {
	interface BreakpointOverrides {
		// Custom breakpoints
		mobile: true;
		desktop: true;
		// Remove default breakpoints
		xs: false;
		sm: false;
		md: false;
		lg: false;
		xl: false;
	}
}

declare module "@mui/material/styles" {
	interface TypographyVariants {
		error1: React.CSSProperties;
		error2: React.CSSProperties;
		body3: React.CSSProperties;
	}

	interface TypographyVariantsOptions {
		error1?: React.CSSProperties;
		error2?: React.CSSProperties;
		body3?: React.CSSProperties;
	}
	interface Palette {
		chip: {
			pick: string;
			neutral: string;
			doNotPick: string;
			unassigned: string;
		};
	}
	interface PaletteOptions {
		chip?: {
			pick?: string;
			neutral?: string;
			doNotPick?: string;
			unassigned?: string;
		};
	}
}

declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		error1: true;
		error2: true;
		body3: true;
	}
}

const typography: TypographyOptions = {
	fontFamily: "Poppins",
	h1: {
		fontFamily: "Kanit",
		fontSize: 32,
		fontWeight: "500",
	},
	h2: {
		fontFamily: "Kanit",
		fontSize: 24,
		fontWeight: "500",
	},
	h3: {
		fontFamily: "Kanit",
		fontSize: 18,
		fontWeight: "500",
	},
	h4: {
		fontFamily: "Kanit",
		fontSize: 16,
		fontWeight: "500",
	},
	h5: {
		fontSize: 18,
		fontWeight: "bold",
	},
	h6: {
		fontSize: 16,
		fontWeight: "bold",
	},
	error1: {
		fontSize: 14,
		fontFamily: "Poppins",
		color: "#d32f2f",
	},
	error2: {
		fontSize: 14,
		fontFamily: "Poppins",
		color: "#d32f2f",
	},
	body1: {
		fontSize: 16,
	},
	body2: {
		fontSize: 14,
	},
	body3: {
		fontSize: 12,
	},
};

// export const themeLight = createTheme({
// 	palette: {
// 		primary: {
// 			main: "#af2eff",
// 		},
// 		secondary: {
// 			main: "#358a00",
// 		},
// 		text: {
// 			primary: "#050505",
// 			secondary: "#050505",
// 			disabled: "#050505",
// 		},
// 		background: {
// 			default: "#ffffff",
// 			paper: "#0f0f0f",
// 		},
// 	},
// 	typography: typography,
// 	breakpoints: {
// 		values: {
// 			mobile: 0,
// 			desktop: 1280,
// 		},
// 	},
// });

export const themeDark = createTheme({
	palette: {
		primary: {
			main: "#af2eff",
		},
		secondary: {
			main: "#358a00",
		},
		text: {
			primary: "#ffffff",
			secondary: "#ffffff",
			disabled: "#ffffff",
		},
		background: {
			default: "#0f0f0f",
			paper: "#2B2B2B",
		},
		chip: {
			pick: "#006600",
			neutral: "#856F00",
			doNotPick: "#A30000",
			unassigned: "#595959",
		},
	},
	typography: typography,
	breakpoints: {
		values: {
			mobile: 0,
			desktop: 1280,
		},
	},
	spacing: 4,
});
