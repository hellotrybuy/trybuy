import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Title from "../../../../components/title";
import { useProductList } from "../../../../hooks/useProductList";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { ProductData } from "../../../../hooks/types";
import PopularCards from "../../../../widgets/popular-cards";
import ProductsSceletonLeaders from "../../../../widgets/productsSceletonLeaders";

const cnx = classNames.bind(styles);

export function HomeLeaders() {
	const [currentPage, setCurrentPage] = useState(1);
	const loadMoreRef = useRef(null);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { products, loading } = useProductList(currentPage, 20);
	const [catalogData, setCatalogData] = useState<ProductData[]>([]);

	const totalPages = useMemo(() => {
		return products.totalPage;
	}, [products]);

	const changePage = useCallback(() => {
		if (totalPages >= currentPage) setCurrentPage((prevPage) => prevPage + 1);
	}, [totalPages, currentPage]);

	useEffect(() => {
		if (products && products.rows.length > 0) {
			setCatalogData((prev) => {
				const newProducts = products.rows.filter(
					(newProduct) =>
						!prev.some((existing) => existing.id === newProduct.id),
				);
				return [...prev, ...newProducts];
			});
		}
	}, [products]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !loading) {
					changePage();
				}
			},
			{ threshold: 0.1 },
		);

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}

		return () => {
			if (loadMoreRef.current) {
				observer.unobserve(loadMoreRef.current);
			}
		};
	}, [loading, loadMoreRef, changePage]);

	return (
		<section className={cnx("leaders")}>
			<div className={cnx("leaders__inner")}>
				<Title size="large">Лидеры продаж</Title>
				<PopularCards data={catalogData} />
				{totalPages != currentPage && (
					<div ref={loadMoreRef}>
						<ProductsSceletonLeaders isMargin={catalogData.length > 0} />
					</div>
				)}
			</div>
		</section>
	);
}
export default HomeLeaders;
