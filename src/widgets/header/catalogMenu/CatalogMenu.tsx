import classNames from "classnames/bind";
import styles from "./index.module.scss";
import { useWindowSize } from "../../../hooks/useWindiwSize";
import Button from "../../../components/button";
import { catalogData } from "./data";
import { Link } from "react-router";

const cnx = classNames.bind(styles);

interface CatalogMenuProps {
	isCatalogOpen: boolean;
	setIsCatalogOpen: (value: boolean) => void;
}

export function CatalogMenu({
	isCatalogOpen,
	setIsCatalogOpen,
}: CatalogMenuProps) {
	const [width] = useWindowSize();

	return (
		<div
			onMouseEnter={() => setIsCatalogOpen(true)}
			onMouseLeave={() => setIsCatalogOpen(false)}
			className={cnx("catalog", isCatalogOpen && "_active")}
		>
			<div className={cnx("catalog__inner")}>
				<div className={cnx("catalog__categories", "categories")}>
					{catalogData.map((category) => (
						<div key={category.title} className={cnx("categories__column")}>
							<h2 className={cnx("categories__title")}>{category.title}</h2>
							<ul className={cnx("categories__list")}>
								{category.items.map((item) => (
									<li key={item.name}>
										<a href={item.href}>{item.name}</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<Link to={"catalog"}>
					<Button className={cnx("catalog__btn")}>{"Весь каталог"}</Button>
				</Link>
			</div>
		</div>
	);
}

export default CatalogMenu;
