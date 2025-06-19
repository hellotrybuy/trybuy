import ProductCard from "../../components/product-card";
import { Product } from "../../hooks/useProductList";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

// Временный пропс для мока
interface IProductCards {
	data: Product[];
}

export function ProductCards({ data }: IProductCards) {
	return (
		<div className={cnx("cards")}>
			{data.map((product, i) => (
				<ProductCard key={i} product={product} />
			))}
		</div>
	);
}
export default ProductCards;
