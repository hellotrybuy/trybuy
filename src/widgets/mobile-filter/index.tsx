import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { useCallback, useEffect, useRef, useState } from "react";

import { Filers } from "../../components/filters";
import { throttle } from "lodash";
import { lockBody } from "../../lib/lock-body";
import { unlockBody } from "../../lib/unlock-body";

const cnx = classNames.bind(styles);
const TRANSITION_DISABLE_TIMEOUT = 300;

interface IFilterMobile {
	className?: string;
}

function moveFilter({
	xStart,
	touchStartX,
	e,
	btnEl,
	filterEl,
	setLastPosition,
	isOpen,
}: {
	xStart: number;
	touchStartX: number;
	e: TouchEvent;
	btnEl: HTMLButtonElement;
	filterEl: HTMLDivElement;
	setLastPosition: (x: number, time: number) => void;
	isOpen: boolean;
}) {
	const currentX = e.targetTouches[0].clientX;
	let translateX = currentX - xStart;
	translateX = Math.min(0, translateX);
	translateX = Math.max(-filterEl.offsetWidth, translateX);

	const swipeDistance = Math.abs(currentX - touchStartX);
	const screenWidth = window.innerWidth;

	if (!(isOpen && swipeDistance < screenWidth * 0.25)) {
		btnEl.style.transform = `translateX(${translateX}px)`;
		const percent = (translateX / filterEl.offsetWidth) * 100;
		filterEl.style.transform = `translateX(${percent}%)`;
	}

	setLastPosition(translateX, e.timeStamp);
}

function finishFilterMovement({
	btnEl,
	filterEl,
	lastPosition,
	prevPosition,
	setCurrentTranslateX,
	setIsOpen,
}: {
	e: TouchEvent;
	btnEl: HTMLButtonElement;
	filterEl: HTMLDivElement;
	lastPosition: { x: number; time: number } | null;
	prevPosition: { x: number; time: number } | null;
	setCurrentTranslateX: (x: number) => void;
	setIsOpen: (open: boolean) => void;
}) {
	let velocity = 0;
	if (lastPosition && prevPosition) {
		const dx = lastPosition.x - prevPosition.x;
		const dt = lastPosition.time - prevPosition.time;
		if (dt > 0) {
			velocity = dx / dt;
		}
	}

	const shouldClose = velocity > 0;

	if (shouldClose) {
		btnEl.style.transition = "transform 0.3s ease-out";
		filterEl.style.transition = "transform 0.3s ease-out";
		btnEl.style.transform = "translateX(0)";
		filterEl.style.transform = "translateX(0)";
		setCurrentTranslateX(0);
		setIsOpen(false);
		unlockBody();
	} else {
		btnEl.style.transition = "transform 0.3s ease-out";
		filterEl.style.transition = "transform 0.3s ease-out";
		btnEl.style.transform = `translateX(${-filterEl.offsetWidth}px)`;
		filterEl.style.transform = `translateX(-100%)`;
		setCurrentTranslateX(-filterEl.offsetWidth);
		setIsOpen(true);
		lockBody();
	}

	setTimeout(() => {
		btnEl.style.transition = "";
		filterEl.style.transition = "";
	}, TRANSITION_DISABLE_TIMEOUT);
}

export function FilterMobile({ className }: IFilterMobile) {
	const btnRef = useRef<HTMLButtonElement>(null);
	const filterRef = useRef<HTMLDivElement>(null);
	const [xStart, setXStart] = useState(0);
	const [yStart, setYStart] = useState(0);
	const [touchStartX, setTouchStartX] = useState(0);
	const [lastPosition, setLastPosition] = useState<{
		x: number;
		time: number;
	} | null>(null);
	const [prevPosition, setPrevPosition] = useState<{
		x: number;
		time: number;
	} | null>(null);
	const [currentTranslateX, setCurrentTranslateX] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [isSwipeHandled, setIsSwipeHandled] = useState(false);
	const [swipeDirection, setSwipeDirection] = useState<
		"horizontal" | "vertical" | null
	>(null);

	const closeFilter = () => {
		if (btnRef.current && filterRef.current) {
			btnRef.current.style.transition = "transform 0.3s ease-out";
			filterRef.current.style.transition = "transform 0.3s ease-out";
			btnRef.current.style.transform = "translateX(0)";
			filterRef.current.style.transform = "translateX(0)";
			setTimeout(() => {
				if (btnRef.current && filterRef.current) {
					btnRef.current.style.transition = "";
					filterRef.current.style.transition = "";
				}
			}, TRANSITION_DISABLE_TIMEOUT);
		}
		setCurrentTranslateX(0);
		setIsOpen(false);
		unlockBody();
	};

	const onTouchStart = useCallback((e: TouchEvent) => {
		const target = e.target as HTMLElement;
		const newX = e.targetTouches[0].clientX;
		const newY = e.targetTouches[0].clientY;

		setTouchStartX(newX);

		if (filterRef.current) {
			const computedStyle = window.getComputedStyle(filterRef.current);
			const matrix = new DOMMatrixReadOnly(computedStyle.transform);
			const currentTranslateX = matrix.m41;
			setXStart(newX - currentTranslateX);
		} else {
			setXStart(newX);
		}

		setYStart(newY);
		setLastPosition(null);
		setPrevPosition(null);
		setSwipeDirection(null);
		setIsSwipeHandled(false);

		const isCheckboxRelated =
			target.closest("input") ||
			target.closest("label") ||
			target.closest("li") ||
			target.closest(`.${cnx("filter__title")}`);
		if (!isCheckboxRelated) {
			lockBody();
		}
	}, []);

	const onTouchMove = throttle((e: TouchEvent) => {
		if (btnRef.current && filterRef.current) {
			const currentX = e.targetTouches[0].clientX;
			const currentY = e.targetTouches[0].clientY;
			const deltaX = currentX - xStart;
			const deltaY = currentY - yStart;

			if (!swipeDirection) {
				if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
					setSwipeDirection("vertical");
					setIsSwipeHandled(false);
					return;
				} else if (Math.abs(deltaX) > 10) {
					setSwipeDirection("horizontal");
					setIsSwipeHandled(true);
				}
			}

			if (swipeDirection === "horizontal") {
				moveFilter({
					xStart,
					touchStartX,
					e,
					btnEl: btnRef.current,
					filterEl: filterRef.current,
					setLastPosition: (x: number, time: number) => {
						setPrevPosition(lastPosition);
						setLastPosition({ x, time });
						setCurrentTranslateX(x);
					},
					isOpen,
				});
			}
		}
	}, 16);

	const onTouchEnd = useCallback(
		(e: TouchEvent) => {
			if (!isSwipeHandled || swipeDirection !== "horizontal") {
				unlockBody();
				return;
			}

			if (btnRef.current && filterRef.current) {
				finishFilterMovement({
					e,
					btnEl: btnRef.current,
					filterEl: filterRef.current,
					lastPosition,
					prevPosition,
					setCurrentTranslateX,
					setIsOpen,
				});
			}
		},
		[isSwipeHandled, swipeDirection, lastPosition, prevPosition],
	);

	useEffect(() => {
		const btn = btnRef.current;
		const filter = filterRef.current;

		if (btn && filter) {
			btn.addEventListener("touchstart", onTouchStart, { passive: false });
			btn.addEventListener("touchmove", onTouchMove, { passive: false });
			btn.addEventListener("touchend", onTouchEnd);
			filter.addEventListener("touchstart", onTouchStart, { passive: false });
			filter.addEventListener("touchmove", onTouchMove, { passive: false });
			filter.addEventListener("touchend", onTouchEnd);

			return () => {
				btn.removeEventListener("touchstart", onTouchStart);
				btn.removeEventListener("touchmove", onTouchMove);
				btn.removeEventListener("touchend", onTouchEnd);
				filter.removeEventListener("touchstart", onTouchStart);
				filter.removeEventListener("touchmove", onTouchMove);
				filter.removeEventListener("touchend", onTouchEnd);
			};
		}
	}, [
		xStart,
		yStart,
		lastPosition,
		prevPosition,
		currentTranslateX,
		onTouchEnd,
		onTouchStart,
		onTouchMove,
	]);

	return (
		<div className={cnx("filter", className)}>
			<button className={cnx("filter__btn")} ref={btnRef}>
				<svg
					width="8"
					height="22"
					viewBox="0 0 8 22"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1 17L0.999999 5"
						stroke="#8EB3FE"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
					<path
						d="M7 21L7 1"
						stroke="#8EB3FE"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
				</svg>
				Фильтры
			</button>

			<div className={cnx("filter__body")} ref={filterRef}>
				<div className={cnx("filter__con")}>
					<Filers />
				</div>

				<div onClick={() => closeFilter()} className={cnx("filter__close")}>
					<img src="/icons/common/close.svg" alt="Закрыть" />
				</div>
			</div>
		</div>
	);
}

export default FilterMobile;
