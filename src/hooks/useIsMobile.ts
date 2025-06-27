import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768.2; // можно изменить под свой проект

export function useIsMobile(): boolean {
	const [isMobile, setIsMobile] = useState(
		typeof window !== "undefined"
			? window.innerWidth < MOBILE_BREAKPOINT
			: false,
	);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};

		window.addEventListener("resize", handleResize);

		// Первый вызов при монтировании
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return isMobile;
}
