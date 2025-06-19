import Button from "../button";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

interface ISwiperControl {
	prevBtn: React.RefObject<null>;
	nextBtn: React.RefObject<null>;
}

export function SwiperControl({ prevBtn, nextBtn }: ISwiperControl) {
	return (
		<div className={cnx("control")}>
			<Button className={cnx("control__prev")} icon ref={prevBtn}>
				<svg
					width="9"
					height="17"
					viewBox="0 0 9 17"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M7.84277 1.84375L1.17611 8.51041L7.84277 15.1771"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</Button>
			<Button className={cnx("control__next")} icon ref={nextBtn}>
				<svg
					width="9"
					height="17"
					viewBox="0 0 9 17"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M7.84277 1.84375L1.17611 8.51041L7.84277 15.1771"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</Button>
		</div>
	);
}
export default SwiperControl;
