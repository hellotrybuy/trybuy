import styles from "./index.module.scss";
import classNames from "classnames/bind";
const cnx = classNames.bind(styles);

interface ImagesBlockProps {
	images: string[];
	isHovered: boolean;
	index: number;
}

export default function ImagesBlock({
	images,
	isHovered,
	index,
}: ImagesBlockProps) {
	const isBigPicture = index != 3 && index != 5;

	const getImage = (image: string) => {
		return `https://admin.try-buy.ru/${image}`;
	};

	if (!isBigPicture) {
		return (
			<div className={cnx("imgBlock", isHovered && "hovered")}>
				<div className={cnx("imgBlock__xbox", isHovered && "hovered")}>
					<img className={""} src={getImage(images[0])} />
				</div>
			</div>
		);
	} else {
		return (
			<div className={cnx("imgBlock", isHovered && "hovered")}>
				<div className={cnx("imgBlock__first", isHovered && "hovered")}>
					<img className={""} src={getImage(images[0])} />
				</div>
				<div className={cnx("imgBlock__second", isHovered && "hovered")}>
					<img className={""} src={getImage(images[1])} />
				</div>
				<div className={cnx("imgBlock__tree", isHovered && "hovered")}>
					<img className={""} src={getImage(images[2])} />
				</div>
			</div>
		);
	}
}
