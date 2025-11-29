import { useEffect, useMemo, useRef } from "react";
import { GreatCatergory } from "../../../hooks/types";
import styles from "../index.module.scss";
import classNames from "classnames/bind";
const cnx = classNames.bind(styles);

type TopCategoriesProps = {
	categorys: [] | GreatCatergory[];
	categoryId: string;
	changeCategory: (id: string) => void;
	changeCategorySecondPlace: (id: string) => void;
	categoryRefs: React.RefObject<Record<string, HTMLLIElement>>;
	secondCategoryFromUrl: string;
};

export function TopCategories({
	categorys,
	categoryId,
	changeCategory,
	changeCategorySecondPlace,
	categoryRefs,
	secondCategoryFromUrl,
}: TopCategoriesProps) {
	const isPs = useMemo(() => {
		if (
			secondCategoryFromUrl == "765" ||
			secondCategoryFromUrl == "730" ||
			secondCategoryFromUrl == "669" ||
			secondCategoryFromUrl == "426"
		) {
			return true;
		}
		return false;
	}, [secondCategoryFromUrl]);

	const categoryRefsPs = useRef<Record<string, HTMLLIElement | null>>({});

	useEffect(() => {
		if (isPs) {
			const el = categoryRefsPs.current[secondCategoryFromUrl ?? ""];
			if (el) {
				console.log(99898);
				el.scrollIntoView({
					behavior: "smooth",
					inline: "center",
					block: "nearest",
				});
			}
		}
	}, [categoryId, isPs, secondCategoryFromUrl]);

	if (isPs) {
		return (
			<ul>
				<li
					ref={(node) => {
						categoryRefsPs.current["730"] = node;
					}}
					className={cnx(secondCategoryFromUrl == "730" && "_active")}
					onClick={() => changeCategorySecondPlace("730")}
				>
					<div>Пополнение баланса</div>
				</li>
				<li
					ref={(node) => {
						categoryRefsPs.current["765"] = node;
					}}
					className={cnx(secondCategoryFromUrl == "765" && "_active")}
					onClick={() => changeCategorySecondPlace("765")}
				>
					<div>Подписка PS Plus</div>
				</li>
				<li
					ref={(node) => {
						categoryRefsPs.current["669"] = node;
					}}
					className={cnx(secondCategoryFromUrl == "669" && "_active")}
					onClick={() => changeCategorySecondPlace("669")}
				>
					<div>Аккаунты Playstation</div>
				</li>
			</ul>
		);
	}

	if (categorys) {
		return (
			<ul>
				<li
					className={cnx(categoryId == "" && "_active")}
					onClick={() => changeCategory("")}
					ref={(node) => {
						categoryRefs.current[""] = node;
					}}
				>
					<div>Все товары</div>
				</li>
				{categorys.map((el) => (
					<li
						ref={(node) => {
							categoryRefs.current[el.id] = node;
						}}
						className={cnx(categoryId == el.id && "_active")}
						key={el.id}
						onClick={() => changeCategory(el.id)}
					>
						<div>{el.name}</div>
					</li>
				))}
			</ul>
		);
	}

	return <div className={cnx("categories_sceleton")}></div>;
}
