import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

interface IApps {
	className?: string;
}

export function Apps({ className }: IApps) {
	return (
		<div className={cnx("apps", className)}>
			<a href="#" className={cnx("app")}>
				<img src="/icons/header/steam.svg" alt="" />
				<img src="/icons/header/steam-extended.svg" alt="" />
			</a>
			<a href="#" className={cnx("app")}>
				<img src="/icons/header/xbox.svg" alt="" />
				<img src="/icons/header/xbox-extended.svg" alt="" />
			</a>
			<a href="#" className={cnx("app")}>
				<img src="/icons/header/playstation.svg" alt="" />
				<img src="/icons/header/playstation-extended.svg" alt="" />
			</a>
			<a href="#" className={cnx("app")}>
				<img src="/icons/header/nintendo.svg" alt="" />
				<img src="/icons/header/nintendo-extended.svg" alt="" />
			</a>
			<a href="#" className={cnx("app")}>
				<img src="/icons/header/discord.svg" alt="" />
				<img src="/icons/header/discord-extended.svg" alt="" />
			</a>
			<a href="#" className={cnx("app")}>
				<img src="/icons/header/microsoft.svg" alt="" />
				<img src="/icons/header/microsoft-extended.svg" alt="" />
			</a>
		</div>
	);
}
export default Apps;
