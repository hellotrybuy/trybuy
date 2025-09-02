import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;
const MOBILE_BREAKPOINT_2 = 576;
const MOBILE_BREAKPOINT_3 = 1600;
const MOBILE_BREAKPOINT_4 = 991;

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);
	const [isMobile2, setIsMobile2] = useState(false);
	const [isMobile3, setIsMobile3] = useState(false);
	const [isBig, setIsBig] = useState(false);

	useEffect(() => {
		const check = () => {
			const width = window.innerWidth;

			// Проверяем display-mode: standalone (PWA)
			const isStandalone = window.matchMedia(
				"(display-mode: standalone)",
			).matches;

			// Если standalone, можно подкорректировать breakpoints (опционально)
			const adjustedWidth = isStandalone ? width - 0 : width; // при необходимости можно вычитать padding/status bar

			setIsMobile(adjustedWidth < MOBILE_BREAKPOINT);
			setIsMobile2(adjustedWidth < MOBILE_BREAKPOINT_2);
			setIsMobile3(adjustedWidth < MOBILE_BREAKPOINT_4);
			setIsBig(adjustedWidth > MOBILE_BREAKPOINT_3);
		};

		check(); // первый вызов при монтировании
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);

	return { isMobile, isMobile2, isMobile3, isBig };
}
