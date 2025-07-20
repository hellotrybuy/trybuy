import { useEffect, useState } from "react";
import Button from "../../../../components/button";
import Title from "../../../../components/title";
import { useProductList } from "../../../../hooks/useProductList";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { ProductData } from "../../../../hooks/types";
import PopularCards from "../../../../widgets/popular-cards";

const cnx = classNames.bind(styles);

export function HomeLeaders() {
	const [currentPage, setCurrentPage] = useState(1);

	const { products } = useProductList(currentPage, 20);
	const [catalogData, setCatalogData] = useState<ProductData[]>([]);

	const changePage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

	useEffect(() => {
		if (products && products.length > 0) {
			setCatalogData((prev) => {
				const newProducts = products.filter(
					(newProduct) =>
						!prev.some((existing) => existing.id === newProduct.id),
				);
				return [...prev, ...newProducts];
			});
		}
	}, [products]);

	return (
		<section className={cnx("leaders")}>
			<div className={cnx("leaders__inner")}>
				<Title size="large">Лидеры продаж</Title>
				<PopularCards data={catalogData} />
				<Button
					size="large"
					className={cnx("leaders__btn")}
					white
					onClick={changePage}
				>
					Загрузить ещё
				</Button>
			</div>
		</section>
	);
}
export default HomeLeaders;
