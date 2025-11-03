import { useState, useEffect, useMemo } from "react";
import cnx from "classnames/bind";
import styles from "../index.module.scss";
import Button from "../../../components/button";
import { Link } from "react-router";
import { OptionItem } from "../../../hooks/types";
import { PricesUnit } from "../../../components/balanceConvertor";
import { useIsMobile } from "../../../hooks/useIsMobile";

const cx = cnx.bind(styles);

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

export function CommerceCard({ product }) {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 990);
	const { isMobile: isMobile1 } = useIsMobile();
	const imagePreviewSrc = useMemo(() => {
		if (product?.preview) {
			return `https://admin.trybuy.pro/${product?.preview}`;
		} else {
			return product?.id_product
				? `https://graph.digiseller.ru/img.ashx?id_d=${product?.id_product}&w=200&h=200&crop=true`
				: `https://graph.digiseller.ru/img.ashx?id_d=${product?.product_id}&w=200&h=200&crop=true`;
		}
		return "";
	}, [product]);

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
						data.unit_name.length > 3 && isMobile1
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
	}, [product, options, isMobile1]);

	useEffect(() => {
		function handleResize() {
			setIsMobile(window.innerWidth <= 990);
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const totalReviews =
		Number(product.good_reviews) + Number(product.bad_reviews);
	const rating =
		totalReviews === 0 ? 0 : (Number(product.good_reviews) / totalReviews) * 5;

	if (isMobile) {
		return (
			<div className={cx("main__box", "box", "_mobile")}>
				<div className={cx("box__top")}>
					<img
						className={cx("box__img")}
						src={imagePreviewSrc || ""}
						alt={product.platform_name || "Platform"}
					/>
					<div className={cx("box__info-mobile")}>
						<b className={cx("box__title")}>{removeEmojis(product.name)}</b>
						<strong className={cx("box__price")}>{price}</strong>
					</div>
				</div>
				<Link
					to={`/catalog/product/${product.id_product}`}
					style={{
						width: "100%",
					}}
				>
					<Button className={cx("box__btn")}>Купить</Button>
				</Link>
			</div>
		);
	}

	// Десктопный вариант
	return (
		<div className={cx("main__box", "box", "_desktop")}>
			<img
				className={cx("box__img")}
				src={imagePreviewSrc || ""}
				alt={product.platform_name || "Platform"}
			/>
			<div className={cx("box__main")}>
				<div className={cx("box__top")}>
					<div className={cx("box__top-block")}>
						{/* SVG иконка */}
						<svg
							width="8"
							height="13"
							viewBox="0 0 8 13"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2.84266 7.3729L2.38269 7.10733C1.16294 6.40311 0.553072 6.051 0.528428 5.50384C0.503784 4.95667 1.07953 4.55116 2.23103 3.74014L5.91355 1.14649C6.64173 0.633619 7.00582 0.377185 7.15415 0.512727C7.30247 0.648269 7.07981 1.03394 6.63448 1.80527L5.02363 4.59535C4.90578 4.79947 4.84685 4.90153 4.87365 5.00156C4.90045 5.10158 5.00252 5.16051 5.20664 5.27836L5.66661 5.54393C6.88635 6.24814 7.49622 6.60025 7.52087 7.14742C7.54551 7.69459 6.96976 8.1001 5.81826 8.91112L2.13574 11.5048C1.40757 12.0176 1.04348 12.2741 0.895149 12.1385C0.746822 12.003 0.969487 11.6173 1.41482 10.846L3.02567 8.05591C3.14352 7.85179 3.20245 7.74972 3.17564 7.6497C3.14884 7.54967 3.04678 7.49075 2.84266 7.3729Z"
								fill="url(#paint0_linear_743_10719)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_743_10719"
									x1="7.76954"
									y1="-0.160715"
									x2="0.279755"
									y2="12.812"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="#FEFEFE" />
									<stop offset="1" stopColor="#DADADA" />
								</linearGradient>
							</defs>
						</svg>
						<span>{product.seller_name || ""}</span>
					</div>
					{rating ? (
						<div className={cx("box__top-block")}>
							<img src="/iconsFolder/common/star.svg" alt="Star" />
							<span>{rating.toFixed(1)}</span>
						</div>
					) : (
						<></>
					)}
					<div className={cx("pr__type")}>
						<span>{product.type_name}</span>
					</div>
				</div>
				<b className={cx("box__title")}>{removeEmojis(product.name)}</b>
				<div className={cx("box__actions")}>
					<Link to={`/catalog/product/${product.id_product}`}>
						<Button className={cx("box__btn")}> {price} </Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
