import { useEffect } from "react";

export function useClickOutside(
	refs: Array<React.RefObject<HTMLElement | null>>,
	callback: () => void,
) {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			if (
				refs.some((ref) => {
					const el = ref.current;
					return el && el.contains(event.target as Node);
				})
			) {
				return;
			}

			callback();
		};

		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);

		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [refs, callback]);
}
