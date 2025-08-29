import React, { useCallback, useRef, useState, useEffect } from "react";
import Button from "../button";
import classNames from "classnames/bind";
import styles from "./index.module.scss";
import { useClickOutside } from "../../hooks/useClickOutside";

const cnx = classNames.bind(styles);

interface Props {
	setIsCatalogOpen: (value: React.SetStateAction<boolean>) => void;
	isCatalogOpen: boolean;
	setSearchValue: (value: React.SetStateAction<string>) => void;
	searchValue: string;
	setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
	refProp: React.RefObject<HTMLDivElement>;
}

export function MainSearch({
	setIsCatalogOpen,
	isCatalogOpen,
	searchValue,
	setSearchValue,
	setIsSearchOpen,
	refProp,
}: Props) {
	const ref = useRef<HTMLDivElement>(null);
	const [inputValue, setInputValue] = useState(searchValue); // локальное значение

	useEffect(() => {
		if (searchValue && searchValue != "") {
			setInputValue(searchValue);
		}
	}, [searchValue, setInputValue]);

	useClickOutside([ref, refProp], () => setIsSearchOpen(false));

	const openCatalog = useCallback(() => {
		setIsCatalogOpen(true);
		setIsSearchOpen(false);
	}, [setIsCatalogOpen, setIsSearchOpen]);

	const clearSearch = useCallback(() => {
		setInputValue("");
		setSearchValue(""); // сбрасываем оба значения
	}, [setSearchValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setSearchValue(inputValue);
		}, 500); // 500ms после последнего ввода

		return () => clearTimeout(timeout);
	}, [inputValue, setSearchValue]);

	return (
		<div className={cnx("actions__search")} ref={ref} key="MainSearch">
			<Button
				onMouseEnter={openCatalog}
				onMouseLeave={() => setIsCatalogOpen(false)}
				className={cnx("actions__search-btn", isCatalogOpen && "_active")}
				active={isCatalogOpen}
				type="button"
			>
				<svg
					width="18"
					height="18"
					viewBox="0 0 18 18"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect width="8" height="8" rx="2" fill="white" />
					<rect x="10.5" y="0.5" width="7" height="7" rx="1.5" stroke="white" />
					<rect y="10" width="8" height="8" rx="2" fill="white" />
					<rect x="10" y="10" width="8" height="8" rx="2" fill="white" />
				</svg>
				<span>Каталог</span>
			</Button>

			<input
				onClick={() => setIsSearchOpen(true)}
				className={cnx("actions__search-input")}
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				type="text"
				placeholder="Поиск"
			/>

			{inputValue !== "" ? (
				<div
					className={cnx("actions__search-container-circle")}
					onClick={clearSearch}
				>
					<img
						className={cnx("actions__search-shape")}
						src="/iconsFolder/navigation/shape.svg"
						alt="Поиск"
					/>
				</div>
			) : (
				<img
					className={cnx("actions__search-icon")}
					src="/iconsFolder/navigation/search.svg"
					alt="Поиск"
				/>
			)}
		</div>
	);
}
