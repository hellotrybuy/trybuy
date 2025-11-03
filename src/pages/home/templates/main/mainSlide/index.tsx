import { Link } from "react-router";
import { NestedBlock } from "../../../../../hooks/useGetMainSlider";
import styles from "../index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

type SlideProps = {
	el: NestedBlock;
};
export function Slide({ el }: SlideProps) {
	return (
		<div className={cnx("slide__inner")}>
			<Link to={el?.link ?? "/"}>
				<img
					className={cnx("slide__img")}
					src={`https://admin.trybuy.pro/${el?.image}`}
					alt={el?.title ?? ""}
				/>
				<strong className={cnx("slide__caption")}>{el?.title ?? ""}</strong>
				<div className={cnx("slide__bg")}></div>
			</Link>
		</div>
	);
}
