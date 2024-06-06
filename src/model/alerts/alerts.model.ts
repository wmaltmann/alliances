import { v4 as uuidv4 } from "uuid";

export interface AlertData {
	id: string;
	severity: "error" | "warning" | "success" | "info";
	message: string;
	timeout?: number;
}

export default class Alerts {
	private alerts: AlertData[] = [];
	private listeners: ((alerts: AlertData[]) => void)[] = [];

	addAlert(
		severity: "error" | "warning" | "success" | "info",
		message: string,
		timeout?: number,
	) {
		const id = uuidv4();
		const newAlert = { id, message, severity };
		this.alerts = [...this.alerts, newAlert];
		this.notify();
		const milliseconds = timeout ? timeout * 1000 : 30000;
		setTimeout(() => {
			this.removeAlert(id);
		}, milliseconds);
		return id;
	}

	removeAlert(id: string) {
		this.alerts = this.alerts.filter((alert) => alert.id !== id);
		this.notify();
	}

	subscribe(listener: (alerts: AlertData[]) => void) {
		this.listeners.push(listener);
		return () => {
			this.listeners = this.listeners.filter((l) => l !== listener);
		};
	}

	private notify() {
		this.listeners.forEach((listener) => listener(this.alerts));
	}
}
