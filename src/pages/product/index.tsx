import styles from "./index.module.scss";
import classNames from "classnames/bind";

import { CONTAINER } from "../../constants/classnames";
import ProductHeader from "./templates/header";
import Breadcrumbs, { Crumb } from "../../components/breadcrumbs";
import ProductPay from "./templates/pay";
import ProductDescription from "./templates/description";
import ProductExtraInfo from "./templates/extra-info";
import ProductRewies from "./templates/reviews";
import Button from "../../components/button";
import OtherProducts from "./templates/other-products";
import { Link, useParams } from "react-router";
import { useGetProduct } from "../../hooks/useGetProduct";
import { ProductData } from "../../hooks/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { PriceProvider } from "./context";
import { scrollFixed } from "../../lib/scroll-fixed";
import DigisellerChat from "../../widgets/seller-chat";
import { useClickOutside } from "../../hooks/useClickOutside";
import MobilePay from "./mobilePay";

export default function ProductPage() {
	const { id } = useParams();
	const data = useGetProduct(id);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [id]);

	if (data.product == null) return;
	const product = data.product as ProductData;

	return (
		<PriceProvider>
			<InnerProductPage product={product} />
		</PriceProvider>
	);
}

function InnerProductPage({ product }: { product: ProductData }) {
	const cnx = classNames.bind(styles);
	const refChat = useRef<HTMLDivElement>(null);
	const [chaIsOpen, setChaIsOpen] = useState(false);

	useClickOutside([refChat], () => setChaIsOpen(false));

	const [isHidden, setIsHidden] = useState(false);

	useEffect(() => {
		const computeScroll = () =>
			scrollFixed(
				() => setIsHidden(false),
				() => {
					if (isHidden !== true) setIsHidden(true);
				},
			);

		window.addEventListener("scroll", computeScroll);
	}, [isHidden]);

	const crumbs: Crumb[] = useMemo(() => {
		return [
			{ label: "Главная", href: "/" },
			{ label: "Каталог", href: "/catalog" },
			{
				label: product[0].name,
				href: `/catalog/${product[0].id_product}`,
				isActive: true,
			},
		];
	}, [product]);

	return (
		<div className={cnx("product")}>
			<Breadcrumbs crumbs={crumbs} />
			<div className={CONTAINER}>
				<div className={cnx("product__inner")}>
					<div className={cnx("product__main")}>
						<ProductHeader product={product} />
						<ProductPay product={product} />
						<ProductDescription product={product} />
						<ProductExtraInfo product={product} />
						<ProductRewies product={product} />
					</div>
					<aside className={cnx("product__aside", "aside")}>
						<img
							className={cnx("aside__img")}
							src={`https://graph.digiseller.ru/img.ashx?id_d=${product[0].id_product}&w=200&h=200&crop=true`}
							alt={product.name}
						/>
						<div className={cnx("aside__block", "seller")}>
							<span className={cnx("seller__caption")}>продавец</span>
							<div className={cnx("seller__top")}>
								<Link to={"/seller"}>
									<strong>{product[0].seller_name}</strong>
								</Link>
								<div className={cnx("seller__star")}>
									<img src="/iconsFolder/common/star.svg" alt="Оценка" />
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
							<Button
								className={cnx("seller__btn")}
								white
								onClick={() => setChaIsOpen(!chaIsOpen)}
							>
								Написать продавцу
							</Button>
							<div ref={refChat}>
								<DigisellerChat
									sellerId={product[0].seller_id}
									isOpen={chaIsOpen}
								/>
							</div>
						</div>
						{/* <div className={cnx("aside__block", "payment")}>
							<strong className={cnx("payment__title")}>Способы оплаты</strong>
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
						</div> */}
					</aside>
				</div>
				<OtherProducts />
			</div>

			{/* Mobile buy button */}
			<div className={cnx("product__buy", isHidden && "product__buy__hidden")}>
				<MobilePay product={product} />
			</div>
		</div>
	);
}
