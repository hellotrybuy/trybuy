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
	const reviewsCount = useMemo(() => {
		const bad = Number(product[0].bad_reviews);
		const good = Number(product[0].good_reviews);

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
						{product[0].sales ?? 0} продано
					</div>
				</div>
			</div>

			<div className={cnx("header__main", "main")}>
				<div className={cnx("main__top")}>
					<h1 className={cnx("main__title")}>Купить {product[0].name}</h1>
					<img
						src={`https://graph.digiseller.ru/img.ashx?id_d=${product[0].id_product}&w=200&h=200&crop=true`}
						alt={product[0].name}
					/>
				</div>

				<div className={cnx("main__bottom")}>
					<div className={cnx("main__offline-text")}></div>
					<ProductActivation product={product} />
					{searchPayType === "replenishment" && <ProductReplenishment />}
				</div>
			</div>
		</div>
	);
}

export default ProductHeader;
