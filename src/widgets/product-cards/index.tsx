import ProductCard from "../../components/product-card";
import { ProductData } from "../../hooks/types";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

// Временный пропс для мока
interface IProductCards {
	data: ProductData[];
}

export function ProductCards({ data }: IProductCards) {
	if (data == null) return;
	return (
		<div className={cnx("cards")}>
			{data.map((product, i) => (
				<ProductCard key={i} product={product} />
			))}
		</div>
	);
}
export default ProductCards;
