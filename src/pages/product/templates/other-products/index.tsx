import { useEffect, useMemo, useState } from "react";
import Title from "../../../../components/title";
import { useProductList } from "../../../../hooks/useProductList";
import ProductCards from "../../../../widgets/product-cards";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

export function OtherProducts() {
	const { products } = useProductList(1, 15);

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const cardsAmount = useMemo(() => {
		if (windowWidth >= 1190) return 10;
		if (windowWidth >= 990 && windowWidth <= 1190) return 8;
		if (windowWidth >= 857 && windowWidth <= 990) return 10;
		if (windowWidth >= 522 && windowWidth <= 689) return 6;

		return 4;
	}, [windowWidth]);

	const visibleProducts = useMemo(() => {
		return products.rows.slice(0, cardsAmount);
	}, [products, cardsAmount]);

	return (
		<div className={cnx("other")}>
			<Title className={cnx("other__title")}>Вам может понравиться</Title>
			<ProductCards data={visibleProducts} />
		</div>
	);
}

export default OtherProducts;
