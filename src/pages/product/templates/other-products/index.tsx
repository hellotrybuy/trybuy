import Title from "../../../../components/title";
import { useProductList } from "../../../../hooks/useProductList";
import ProductCards from "../../../../widgets/product-cards";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

export function OtherProducts() {
	const data = useProductList({});
	return (
		<div className={cnx("other")}>
			<Title className={cnx("other__title")}>Вам может понравиться</Title>
			<ProductCards data={data.products} />
		</div>
	);
}
export default OtherProducts;
