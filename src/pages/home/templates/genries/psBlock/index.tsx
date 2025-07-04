import styles from "./index.module.scss";
import classNames from "classnames/bind";
const cnx = classNames.bind(styles);

interface ImagesBlockProps {
	isHovered: boolean;
}

export default function PsAnim({ isHovered }: ImagesBlockProps) {
	return (
		<div className={cnx("psAnim")}>
			<img
				src="/iconsFolder/psAnimation/circle.svg"
				className={cnx("psAnim__circle", isHovered && "hovered")}
			/>
			<img
				src="/iconsFolder/psAnimation/cross.svg"
				className={cnx("psAnim__cross", isHovered && "hovered")}
			/>
			<img
				src="/iconsFolder/psAnimation/squre.png"
				className={cnx("psAnim__squre", isHovered && "hovered")}
			/>
			<img
				src="/iconsFolder/psAnimation/triangle.svg"
				className={cnx("psAnim__triangle", isHovered && "hovered")}
			/>
		</div>
	);
}
