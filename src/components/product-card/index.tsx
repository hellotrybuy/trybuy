import { Link } from "react-router";
import Button from "../button";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { OptionItem, ProductData } from "../../hooks/types";
import { useMemo } from "react";

const cnx = classNames.bind(styles);

interface Props {
	raiting?: string;
	reviewsCount?: number;
	product: ProductData;
}

function removeEmojis(text: string) {
	return text.replace(
		/[\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF]|[\uD83C][\uDC00-\uDFFF]|[\uD83D][\uDC00-\uDFFF]|[\uD83E][\uDD10-\uDDFF]/g,
		"",
	);
}

function hasPriceModifier(options: OptionItem[]): boolean {
	if (options == undefined) return false;
	return options.some((opt) => {
		if (opt.modify_value !== undefined && opt.modify_type !== undefined) {
			return true;
		}

		if (Array.isArray(opt.variants)) {
			return opt.variants.some(
				(v) => v.modify_value !== undefined && v.modify_type !== undefined,
			);
		}

		return false;
	});
}

export function ProductCard({
	raiting = "5.0",
	reviewsCount = 1000,
	product,
}: Props) {
	const options = useMemo(() => {
		if (product.options == undefined) return "";
		return JSON.parse(product.options) as OptionItem[];
	}, [product]);

	const price = useMemo(() => {
		if (options != "") {
			const isModify = hasPriceModifier(options);
			if (isModify || product.prices_unit != "null") {
				return `От ${product.price} RUB`;
			} else {
				return `${product.price} RUB`;
			}
		}
		return `${product.price} RUB`;
	}, [product, options]);

	return (
		<Link to={`/product/${product.id_product}`} className={cnx("link")}>
			<div className={cnx("card")}>
				<div className={cnx("content")}>
					<img
						className={cnx("card__img")}
						src={`https://graph.digiseller.ru/img.ashx?id_d=${product.id_product}&w=200&h=200&crop=true`}
						alt={product.name}
					/>
					<strong className={cnx("card__title")}>
						{removeEmojis(product.name)}
					</strong>
					<div className={cnx("card__review")}>
						<div className={cnx("card__review-block")}>
							<img src="/iconsFolder/common/star.svg" alt="Рейтинг" />
							<span>{raiting}</span>
						</div>
						<div className={cnx("card__review-block")}>
							<span>{reviewsCount}+ Оценок</span>
						</div>
					</div>
					<strong className={cnx("card__bottom")}>{price}</strong>
				</div>
				<Button className={cnx("card__btn")}>Купить</Button>
			</div>
		</Link>
	);
}

export default ProductCard;
