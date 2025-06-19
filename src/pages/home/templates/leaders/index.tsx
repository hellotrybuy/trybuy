import Button from "../../../../components/button";
import Title from "../../../../components/title";
import { useProductList } from "../../../../hooks/useProductList";
import ProductCards from "../../../../widgets/product-cards";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

export function HomeLeaders() {
	const data = useProductList({});

	return (
		<section className={cnx("leaders")}>
			<div className={cnx("leaders__inner")}>
				<Title size="large">Лидеры продаж</Title>
				<ProductCards data={data.products} />
				<Button size="large" className={cnx("leaders__btn")} white>
					Загрузить ещё
				</Button>
			</div>
		</section>
	);
}
export default HomeLeaders;
