import styles from "./index.module.scss";
import classNames from "classnames/bind";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import "swiper/css";
import { Autoplay, Navigation, Controller, FreeMode } from "swiper/modules";
import { Slide } from "./mainSlide";
import { SLIDES } from "./data";

const cnx = classNames.bind(styles);

export function HomeMain() {
	// Desktop Swipers
	const [desktopSwiperTop, setDesktopSwiperTop] = useState<SwiperType | null>(
		null,
	);
	const [desktopSwiperBottom, setDesktopSwiperBottom] =
		useState<SwiperType | null>(null);

	// Mobile Swipers
	const [mobileSwiperTop, setMobileSwiperTop] = useState<SwiperType | null>(
		null,
	);
	const [mobileSwiperBottom, setMobileSwiperBottom] =
		useState<SwiperType | null>(null);

	const prevBtnRef = useRef(null);
	const nextBtnRef = useRef(null);

	// Desktop sync
	useEffect(() => {
		if (desktopSwiperTop && desktopSwiperBottom) {
			desktopSwiperTop.controller.control = desktopSwiperBottom;
			desktopSwiperBottom.controller.control = desktopSwiperTop;
		}
	}, [desktopSwiperTop, desktopSwiperBottom]);

	// Mobile sync
	useEffect(() => {
		if (mobileSwiperTop && mobileSwiperBottom) {
			mobileSwiperTop.controller.control = mobileSwiperBottom;
			mobileSwiperBottom.controller.control = mobileSwiperTop;
		}
	}, [mobileSwiperTop, mobileSwiperBottom]);

	const swiperProps = {
		modules: [Controller, Navigation, Autoplay, FreeMode],
		loop: true,
		grabCursor: true,
		allowTouchMove: true,
		speed: 5000,
		slidesPerView: "auto" as const,
		watchSlidesProgress: true,
		slideToClickedSlide: true,
		navigation: true,
		freeMode: true,
		autoplay: {
			delay: 5,
			disableOnInteraction: false,
		},
	};

	return (
		<div>
			{/* Desktop version */}
			<div className={cnx("desktop")}>
				<div className={cnx("desktop__text")}>
					<h2 className={cnx("desktop__title")}>В тренде</h2>
					<h3 className={cnx("desktop__subtitle")}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					</h3>
				</div>

				<div className={cnx("desktop__bg")}>
					<div></div>
					<div></div>
				</div>

				<div className={cnx("swiper-container", "_top")}>
					<Swiper
						className={cnx("swiper")}
						{...swiperProps}
						spaceBetween={15}
						navigation={{
							prevEl: prevBtnRef.current,
							nextEl: nextBtnRef.current,
						}}
						onSwiper={setDesktopSwiperTop}
					>
						{SLIDES.map((slide, index) => (
							<SwiperSlide key={index} className={cnx("slide")}>
								<Slide {...slide} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				<div className={cnx("swiper-container", "_bottom")}>
					<Swiper
						className={cnx("swiper")}
						{...swiperProps}
						spaceBetween={15}
						navigation={{
							prevEl: prevBtnRef.current,
							nextEl: nextBtnRef.current,
						}}
						onSwiper={setDesktopSwiperBottom}
					>
						{SLIDES.map((slide, index) => (
							<SwiperSlide key={index} className={cnx("slide")}>
								<Slide {...slide} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>

			{/* Mobile version */}
			<div className={cnx("mobile")}>
				<h1 className={cnx("mobile__title")}>В тренде</h1>
				<div className={cnx("mobile__swipers")}>
					<div className={cnx("mobile__swiper", "_top")}>
						<Swiper
							className={cnx("swiper")}
							{...swiperProps}
							spaceBetween={8}
							autoplay={{ delay: 3500 }}
							onSwiper={setMobileSwiperTop}
						>
							{SLIDES.map((slide, index) => (
								<SwiperSlide key={index} className={cnx("slide")}>
									<Slide {...slide} />
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<div className={cnx("mobile__swiper", "_bottom")}>
						<Swiper
							className={cnx("swiper")}
							{...swiperProps}
							spaceBetween={8}
							autoplay={{ delay: 3500 }}
							onSwiper={setMobileSwiperBottom}
						>
							{SLIDES.map((slide, index) => (
								<SwiperSlide key={index} className={cnx("slide")}>
									<Slide {...slide} />
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomeMain;
