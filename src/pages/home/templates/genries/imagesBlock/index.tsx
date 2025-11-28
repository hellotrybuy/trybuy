import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { useRef } from "react";

const cnx = classNames.bind(styles);

interface ImagesBlockProps {
	images: string[];
	isHovered: boolean;
	index: number;
	onReady?: () => void; // вызывается, когда все картинки загружены
	hidden?: boolean; // для skeleton
}

export default function ImagesBlock({
	images,
	isHovered,
	index,
	onReady,
	hidden = false,
}: ImagesBlockProps) {
	const loadedRef = useRef(0); // счетчик загрузки, не зависит от ререндеров
	const isBigPicture = index !== 1 && index !== 5;

	const getImage = (image: string) => `https://admin.trybuy.pro/${image}`;

	const handleImageLoad = () => {
		loadedRef.current += 1;
		console.log(
			`[ImagesBlock] index=${index} image loaded (${loadedRef.current}/${
				isBigPicture ? Math.min(images.length, 3) : 1
			})`,
			images,
		);

		if (loadedRef.current === (isBigPicture ? Math.min(images.length, 3) : 1)) {
			console.log(`[ImagesBlock] index=${index} all images loaded`);
			onReady?.();
		}
	};

	const imgProps = hidden ? { style: { display: "none" } } : {};

	const imgElements = isBigPicture
		? images.slice(0, 3).map((img, i) => (
				<div
					key={i}
					className={cnx(
						i === 0
							? "imgBlock__first"
							: i === 1
							? "imgBlock__second"
							: "imgBlock__tree",
						isHovered && "hovered",
					)}
				>
					<img {...imgProps} src={getImage(img)} onLoad={handleImageLoad} />
				</div>
		  ))
		: [
				<div key={0} className={cnx("imgBlock__xbox", isHovered && "hovered")}>
					<img
						{...imgProps}
						src={getImage(images[0])}
						onLoad={handleImageLoad}
					/>
				</div>,
		  ];

	return (
		<div className={cnx("imgBlock", isHovered && "hovered")}>{imgElements}</div>
	);
}
