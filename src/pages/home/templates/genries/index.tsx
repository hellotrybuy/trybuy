import styles from "./index.module.scss";
import classNames from "classnames/bind";
const cnx = classNames.bind(styles);

import { useRef, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";

import Title from "../../../../components/title";
import SwiperControl from "../../../../components/swiper-control";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import { useMainScreenCategories } from "../../../../hooks/useMainScreenCategories";
import ImagesBlock from "./imagesBlock";
import PsAnim from "./psBlock";
import { Link } from "react-router";

export function HomeGenries() {
	const prevBtnRef = useRef<HTMLButtonElement>(null);
	const nextBtnRef = useRef<HTMLButtonElement>(null);
	const [, setSwiper] = useState<SwiperType | null>(null);

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const { categories } = useMainScreenCategories();
	const { isMobile2, isBig } = useIsMobile();

	// Состояние: какие карточки уже загрузили все картинки
	const [imagesLoadedMap, setImagesLoadedMap] = useState<
		Record<string, boolean>
	>({});

	const imagesLoadedMapSafe = useMemo(() => {
		const map: Record<string, boolean> = { ...imagesLoadedMap }; // копируем текущее

		// Добавляем все id из текущих categories, которых ещё нет
		categories.forEach((cat) => {
			if (cat?.id) {
				const id = cat.id ?? `placeholder-${categories.indexOf(cat)}`;
				if (!(id in map)) {
					map[id] = false;
				}
			}
		});

		return map;
	}, [categories, imagesLoadedMap]);

	const handleImageReady = (id: string) => {
		setImagesLoadedMap((prev) => ({ ...prev, [id]: true }));
	};

	const getGradint = (first: string, second: string) =>
		`radial-gradient(97.07% 97.07% at 100% 98.78%, ${first} 0%, ${second} 98.46%)`;

	// Если данных нет — показываем 8 скелетонов
	const slidesToRender =
		categories.length > 0 ? categories : Array(6).fill(null);

	console.log(imagesLoadedMapSafe, "imagesLoadedMapSafe");
	return (
		<section className={cnx("genries")}>
			<div className={cnx("genries__inner")}>
				<div className={cnx("genries__top")}>
					<Title size="large" className={cnx("genries__title", "_desktop")}>
						Категории
					</Title>
					{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
					{/* @ts-ignore */}
					<SwiperControl prevBtn={prevBtnRef} nextBtn={nextBtnRef} />
				</div>

				<Title size="large" className={cnx("genries__title", "_mobile")}>
					Категории
				</Title>

				<div className={cnx("genries__swiper")}>
					<Swiper
						modules={[Navigation, FreeMode]}
						spaceBetween={isMobile2 ? 100 : 20}
						slidesPerView={isBig ? 5 : 4}
						slidesPerGroup={1}
						navigation={{
							prevEl: prevBtnRef.current,
							nextEl: nextBtnRef.current,
						}}
						grabCursor
						onInit={(swiper) => setSwiper(swiper)}
						className={cnx("slider")}
					>
						{slidesToRender.map((genre: any, index) => {
							const categoryId = genre?.id ?? `placeholder-${index}`;
							const isSkeleton = !genre?.collections_url;
							const isLoaded = imagesLoadedMap[categoryId]; // true или undefined

							// Показываем скелетон только если это skeleton и ещё не загружено
							const showSkeleton =
								isSkeleton || (genre?.screenshots && !isLoaded);

							return (
								<SwiperSlide key={index} className={cnx("slide")}>
									{showSkeleton ? (
										<div className={cnx("genre", "genre--skeleton")}>
											<div className={cnx("genre-skeleton")} />
											{genre?.screenshots && (
												<ImagesBlock
													images={genre.screenshots}
													isHovered={false}
													index={index}
													onReady={() => handleImageReady(categoryId)}
													hidden
												/>
											)}
										</div>
									) : (
										<Link
											to={genre.collections_url}
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
											<p className={cnx("genre__title")}>
												{genre.collections_name}
											</p>

											{index === 1 ? (
												<PsAnim isHovered={hoveredIndex === index} />
											) : (
												<ImagesBlock
													images={genre.screenshots ?? []}
													isHovered={hoveredIndex === index}
													index={index}
												/>
											)}
										</Link>
									)}
								</SwiperSlide>
							);
						})}

						{/* Мобильная "пустая" карточка для выравнивания */}
						{isMobile2 && <SwiperSlide></SwiperSlide>}
					</Swiper>
				</div>
			</div>
		</section>
	);
}

export default HomeGenries;
