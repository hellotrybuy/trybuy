import React, { useCallback, useRef } from "react";
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
}

export function MainSearch({
	setIsCatalogOpen,
	isCatalogOpen,
	searchValue,
	setSearchValue,
	setIsSearchOpen,
}: Props) {
	const ref = useRef<HTMLDivElement>(null);

	useClickOutside(ref, () => setIsSearchOpen(false));

	const openCatalog = useCallback(() => {
		setIsCatalogOpen(true);
		setIsSearchOpen(false);
	}, [setIsCatalogOpen, setIsSearchOpen]);

	return (
		<>
			<div className={cnx("actions__search")} ref={ref} key="MainSearch">
				<Button
					onMouseEnter={() => openCatalog()}
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
						<rect
							x="10.5"
							y="0.5"
							width="7"
							height="7"
							rx="1.5"
							stroke="white"
						/>
						<rect y="10" width="8" height="8" rx="2" fill="white" />
						<rect x="10" y="10" width="8" height="8" rx="2" fill="white" />
					</svg>
					<span>Каталог</span>
				</Button>

				<input
					onClick={() => setIsSearchOpen(true)}
					className={cnx("actions__search-input")}
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					type="text"
					placeholder="Поиск"
				/>
				<img
					className={cnx("actions__search-icon")}
					src="/iconsFolder/navigation/search.svg"
					alt="Поиск"
				/>
			</div>
		</>
	);
}
