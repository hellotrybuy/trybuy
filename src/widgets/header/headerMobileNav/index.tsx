import classNames from "classnames/bind";
import styles from "./index.module.scss";
import Button from "../../../components/button";
import { useCallback, useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import React from "react";

const cnx = classNames.bind(styles);

interface HeaderMobileNavProps {
	searchValue: string;
	setSearchValue: (value: string) => void;
	isCatalogOpen: boolean;
	setIsCatalogOpen: (value: boolean) => void;
	setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
	refProp: React.RefObject<HTMLDivElement>;
}

export function HeaderMobileNav({
	searchValue,
	setSearchValue,
	isCatalogOpen,
	setIsCatalogOpen,
	setIsSearchOpen,
	refProp,
}: HeaderMobileNavProps) {
	const ref = useRef<HTMLDivElement>(null);

	useClickOutside([ref, refProp], () => setIsSearchOpen(false));
	const openCatalog = useCallback(() => {
		setIsCatalogOpen(!isCatalogOpen);
		setIsSearchOpen(false);
	}, [setIsCatalogOpen, setIsSearchOpen, isCatalogOpen]);

	const openSearch = useCallback(() => {
		setIsSearchOpen(true);
		setIsCatalogOpen(false);
	}, [setIsCatalogOpen, setIsSearchOpen]);

	const clearSearch = useCallback(() => {
		setSearchValue("");
	}, [setSearchValue]);

	return (
		<div className={cnx("actions-mobile__search")} ref={ref}>
			{searchValue != "" ? (
				<div
					className={cnx("actions-mobile__search-container-circle")}
					onClick={clearSearch}
				>
					<img
						className={cnx("actions-mobile__search-shape")}
						src="/iconsFolder/navigation/shape.svg"
						alt="Поиск"
					/>
				</div>
			) : (
				<img
					className={cnx("actions-mobile__search-icon")}
					src="/iconsFolder/navigation/search.svg"
					alt="Поиск"
				/>
			)}

			<input
				onClick={openSearch}
				id="main-search-input"
				className={cnx("actions-mobile__search-input")}
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				type="text"
				placeholder="Поиск"
				onFocus={() => {
					openSearch();
				}}
			/>
			<Button
				onClick={openCatalog}
				className={cnx(
					"actions-mobile__search-btn",
					isCatalogOpen && "_active",
				)}
				active={isCatalogOpen}
				icon
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
			</Button>
		</div>
	);
}

export default HeaderMobileNav;
