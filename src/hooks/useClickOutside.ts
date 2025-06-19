import { useEffect } from "react";

export function useClickOutside(
	ref: React.RefObject<HTMLElement | null>,
	callback: () => void,
) {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			const el = ref.current;
			if (!el || el.contains(event.target as Node)) return;
			callback();
			console.log(1);
		};

		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);

		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, callback]);
}
