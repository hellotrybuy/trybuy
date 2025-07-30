import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Title from "../../../../components/title";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { ProductData } from "../../../../hooks/types";
import PopularCards from "../../../../widgets/popular-cards";
import ProductsSceletonLeaders from "../../../../widgets/productsSceletonLeaders";
import { useRecommList } from "../../../../hooks/useRecommList";

const cnx = classNames.bind(styles);

export function HomeLeaders() {
	const [currentPage, setCurrentPage] = useState(1);
	const loadMoreRef = useRef(null);
	const { products, loading, hasMore } = useRecommList(currentPage, 20);
	const [catalogData, setCatalogData] = useState<ProductData[]>([]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const totalPages = useMemo(() => {
		return 10;
	}, []);

	const changePage = useCallback(() => {
		if (currentPage < totalPages) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	}, [currentPage, totalPages]);

	useEffect(() => {
		if (products && products.length > 0) {
			setCatalogData((prev) => {
				const existingIds = new Set(prev.map((p) => p.id));
				const newProducts = products.filter(
					(product) => !existingIds.has(product.id),
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
	}, [loading, changePage]);

	return (
		<section className={cnx("leaders")}>
			<div className={cnx("leaders__inner")}>
				<Title size="large">Лидеры продаж</Title>
				<PopularCards data={catalogData} />
				{hasMore && (
					<div ref={loadMoreRef}>
						<ProductsSceletonLeaders isMargin={catalogData.length > 0} />
					</div>
				)}
			</div>
		</section>
	);
}

export default HomeLeaders;
