import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768.2;
const MOBILE_BREAKPOINT_2 = 576.2;

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);
	const [isMobile2, setIsMobile2] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			setIsMobile(width < MOBILE_BREAKPOINT);
			setIsMobile2(width < MOBILE_BREAKPOINT_2);
		};

		window.addEventListener("resize", handleResize);
		handleResize(); // вызов при монтировании

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return { isMobile, isMobile2 };
}
