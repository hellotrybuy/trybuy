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
			{/* <div className={cnx("description__bottom", "bottom")}>
				<div className={cnx("bottom__block")}>
					<strong className={cnx("bottom__block-title")}>ИЗДАТЕЛЬ</strong>
					<b className={cnx("bottom__block-value")}>Torture Star Video</b>
				</div>
				<div className={cnx("bottom__block")}>
					<strong className={cnx("bottom__block-title")}>Разработчик</strong>
					<b className={cnx("bottom__block-value")}>
						Night Signal Entertainment
					</b>
				</div>
				<div className={cnx("bottom__block")}>
					<strong className={cnx("bottom__block-title")}>Дата выпуска</strong>
					<b className={cnx("bottom__block-value")}>20.09.2024</b>
				</div>
			</div> */}
		</ProductInfoCard>
	);
}
export default ProductDescription;
