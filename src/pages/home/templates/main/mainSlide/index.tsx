import { Link } from "react-router";
import { NestedBlock } from "../../../../../hooks/useGetMainSlider";
import styles from "../index.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";

const cnx = classNames.bind(styles);

type SlideProps = {
	el: NestedBlock;
};

export function Slide({ el }: SlideProps) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div className={cnx("slide__inner")}>
			{!loaded && <div className={cnx("slide__skeleton")} />}

			<Link to={el?.link ?? "/"}>
				<img
					className={cnx("slide__img", { _hidden: !loaded })}
					src={`https://admin.trybuy.pro/${el?.image}`}
					onLoad={() => setLoaded(true)}
				/>

				{loaded && (
					<>
						<strong className={cnx("slide__caption")}>{el?.title ?? ""}</strong>
						<div className={cnx("slide__bg")}></div>
					</>
				)}
			</Link>
		</div>
	);
}
