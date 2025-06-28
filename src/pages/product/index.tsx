import styles from "./index.module.scss";
import classNames from "classnames/bind";

import { CONTAINER } from "../../constants/classnames";
import ProductHeader from "./templates/header";
import Breadcrumbs from "../../components/breadcrumbs";
import ProductPay from "./templates/pay";
import ProductDescription from "./templates/description";
import ProductExtraInfo from "./templates/extra-info";
import ProductRewies from "./templates/reviews";
import Button from "../../components/button";
import OtherProducts from "./templates/other-products";
import { useParams } from "react-router";
import { useGetProduct } from "../../hooks/useGetProduct";
import { ProductData } from "../../hooks/types";
import { useEffect } from "react";
import { PriceProvider } from "./context";

const cnx = classNames.bind(styles);

export function ProductPage() {
	const { id } = useParams();
	const data = useGetProduct(id);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (data.product == null) return;
	const product = data.product as ProductData;

	return (
		<PriceProvider>
			<div className={cnx("product")}>
				<Breadcrumbs />
				<div className={CONTAINER}>
					<div className={cnx("product__inner")}>
						<div className={cnx("product__main")}>
							<ProductHeader product={product} />
							<ProductPay />
							<ProductDescription product={product} />
							{/* <ProductParams /> */}
							<ProductExtraInfo />
							<ProductRewies />
						</div>
						<aside className={cnx("product__aside", "aside")}>
							<img
								className={cnx("aside__img")}
								src={product.preview_imgs[0].url}
								alt={product.name}
							/>
							<div className={cnx("aside__block", "seller")}>
								<span className={cnx("seller__caption")}>продавец</span>
								<div className={cnx("seller__top")}>
									<strong>{product.seller.name}</strong>
									<div className={cnx("seller__star")}>
										<img src="/icons/common/star.svg" alt="Оценка" />
										<span>5,0</span>
									</div>
								</div>
								<p className={cnx("seller__info")}>
									Если вы уже приобрели товар — напишите продавцу на сайте
									oplata.info на странице заказа.
									<br />
									<br />
									Аттестат продавца
								</p>
								<Button className={cnx("seller__btn")} white>
									Написать продавцу
								</Button>
							</div>
							<div className={cnx("aside__block", "payment")}>
								<strong className={cnx("payment__title")}>
									Способы оплаты
								</strong>
								<div className={cnx("payment__grid")}>
									<img src="/mock/apple-pay.png" alt="Apple pay" />
									<img src="/mock/unionpay.png" alt="Union pay" />
									<img src="/mock/wepay.png" alt="Wepay" />
									<img src="/mock/apple-pay.png" alt="Apple pay" />
									<img src="/mock/unionpay.png" alt="Union pay" />
									<img src="/mock/wepay.png" alt="Wepay" />
									<img src="/mock/apple-pay.png" alt="Apple pay" />
									<img src="/mock/unionpay.png" alt="Union pay" />
									<img src="/mock/wepay.png" alt="Wepay" />
									<img src="/mock/apple-pay.png" alt="Apple pay" />
									<img src="/mock/unionpay.png" alt="Union pay" />
									<img src="/mock/wepay.png" alt="Wepay" />
									<img src="/mock/apple-pay.png" alt="Apple pay" />
									<img src="/mock/unionpay.png" alt="Union pay" />
									<img src="/mock/wepay.png" alt="Wepay" />
								</div>
							</div>
						</aside>
					</div>
					<OtherProducts />
				</div>

				{/* Mobile but button */}
				<div className={cnx("product__buy")}>
					<Button className={cnx("product__buy-btn")}>499 ₽ КУПИТЬ</Button>
				</div>
			</div>
		</PriceProvider>
	);
}
export default ProductPage;
