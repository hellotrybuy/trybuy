import styles from "./index.module.scss";
import classNames from "classnames/bind";
const cnx = classNames.bind(styles);

import { useRef, useState } from "react";
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
import { Routes } from "../../../../routes";

const MOCK_GENRES = [
	{
		title: "Игровые товары",
		bg: "radial-gradient(97.07% 97.07% at 100% 98.78%, #28344A 0%, #222630 98.46%)",
		img: "mock/genries/games.svg",
		style: { width: 187, height: 87 },
		classNames: "",
	},
	{
		title: "Программное обеспечение",
		bg: "radial-gradient(97.07% 97.07% at 100% 98.78%, #284A48 0%, #222630 98.46%)",
		img: "mock/genries/po.svg",
		style: { width: 187, height: 87 },
		classNames: "",
	},
	{
		title: "Сервисы",
		bg: "radial-gradient(97.07% 97.07% at 100% 98.78%, #403667 0%, #222630 98.46%)",
		img: "mock/genries/services.svg",
		style: { width: 187, height: 87 },
		classNames: "",
	},
	{
		title: "Playstation",
		bg: "radial-gradient(97.07% 97.07% at 100% 98.78%, #131F7D 0%, #222630 98.46%)",
		img: "mock/genries/playstation.svg",
		style: { width: 154, height: 137 },
		classNames: cnx("genre__xbox"),
	},
	{
		title: "Внутриигровые ценности",
		bg: "radial-gradient(97.07% 97.07% at 100% 98.78%, #414023 0%, #222630 98.46%)",
		img: "mock/genries/ingame.svg",
		style: { width: 187, height: 87 },
		classNames: "",
	},
	{
		title: "XBOX",
		bg: "radial-gradient(97.07% 97.07% at 100% 98.78%, #0A3A0F 0%, #222630 98.46%)",
		img: "mock/genries/xbox.svg",
		style: { width: 113, height: 111 },
		classNames: cnx("genre__xbox"),
	},
];

export function HomeGenries() {
	const prevBtnRef = useRef(null);
	const nextBtnRef = useRef(null);
	const [, setSwiper] = useState<SwiperType>();
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const { categories } = useMainScreenCategories();
	console.log(categories, "categories");

	const { isMobile2 } = useIsMobile();

	const getGradint = (first: string, second: string) => {
		return `radial-gradient(97.07% 97.07% at 100% 98.78%, ${first} 0%, ${second} 98.46%)`;
	};

	return (
		<section className={cnx("genries")}>
			<div className={cnx("genries__inner")}>
				<div className={cnx("genries__top")}>
					<Title size="large" className={cnx("genries__title", "_desktop")}>
						Категории
					</Title>
					<SwiperControl prevBtn={prevBtnRef} nextBtn={nextBtnRef} />
				</div>

				<div className={cnx("genries__title", "_mobile")}>Категории</div>

				<div className={cnx("genries__swiper")}>
					<Swiper
						modules={[Navigation, FreeMode]}
						spaceBetween={isMobile2 ? 100 : 20}
						slidesPerView={4}
						slidesPerGroup={1}
						navigation={{
							prevEl: prevBtnRef.current,
							nextEl: nextBtnRef.current,
						}}
						grabCursor
						onInit={(swiper) => setSwiper(swiper)}
						className={cnx("slider")}
					>
						{[...categories].map((genre, index) => (
							<SwiperSlide key={index} className={cnx("slide")}>
								<Link
									to={Routes.CATALOG}
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
									<p className={cnx("genre__title")}>
										{genre.collections_name}
									</p>
									{index == 3 ? (
										<PsAnim isHovered={hoveredIndex === index} />
									) : (
										<ImagesBlock
											images={genre.screenshots}
											isHovered={hoveredIndex === index}
											index={index}
										/>
									)}

									{/* <img
										src={`https://test.try-buy.ru/${genre.screenshots[0]}`}
										alt=""
										// className={cnx(genre.classNames)}
										// style={genre.style}
									/> */}
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				{/* <div className={cnx("genries__grid")}>
					{[...MOCK_GENRES].map((genre, index) => (
						<div
							key={index}
							className={cnx("genre")}
							style={{ background: genre.bg }}
						>
							<b className={cnx("genre__title")}>{genre.title}</b>
							<img
								src={genre.img}
								alt=""
								className={cnx(genre.className)}
								style={genre.style}
							/>
						</div>
					))}
				</div> */}
			</div>
		</section>
	);
}

export default HomeGenries;
