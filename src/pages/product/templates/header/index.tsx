import { useSearchParams } from "react-router";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

import { PayType } from "../../../../types";
import { PAY_TYPE } from "../../../../constants/searchParams";
import ProductReplenishment from "./templates/replenishment";
import ProductActivation from "./templates/activation";
import { ProductData } from "../../../../hooks/types";
import { useMemo } from "react";

const cnx = classNames.bind(styles);

interface Props {
	product: ProductData;
}

export function ProductHeader({ product }: Props) {
	const [searchParams] = useSearchParams();
	const searchPayType = searchParams.get(PAY_TYPE) as PayType;

	// const getCaptionText = () => {
	// 	switch (searchPayType) {
	// 		case "offline":
	// 			return "Оффлайн аккаунт";
	// 		case "activation":
	// 			return "Активация";
	// 		case "replenishment":
	// 			return "Пополнение";
	// 		default:
	// 			return "Оффлайн аккаунт";
	// 	}
	// };

	// const captionClasses = cnx({
	// 	top__caption: true,
	// 	_offline: searchPayType === "offline",
	// 	_activation: searchPayType === "activation",
	// 	_replenishment: searchPayType === "replenishment",
	// });

	const reviewsCount = useMemo(() => {
		const bad = Number(product.statistics.bad_reviews);
		const good = Number(product.statistics.good_reviews);

		return (bad + good).toString();
	}, [product]);

	return (
		<div className={cnx("header")}>
			<div className={cnx("header__top", "top")}>
				{/* <div className={captionClasses}>{getCaptionText()}</div> */}
				<div className={cnx("top__info")}>
					<div className={cnx("top__info-block")}>
						<div className={cnx("top__info-reviews")}>
							<div className={cnx("top__info-star")}>
								<img src="/iconsFolder/common/star.svg" alt="Оценка" />
								<span>{"5.0"}</span>
							</div>
							<span>{reviewsCount ?? 0} отзывов</span>
						</div>
					</div>
					<div className={cnx("top__info-block")}>
						{product.statistics.sales ?? 0} продано
					</div>
				</div>
			</div>

			<div className={cnx("header__main", "main")}>
				<div className={cnx("main__top")}>
					<h1 className={cnx("main__title")}>Купить {product.name}</h1>
					{product.preview_imgs[0] && (
						<img src={product.preview_imgs[0].url} alt={product.name} />
					)}
				</div>

				<div className={cnx("main__bottom")}>
					{/* {!searchPayType && (
						<div className={cnx("main__offline-text")}>
							<ul>
								<li>{product.category}</li>
								<li>• {product.isNew ? "Новинка" : "Бестселлер"}</li>
								<li>• Поддерживаемые языки {product.languageCount}</li>
								<li>
									•{" "}
									{product.offline
										? "Не требует интернет подключения"
										: "Онлайн-режим"}
								</li>
								<li>• Гарантия {product.guaranteeDays} дней</li>
							</ul>
						</div>
					)}

					{searchPayType === "offline" && (
						<div className={cnx("main__offline-text")}>
							<ul>
								<li>{product.category}</li>
								<li>• {product.isNew ? "Новинка" : "Бестселлер"}</li>
								<li>• Поддерживаемые языки {product.languageCount}</li>
								<li>• Не требует интернет подключения</li>
								<li>• Гарантия {product.guaranteeDays} дней</li>
							</ul>
						</div>
					)} */}
					<div className={cnx("main__offline-text")}>
						{/* <DeliveryInfo rawHtml={product.info} /> */}
					</div>
					<ProductActivation product={product} />
					{searchPayType === "replenishment" && <ProductReplenishment />}
				</div>
			</div>
		</div>
	);
}

export default ProductHeader;
