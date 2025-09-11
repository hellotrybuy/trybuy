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
	const pageSize = useMemo(() => {
		const width = window.innerWidth;

		if (width >= 1600) {
			return 24;
		} else if (width >= 523 && width <= 689) {
			return 21;
		} else {
			return 20;
		}
	}, []);

	const pageSizeSceleton = useMemo(() => {
		const width = window.innerWidth;

		if (width >= 1600) {
			return 6;
		} else if (width >= 523 && width <= 689) {
			return 3;
		} else {
			return 5;
		}
	}, []);

	const [currentPage, setCurrentPage] = useState(1);
	const loadMoreRef = useRef<HTMLDivElement | null>(null);
	const { products, loading, hasMore } = useRecommList(currentPage, pageSize);
	const [catalogData, setCatalogData] = useState<ProductData[]>([]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const changePage = useCallback(() => {
		if (hasMore) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	}, [hasMore]);

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
			{ threshold: 0.3 },
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
						<ProductsSceletonLeaders
							isMargin={catalogData.length > 0}
							count={pageSizeSceleton}
						/>
					</div>
				)}
			</div>
		</section>
	);
}

export default HomeLeaders;
