import { useEffect } from "react";

export function useEnterKey(callback: () => void, deps: any[] = []) {
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Enter") {
				callback();
			}
		};

		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, deps);
}
