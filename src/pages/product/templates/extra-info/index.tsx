import { ProductData } from "../../../../hooks/types";
import DeliveryInfo from "../../utils/DeliveryInfo";
import ProductInfoCard from "../../widgets/info-card";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

interface Props {
	product: ProductData;
}

const cnx = classNames.bind(styles);

export function ProductExtraInfo({ product }: Props) {
	if (product[0].product_desc_add) {
		return (
			<ProductInfoCard
				title="Дополнительная информация"
				className={cnx("info")}
			>
				<DeliveryInfo rawHtml={product[0].product_desc_add} />
				<div className={cnx("bg-green")}></div>
			</ProductInfoCard>
		);
	} else return <></>;
}
export default ProductExtraInfo;
