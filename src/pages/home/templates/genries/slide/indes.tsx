import { Link } from "react-router";
import { MainScreenCategory } from "../../../../../hooks/useMainScreenCategories";
import PsAnim from "../psBlock";
import ImagesBlock from "../imagesBlock";

import styles from "../index.module.scss";
import classNames from "classnames/bind";
const cnx = classNames.bind(styles);

type SlideGProps = {
	genre: string | MainScreenCategory;
	setHoveredIndex: (value: React.SetStateAction<number>) => void;
	index: number;
	hoveredIndex: number;
	getGradint: (first: string, second: string) => string;
};

export function GenrSlide({
	genre,
	setHoveredIndex,
	index,
	hoveredIndex,
	getGradint,
}: SlideGProps) {
	// ⛔️ Если жанр — строка → показываем скелетон
	if (typeof genre === "string") {
		return <div className={cnx("genre-skeleton")} />;
	}

	// ✔️ Дальше genre гарантированно объект
	return (
		<Link
			to={genre.collections_url}
			key={genre.id}
			onMouseEnter={() => setHoveredIndex(index)}
			onMouseLeave={() => setHoveredIndex(null)}
			className={cnx("genre")}
			style={{
				background: getGradint(
					genre.collections_color_1,
					genre.collections_color_2,
				),
			}}
		>
			<p className={cnx("genre__title")}>{genre.collections_name}</p>

			{index === 3 ? (
				<PsAnim isHovered={hoveredIndex === index} />
			) : (
				<ImagesBlock
					images={genre.screenshots}
					isHovered={hoveredIndex === index}
					index={index}
				/>
			)}
		</Link>
	);
}
