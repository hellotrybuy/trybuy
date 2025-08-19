import styles from "./index.module.scss";
import classNames from "classnames/bind";

import { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import "swiper/css";
import { Autoplay, Navigation, Controller, FreeMode } from "swiper/modules";
import { Slide } from "./mainSlide";
import {
	BlockData,
	NestedBlock,
	useGetMainSlider,
} from "../../../../hooks/useGetMainSlider";

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

	const { data, loading } = useGetMainSlider();

	const infoData = useMemo(() => {
		if (data.length > 0) {
			return (data as BlockData[])[0];
		} else return "";
	}, [data]);

	const sliderData = useMemo((): NestedBlock[][] => {
		if (data.length > 0 && !loading) {
			try {
				const newData = data as BlockData[];
				const parsed = JSON.parse(newData[0].nested_blocks) as NestedBlock[];
				const filtered = parsed.filter((block) => block.image);

				const mid = Math.ceil(filtered.length / 2);
				const firstHalf = filtered.slice(0, mid);
				const secondHalf = filtered.slice(mid);

				const repeatedFirst = Array(5).fill(firstHalf).flat();
				const repeatedSecond = Array(5).fill(secondHalf).flat();

				return [repeatedFirst, repeatedSecond];
			} catch (e) {
				console.error("Ошибка при парсинге nested_blocks:", e);
				return [[], []];
			}
		}
		return [[], []];
	}, [data, loading]);

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
			{sliderData.length > 0 &&
			sliderData[0].length > 0 &&
			sliderData[1].length > 0 ? (
				<div className={cnx("desktop")}>
					<div className={cnx("desktop__text")}>
						<h2 className={cnx("desktop__title")}>
							{infoData != "" && infoData.title}
						</h2>
						<h3 className={cnx("desktop__subtitle")}>
							{infoData != "" && infoData.title_2}
						</h3>
					</div>

					<div className={cnx("desktop__bg")}>
						<div></div>
						<div></div>
					</div>

					<div className={cnx("swiper-container", "_top")}>
						{sliderData.length > 0 && (
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
								{sliderData[0].map((el: NestedBlock, index) => (
									<SwiperSlide key={index} className={cnx("slide")}>
										<Slide el={el} />
									</SwiperSlide>
								))}
							</Swiper>
						)}
					</div>

					<div className={cnx("swiper-container", "_bottom")}>
						{sliderData.length > 0 && (
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
								{sliderData.length > 0 &&
									sliderData[1].map((el: NestedBlock, index) => (
										<SwiperSlide key={index} className={cnx("slide")}>
											<Slide el={el} />
										</SwiperSlide>
									))}
							</Swiper>
						)}
					</div>
				</div>
			) : (
				<div className={cnx("skeletonPc")}></div>
			)}

			{sliderData.length > 0 &&
			sliderData[0].length > 0 &&
			sliderData[1].length > 0 ? (
				<div className={cnx("mobile")}>
					<h1 className={cnx("mobile__title")}>
						{infoData != "" && infoData.title}
					</h1>
					<div className={cnx("mobile__swipers")}>
						<div className={cnx("mobile__swiper", "_top")}>
							<Swiper
								className={cnx("swiper")}
								{...swiperProps}
								spaceBetween={8}
								autoplay={{ delay: 3500 }}
								onSwiper={setMobileSwiperTop}
							>
								{sliderData[0].map((el: NestedBlock, index) => (
									<SwiperSlide key={index} className={cnx("slide")}>
										<Slide el={el} />
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
								{sliderData[1].map((el: NestedBlock, index) => (
									<SwiperSlide key={index} className={cnx("slide")}>
										<Slide el={el} />
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>
				</div>
			) : (
				<div className={cnx("skeletonMob")}></div>
			)}
		</div>
	);
}

export default HomeMain;
