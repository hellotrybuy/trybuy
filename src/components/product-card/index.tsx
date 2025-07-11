import { Link } from "react-router";
import Button from "../button";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { ProductData } from "../../hooks/types";

const cnx = classNames.bind(styles);

interface Props {
	raiting?: string;
	reviewsCount?: number;
	product: ProductData;
}
export function ProductCard({
	raiting = "5.0",
	reviewsCount = 1000,
	product,
}: Props) {
	return (
		<Link to={`/product/${product.id_product}`} className={cnx("link")}>
			<div className={cnx("card")}>
				<div className={cnx("content")}>
					<img
						className={cnx("card__img")}
						src={`https://graph.digiseller.ru/img.ashx?id_d=${product.id_product}&w=200&h=200&crop=true`}
						alt={product.name}
					/>
					<strong className={cnx("card__title")}>{product.name}</strong>
					<div className={cnx("card__review")}>
						<div className={cnx("card__review-block")}>
							<img src="/iconsFolder/common/star.svg" alt="Рейтинг" />
							<span>{raiting}</span>
						</div>
						<div className={cnx("card__review-block")}>
							<span>{reviewsCount}+ Оценок</span>
						</div>
					</div>
					<strong className={cnx("card__bottom")}>
						1 Steam RUB = 1,23 RUB
					</strong>
				</div>
				<Button className={cnx("card__btn")}>Купить</Button>
			</div>
		</Link>
	);
}

export default ProductCard;
