/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router";
import Button from "../button";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { OptionItem, ProductData } from "../../hooks/types";
import { useMemo, useState } from "react";
import ProductCardSkeleton from "../productCardSkeleton/ProductCardSkeleton";

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
		if (opt.modify_value !== undefined && opt.modify_type !== undefined)
			return true;
		if (Array.isArray(opt.variants)) {
			return opt.variants.some(
				(v) => v.modify_value !== undefined && v.modify_type !== undefined,
			);
		}
		return false;
	});
}

export function ProductCard({ product }: Props) {
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	console.log(product, "p");

	const totalReviews = useMemo(() => {
		return Number(product.good_reviews) + Number(product.bad_reviews);
	}, [product]);

	const raiting = useMemo(() => {
		return totalReviews === 0
			? 0
			: (Number(product.good_reviews) / totalReviews) * 5;
	}, [product, totalReviews]);

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
		<>
			{/* Скелетон отображается, пока картинка не загружена */}
			{!isImageLoaded && <ProductCardSkeleton />}

			{/* Основная карточка */}
			<Link
				to={
					product.id_product
						? `/catalog/product/${product.id_product}`
						: `/catalog/product/${product.product_id}`
				}
				className={cnx("link")}
				style={{ display: isImageLoaded ? "block" : "none" }} // 👈 скрыта до загрузки
			>
				<div className={cnx("card")}>
					<div className={cnx("content")}>
						<img
							className={cnx("card__img")}
							src={
								product.id_product
									? `https://graph.digiseller.ru/img.ashx?id_d=${product.id_product}&w=200&h=200&crop=true`
									: `https://graph.digiseller.ru/img.ashx?id_d=${product.product_id}&w=200&h=200&crop=true`
							}
							alt={product.name}
							onLoad={() => setIsImageLoaded(true)}
							onError={() => setIsImageLoaded(true)}
						/>
						<strong className={cnx("card__title")}>
							{removeEmojis(product.name)}
						</strong>
						<div className={cnx("card__review")}>
							<div className={cnx("card__review-block")}>
								<img src="/iconsFolder/common/star.svg" alt="Рейтинг" />
								<span>{raiting ? raiting.toFixed(1) : "Скрыто"}</span>
							</div>
							<div className={cnx("card__review-block")}>
								<span>
									{totalReviews
										? totalReviews >= 1000
											? `1000+`
											: totalReviews
										: "Скрыто"}{" "}
									Оценок
								</span>
							</div>
						</div>
						<strong className={cnx("card__bottom")}>{price}</strong>
					</div>
					<Button className={cnx("card__btn")}>Купить</Button>
				</div>
			</Link>
		</>
	);
}

export default ProductCard;
