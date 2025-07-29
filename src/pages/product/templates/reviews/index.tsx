import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../../../../components/button";
import Title from "../../../../components/title";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { useGetRewies } from "../../../../hooks/useGetRewies";
import { ProductData, RewiesData } from "../../../../hooks/types";

const cnx = classNames.bind(styles);

interface Props {
	product: ProductData;
}

export function ProductRewies({ product }: Props) {
	const [IsFilterDown, setIsFilterDown] = useState(true);
	const [page, setPage] = useState(1);
	const [allRewies, setAllRewies] = useState<RewiesData[]>([]);
	const [sortType, setSortType] = useState<string>("good");

	const changeFilter = useCallback((typeF: boolean) => {
		setPage(1);
		setIsFilterDown(typeF);
		const type = typeF ? "good" : "bad";
		setSortType(type);
	}, []);

	const { rewies } = useGetRewies({
		id: product[0].id.toString(),
		page: page,
		type: sortType,
	});

	useEffect(() => {
		if (!rewies) return;

		setAllRewies((prev) => {
			if (page === 1) {
				return rewies;
			}

			const existingIds = new Set(prev.map((r) => r.review_date));
			const newRewies = rewies.filter((r) => !existingIds.has(r.review_date));

			return [...prev, ...newRewies];
		});
	}, [rewies, page, sortType]);

	const changePage = useCallback(() => {
		setPage((prevPage) => prevPage + 1);
	}, [setPage]);

	const reviewsCount = useMemo(() => {
		const bad = Number(product[0].bad_reviews);
		const good = Number(product[0].good_reviews);

		return (bad + good).toString();
	}, [product]);

	return (
		<div className={cnx("reviews")}>
			<div className={cnx("reviews__top")}>
				<Title>Отзывы {reviewsCount}</Title>
				<div className={cnx("reviews__star")}>
					<img src="/iconsFolder/common/star.svg" alt="Оценка" />
					<span>5,0</span>
				</div>
				<button
					onClick={() => changeFilter(!IsFilterDown)}
					className={cnx("reviews__filter", IsFilterDown && "_down")}
				>
					<svg
						width="12"
						height="7"
						viewBox="0 0 12 7"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0.75 6L6 0.75L11.25 6"
							stroke="white"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<span>
						{sortType == "good"
							? "сначала положительные"
							: "сначала отрицательные"}
					</span>
				</button>
			</div>
			<div className={cnx("reviews__body")}>
				{allRewies &&
					allRewies.map((rew) => (
						<div className={cnx("reviews__review", "review")}>
							<img src="/iconsFolder/common/like.svg" alt="Лайк" />
							<div className={cnx("review__info")}>
								<time
									className={cnx("review__time")}
									dateTime="2001-05-15 19:00"
								>
									{rew.review_date}
								</time>
								<p className={cnx("review__comment")}>{rew.review_info}</p>
							</div>
						</div>
					))}
			</div>
			<Button className={cnx("reviews__btn")} white onClick={changePage}>
				Загрузить ещё
			</Button>
		</div>
	);
}
export default ProductRewies;
