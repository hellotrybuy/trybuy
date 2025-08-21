import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.scss";

import { Filers } from "../../components/filters";

import { CatrgorySecondPlace, Platform, ProductTypes } from "../../hooks/types";
import { SetURLSearchParams } from "react-router";
import Button from "../../components/button";

const cnx = classNames.bind(styles);

interface IFilterMobile {
	className?: string;
	category: string;
	platforms: [] | Platform[];
	setSelectedPlatforms: (ids: string[]) => void;
	selectedPlatforms: string[];
	contentTypes: [] | ProductTypes[];
	setSelectedTypes: (ids: string[]) => void;
	selectedTypes: string[];
	searchParams: URLSearchParams | null;
	categorySecondPlace: [] | CatrgorySecondPlace[];
	setSelectSecondCat: (id: string) => void;
	selectSecondCat: string;
	setSearchParams: SetURLSearchParams | null;
	isOpen: boolean;
	onClose: () => void;
}

export function FilterMobile({
	className,
	platforms,
	setSelectedPlatforms,
	selectedPlatforms,
	contentTypes,
	selectedTypes,
	setSelectedTypes,
	searchParams = null,
	setSearchParams = null,
	categorySecondPlace,
	selectSecondCat,
	setSelectSecondCat,
	isOpen,
	onClose,
	category = "",
}: IFilterMobile) {
	const swipeRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	useEffect(() => {
		const swipeArea = swipeRef.current;
		if (!swipeArea) return;

		let touchStartY = 0;
		let currentY = 0;
		let translateY = 0;
		let isDragging = false;

		const threshold = 100; // px для закрытия
		const body = swipeArea.closest(`.${cnx("filter__body")}`) as HTMLDivElement;

		const onTouchStart = (e: TouchEvent) => {
			touchStartY = e.touches[0].clientY;
			currentY = touchStartY;
			isDragging = true;

			if (body) {
				body.style.transition = "none"; // убираем анимацию
			}
		};

		const onTouchMove = (e: TouchEvent) => {
			if (!isDragging) return;
			currentY = e.touches[0].clientY;
			const diffY = currentY - touchStartY;

			if (diffY > 0) {
				translateY = diffY;
				if (body) {
					body.style.transform = `translateY(${translateY}px)`;
				}
				e.preventDefault();
			}
		};

		const onTouchEnd = () => {
			isDragging = false;
			if (body) {
				body.style.transition = "transform 0.3s ease";

				if (translateY > threshold) {
					// Если свайп большой — закрываем
					body.style.transform = `translateY(100%)`;
					setTimeout(() => {
						onClose();
						body.style.transform = "";
					}, 300);
				} else {
					// Возвращаем назад
					body.style.transform = `translateY(0)`;
				}
			}
		};

		swipeArea.addEventListener("touchstart", onTouchStart, { passive: false });
		swipeArea.addEventListener("touchmove", onTouchMove, { passive: false });
		swipeArea.addEventListener("touchend", onTouchEnd);

		return () => {
			swipeArea.removeEventListener("touchstart", onTouchStart);
			swipeArea.removeEventListener("touchmove", onTouchMove);
			swipeArea.removeEventListener("touchend", onTouchEnd);
		};
	}, [onClose]);

	return (
		<div className={cnx("filter", className)}>
			<div
				className={cnx("filter__body", { _open: isOpen })}
				role="dialog"
				aria-modal="true"
			>
				<div className={cnx("filter__swipe")} ref={swipeRef}></div>

				<div className={cnx("filter__con")}>
					<Filers
						category={category}
						platforms={platforms}
						selectedPlatforms={selectedPlatforms}
						setSelectedPlatforms={setSelectedPlatforms}
						contentTypes={contentTypes}
						selectedTypes={selectedTypes}
						setSelectedTypes={setSelectedTypes}
						searchParams={searchParams}
						categorySecondPlace={categorySecondPlace}
						selectSecondCat={selectSecondCat}
						setSelectSecondCat={setSelectSecondCat}
						setSearchParams={setSearchParams}
					/>
				</div>

				<Button
					className={cnx("filter__close")}
					onClick={onClose}
					aria-label="Применить фильтры"
				>
					Применить
				</Button>
			</div>
		</div>
	);
}

export default FilterMobile;
