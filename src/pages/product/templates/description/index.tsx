import { ProductData } from "../../../../hooks/types";
import DeliveryInfo from "../../utils/DeliveryInfo";
import ProductInfoCard from "../../widgets/info-card";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

interface Props {
	product: ProductData;
}

export function ProductDescription({ product }: Props) {
	return (
		<ProductInfoCard title="Описание товара" className={cnx("description")}>
			<p className={cnx("description__info")}>
				<DeliveryInfo rawHtml={product[0].product_desc} />
			</p>
		</ProductInfoCard>
	);
}
export default ProductDescription;
