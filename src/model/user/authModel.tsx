import { User } from "firebase/auth";

export interface Auth {
	user: User | undefined;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}
