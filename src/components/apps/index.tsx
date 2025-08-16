import { useGetShowHeaderMenu } from "../../hooks/useGetShowHeaderMenu";
import { useWindowSize } from "../../hooks/useWindiwSize";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

interface IApps {
	className?: string;
}

import { useRef, useState, useEffect } from "react";

export function Apps({ className }: IApps) {
	const { data } = useGetShowHeaderMenu();

	return (
		<div className={cnx("apps", className)}>
			{data[0]?.data.map((el) => (
				<AppItem
					key={el.id}
					icon={`https://try-buy.ru/${el.header_icon}`}
					text={el.header_menu}
					url={el.header_url}
				/>
			))}
		</div>
	);
}

function AppItem({
	icon,
	text,
	url,
}: {
	icon: string;
	text: string;
	url: string;
}) {
	const textRef = useRef<HTMLSpanElement>(null);
	const [hovered, setHovered] = useState(false);
	const [textWidth, setTextWidth] = useState(0);

	const [width] = useWindowSize();

	useEffect(() => {
		if (textRef.current && width > 991) {
			setTextWidth(textRef.current.offsetWidth + 40);
		}
	}, [width]);

	const isLargeScreen = width > 991;
	const currentWidth = isLargeScreen && hovered ? `${textWidth}px` : "24px";

	return (
		<a
			href={url}
			className={cnx("app", { "no-hover": !isLargeScreen })}
			style={{ width: currentWidth }}
			onMouseEnter={() => isLargeScreen && setHovered(true)}
			onMouseLeave={() => isLargeScreen && setHovered(false)}
		>
			<img src={icon} alt="" />
			{isLargeScreen && <span ref={textRef}>{text}</span>}
		</a>
	);
}

export default Apps;
