// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { Link } from "react-router";
// import Button from "../button";
// import styles from "./index.module.scss";
// import classNames from "classnames/bind";
// import { OptionItem, ProductData } from "../../hooks/types";
// import { useMemo, useState } from "react";
// import ProductCardSkeleton from "../productCardSkeleton/ProductCardSkeleton";
// import { PricesUnit } from "../balanceConvertor";
// import { useGetProduct } from "../../hooks/useGetProduct";

// const cnx = classNames.bind(styles);

// interface Props {
// 	raiting?: string;
// 	reviewsCount?: number;
// 	product: ProductData;
// }

// function removeEmojis(text: string) {
// 	return text.replace(
// 		/[\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF]|[\uD83C][\uDC00-\uDFFF]|[\uD83D][\uDC00-\uDFFF]|[\uD83E][\uDD10-\uDDFF]/g,
// 		"",
// 	);
// }

// function hasPriceModifier(options: OptionItem[]): boolean {
// 	if (options == undefined) return false;
// 	return options.some((opt) => {
// 		if (opt.modify_value !== undefined && opt.modify_type !== undefined)
// 			return true;
// 		if (Array.isArray(opt.variants)) {
// 			return opt.variants.some(
// 				(v) => v.modify_value !== undefined && v.modify_type !== undefined,
// 			);
// 		}
// 		return false;
// 	});
// }

// export function ProductCard({ product }: Props) {
// 	const [isImageLoaded, setIsImageLoaded] = useState(false);
// 	console.log(product, "[");

// 	const { product: productFull } = useGetProduct(product.id_product);

// 	const totalReviews = useMemo(() => {
// 		return Number(product.good_reviews) + Number(product.bad_reviews);
// 	}, [product]);

// 	const raiting = useMemo(() => {
// 		return totalReviews === 0
// 			? 0
// 			: (Number(product.good_reviews) / totalReviews) * 5;
// 	}, [product, totalReviews]);

// 	const options = useMemo(() => {
// 		if (product.options == undefined) return "";
// 		return JSON.parse(product.options) as OptionItem[];
// 	}, [product]);

// 	const isType_digi_product = useMemo(() => {
// 		return product.type_digi_product == "unit";
// 	}, [product]);

// 	function isPricesUnit(obj: any): obj is PricesUnit {
// 		return obj && typeof obj === "object";
// 	}

// 	const info = useMemo<PricesUnit | null>(() => {
// 		if (isType_digi_product) {
// 			try {
// 				const parsed = JSON.parse(product.prices_unit);
// 				if (isPricesUnit(parsed)) {
// 					return parsed;
// 				} else {
// 					console.warn("Invalid prices_unit format");
// 					return null;
// 				}
// 			} catch (e) {
// 				try {
// 					const parsed = JSON.parse(productFull[0].prices_unit);
// 					if (isPricesUnit(parsed)) {
// 						return parsed;
// 					} else {
// 						console.warn("Invalid prices_unit format");
// 						return null;
// 					}
// 				} catch {
// 					console.error("Failed to parse prices_unit:", e);
// 				}

// 				console.error("Failed to parse prices_unit:", e);
// 				return null;
// 			}
// 		}
// 	}, [product, isType_digi_product]);

// 	const curs = useMemo(() => {
// 		if (isType_digi_product && !info) {
// 			return Number(product.price);
// 		}
// 		if (!info || info.unit_cnt === 0) return 1;
// 		if (info.unit_amount && info.unit_cnt_min) {
// 			return Number(product.price) / Number(info.unit_cnt_min);
// 		}
// 		return Number(info.unit_amount);
// 	}, [info, isType_digi_product, product]);

// 	function detectPsCurrency(productName: string): string | null {
// 		const normalized = productName.toLowerCase();

// 		if (normalized.includes("steam") || normalized.includes("стим")) {
// 			if (info && info.unit_name == "Тенге") {
// 				return "STEAM ТЕНГЕ";
// 			}

// 			return "STEAM RUB";
// 		}

// 		if (normalized.includes("турци")) return "TRY";
// 		if (normalized.includes("аргентин")) return "ARS";
// 		if (normalized.includes("бразил")) return "BRL";
// 		if (normalized.includes("инди")) return "INR";
// 		if (normalized.includes("украин")) return "UAH";
// 		if (normalized.includes("казахстан")) return "KZT";
// 		if (normalized.includes("росси")) return "RUB";
// 		if (normalized.includes("чили")) return "CLP";

// 		return "";
// 	}

// 	const price = useMemo(() => {
// 		if (options != "") {
// 			const isModify = hasPriceModifier(options);
// 			if (isModify || product.prices_unit != "null") {
// 				return `От ${product.price} RUB`;
// 			} else {
// 				return `${product.price} RUB`;
// 			}
// 		}
// 		return `${product.price} RUB`;
// 	}, [product, options]);

// 	const textPrice = useMemo(() => {
// 		if (isType_digi_product && product.prices_unit != "") {
// 			return `1 ${detectPsCurrency(product.name)} = ${curs.toFixed(2)} RUB`;
// 		} else {
// 			return price;
// 		}
// 	}, [price, isType_digi_product, product, curs]);

// 	return (
// 		<>
// 			{/* Скелетон отображается, пока картинка не загружена */}
// 			{!isImageLoaded && <ProductCardSkeleton />}

// 			{/* Основная карточка */}
// 			<Link
// 				to={
// 					product.id_product
// 						? `/catalog/product/${product.id_product}`
// 						: `/catalog/product/${product.product_id}`
// 				}
// 				id={`product-${product.id}`}
// 				className={cnx("link")}
// 				style={{ display: isImageLoaded ? "block" : "none" }} // 👈 скрыта до загрузки
// 			>
// 				<div className={cnx("card")}>
// 					<div className={cnx("content")}>
// 						<img
// 							className={cnx("card__img")}
// 							src={
// 								product.id_product
// 									? `https://graph.digiseller.ru/img.ashx?id_d=${product.id_product}&w=200&h=200&crop=true`
// 									: `https://graph.digiseller.ru/img.ashx?id_d=${product.product_id}&w=200&h=200&crop=true`
// 							}
// 							alt={product.name}
// 							onLoad={() => setIsImageLoaded(true)}
// 							onError={() => setIsImageLoaded(true)}
// 						/>
// 						<strong className={cnx("card__title")}>
// 							{removeEmojis(product.name)}
// 						</strong>
// 						<div className={cnx("card__review")}>
// 							<div className={cnx("card__review-block")}>
// 								<img src="/iconsFolder/common/star.svg" alt="Рейтинг" />
// 								<span>{raiting ? raiting.toFixed(1) : "Скрыто"}</span>
// 							</div>
// 							<div className={cnx("card__review-block")}>
// 								<span>
// 									{totalReviews
// 										? totalReviews >= 1000
// 											? `1000+`
// 											: totalReviews
// 										: "Скрыто"}{" "}
// 									Оценок
// 								</span>
// 							</div>
// 						</div>
// 						<strong className={cnx("card__bottom")}>{textPrice}</strong>
// 					</div>
// 					<Button className={cnx("card__btn")}>Купить</Button>
// 				</div>
// 			</Link>
// 		</>
// 	);
// }

// export default ProductCard;
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router";
import Button from "../button";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { OptionItem, ProductData } from "../../hooks/types";
import { useMemo, useState } from "react";
import ProductCardSkeleton from "../productCardSkeleton/ProductCardSkeleton";
import { PricesUnit } from "../balanceConvertor";
import { useIsMobile } from "../../hooks/useIsMobile";

const cnx = classNames.bind(styles);

interface Props {
	raiting?: string;
	reviewsCount?: number;
	product: ProductData;
}

function isPricesUnit(obj: any): obj is PricesUnit {
	return obj && typeof obj === "object";
}

function removeEmojis(text: string): string {
	return text
		.replace(
			/([\p{Emoji_Presentation}]|[\p{Extended_Pictographic}]|[\u2600-\u27BF])/gu,
			" ",
		)
		.replace(/\s+/g, " ")
		.trim();
}

function hasPriceModifier(options: OptionItem[] | ""): boolean {
	if (options == "") return false;
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
	const { isMobile3 } = useIsMobile();

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

	const getPriceUnit = (data: string) => {
		try {
			const parsed = JSON.parse(data);
			if (isPricesUnit(parsed)) {
				return parsed;
			} else {
				console.warn("Invalid prices_unit format");
				return null;
			}
		} catch (e) {
			console.error("Failed to parse prices_unit:", e);
			return null;
		}
	};

	const price = useMemo(() => {
		if (options != "" || product.prices_unit != "null") {
			const isModify = hasPriceModifier(options);
			if (isModify || product.prices_unit != "null") {
				const data = getPriceUnit(product?.prices_unit);
				if (data) {
					// округляем вниз до 2 знаков
					const roundDown2 = (val: number) =>
						(Math.floor(val * 100) / 100).toFixed(2);

					// обрезаем слишком длинное имя (более 5 символов)
					const shortName =
						data.unit_name.length > 3 && isMobile3
							? data.unit_name.slice(0, 3) + "..."
							: data.unit_name;

					if (data?.unit_fixed && data?.unit_fixed[0]) {
						return `1 ${shortName} = ${roundDown2(
							data.unit_amount / data?.unit_fixed[0],
						)} RUB`;
					}

					const devl =
						Number(product.price) / data.unit_cnt > 100
							? data.unit_amount
							: data.unit_cnt;

					return `1 ${shortName} = ${roundDown2(
						Number(product.price) / devl,
					)} RUB`;
				} else {
					return `От ${Number(product.price)} RUB`;
				}
			} else {
				return `${product.price} RUB`;
			}
		}
		return `${product.price} RUB`;
	}, [product, options, isMobile3]);

	const imagePreviewSrc = useMemo(() => {
		if (product.preview) {
			return `https://admin.trybuy.pro/${product.preview}`;
		} else {
			return product.id_product
				? `https://graph.digiseller.ru/img.ashx?id_d=${product.id_product}&w=200&h=200&crop=true`
				: `https://graph.digiseller.ru/img.ashx?id_d=${product.product_id}&w=200&h=200&crop=true`;
		}
	}, [product]);

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
				id={`product-${product.id}`}
				className={cnx("link")}
				style={{ display: isImageLoaded ? "block" : "none" }}
			>
				<div className={cnx("card")}>
					<div className={cnx("content")}>
						<img
							className={cnx("card__img")}
							src={imagePreviewSrc}
							alt={product.name}
							onLoad={() => setIsImageLoaded(true)}
							onError={() => setIsImageLoaded(true)}
						/>
						<strong className={cnx("card__title")}>
							{removeEmojis(product.name)}
						</strong>
						<div className={cnx("card__review")}>
							{raiting ? (
								<div className={cnx("card__review-block")}>
									<img src="/iconsFolder/common/star.svg" alt="Рейтинг" />
									<span>{raiting > 1 && raiting.toFixed(1)}</span>
								</div>
							) : (
								<></>
							)}
							<div className={cnx("card__pr__type")}>
								<span>{product.type_name}</span>
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
