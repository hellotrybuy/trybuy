import styles from "../index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

type SlideProps = {
	img: string;
	alt: string;
	caption: string;
};
export function Slide({ img, alt, caption }: SlideProps) {
	return (
		<div className={cnx("slide__inner")}>
			<img className={cnx("slide__img")} src={img} alt={alt} />
			<strong className={cnx("slide__caption")}>{caption}</strong>
			<div className={cnx("slide__bg")}></div>
		</div>
	);
}
