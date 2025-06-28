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

	const { isMobile2 } = useIsMobile();

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
						loop
						navigation={{
							prevEl: prevBtnRef.current,
							nextEl: nextBtnRef.current,
						}}
						grabCursor
						onInit={(swiper) => setSwiper(swiper)}
						className={cnx("slider")}
					>
						{[...MOCK_GENRES, ...MOCK_GENRES].map((genre, index) => (
							<SwiperSlide key={index} className={cnx("slide")}>
								<div className={cnx("genre")} style={{ background: genre.bg }}>
									<p className={cnx("genre__title")}>{genre.title}</p>
									<img
										src={genre.img}
										alt=""
										className={cnx(genre.classNames)}
										style={genre.style}
									/>
								</div>
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
