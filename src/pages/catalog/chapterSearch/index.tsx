import { useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.scss";
import { FilterSelect } from "../../../components/filterSelect";
import { MOCK_DATA_SEARCH_RESULTS } from "./data";
import { useClickOutside } from "../../../hooks/useClickOutside";

const cnx = classNames.bind(styles);

export function ChapterSearch() {
	const [searchValue, setSearchValue] = useState("");
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const ref = useRef<HTMLDivElement>(null);

	useClickOutside(ref, () => setIsSearchOpen(false));

	return (
		<div className={cnx("search")}>
			<nav
				className={cnx("header__actions", "actions")}
				ref={ref}
				key="ChapterSearch"
			>
				<div className={cnx("actions__search")}>
					<input
						onClick={() => setIsSearchOpen(true)}
						className={cnx("actions__search-input")}
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						type="text"
						placeholder="Поиск по разделу"
					/>
					<img
						className={cnx("actions__search-icon")}
						src="iconsFolder/navigation/search.svg"
						alt="Поиск"
					/>
				</div>
				{searchValue && isSearchOpen && (
					<div className={cnx("actions__search-dropdown", "dropdown")}>
						<ul>
							{MOCK_DATA_SEARCH_RESULTS.map((el, index) => (
								<li key={index} className={cnx("item")}>
									<div className={cnx("item__name")}>{el.name}</div>
									<div className={cnx("item__type")}>{el.type}</div>
								</li>
							))}
						</ul>
					</div>
				)}
			</nav>
			<div className={cnx("filters")}>
				<FilterSelect />
			</div>
		</div>
	);
}
