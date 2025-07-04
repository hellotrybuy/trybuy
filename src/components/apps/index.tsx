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
				<img src="/iconsFolder/header/steam.svg" alt="" />
				<img src="/iconsFolder/header/steam-extended.svg" alt="" />
			</a>
			<a href="#" className={cnx("app")}>
				<img src="/iconsFolder/header/xbox.svg" alt="" />
				<img src="/iconsFolder/header/xbox-extended.svg" alt="" />
			</a>
			<a href="#" className={cnx("app")}>
				<img src="/iconsFolder/header/playstation.svg" alt="" />
				<img src="/iconsFolder/header/playstation-extended.svg" alt="" />
			</a>
			<a href="#" className={cnx("app")}>
				<img src="/iconsFolder/header/nintendo.svg" alt="" />
				<img src="/iconsFolder/header/nintendo-extended.svg" alt="" />
			</a>
			<a href="#" className={cnx("app")}>
				<img src="/iconsFolder/header/discord.svg" alt="" />
				<img src="/iconsFolder/header/discord-extended.svg" alt="" />
			</a>
			<a href="#" className={cnx("app")}>
				<img src="/iconsFolder/header/microsoft.svg" alt="" />
				<img src="/iconsFolder/header/microsoft-extended.svg" alt="" />
			</a>
		</div>
	);
}
export default Apps;
