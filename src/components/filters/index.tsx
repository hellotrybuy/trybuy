import { useMemo } from "react";
import classNames from "classnames/bind";
import Checkbox from "./checkbox";
import styles from "./index.module.scss";
import Button from "../button";
import { Platform, ProductTypes } from "../../hooks/types";

const cnx = classNames.bind(styles);

const platforms_mock: Platform[] = [
	{ id: 1, platform_name: "Steam", platform_url: "", sort_order: 0 },
	{ id: 2, platform_name: "PlayStation", platform_url: "", sort_order: 0 },
	{ id: 3, platform_name: "Xbox", platform_url: "", sort_order: 0 },
	{ id: 4, platform_name: "Epic Games Store", platform_url: "", sort_order: 0 },
	{ id: 5, platform_name: "Mobile", platform_url: "", sort_order: 0 },
	{ id: 6, platform_name: "Uplay", platform_url: "", sort_order: 0 },
	{ id: 7, platform_name: "Origin", platform_url: "", sort_order: 0 },
	{ id: 8, platform_name: "Nintendo Switch", platform_url: "", sort_order: 0 },
];

const contentTypes_mock: ProductTypes[] = [
	{ id: 1, type_name: "Ключи", type_url: "", sort_order: 0 },
	{ id: 2, type_name: "Гифты", type_url: "", sort_order: 0 },
	{ id: 3, type_name: "Аккаунты", type_url: "", sort_order: 0 },
	{ id: 4, type_name: "Аренда аккаунтов", type_url: "", sort_order: 0 },
	{ id: 5, type_name: "Активаsция", type_url: "", sort_order: 0 },
];

interface Props {
	platforms: [] | Platform[];
	setSelectedPlatforms: (ids: string[]) => void;
	selectedPlatforms: string[];

	contentTypes: [] | ProductTypes[];
	setSelectedTypes: (ids: string[]) => void;
	selectedTypes: string[];
}

export function Filers({
	platforms,
	setSelectedPlatforms,
	selectedPlatforms,
	contentTypes,
	setSelectedTypes,
	selectedTypes,
}: Props) {
	const currentPlatforms = useMemo(() => {
		if (!platforms || platforms.length == 0) {
			return platforms_mock;
		} else {
			return platforms;
		}
	}, [platforms]);

	const currentTypes = useMemo(() => {
		if (!contentTypes || contentTypes.length == 0) {
			return contentTypes_mock;
		} else {
			return contentTypes;
		}
	}, [contentTypes]);

	console.log(currentTypes, "currentTypes");

	const toggleItem = (
		item: string,
		list: string[],
		setter: (newList: string[]) => void,
	) => {
		setter(
			list.includes(item) ? list.filter((i) => i !== item) : [...list, item],
		);
	};

	const resetFilters = () => {
		setSelectedPlatforms([]);
		setSelectedTypes([]);
	};

	return (
		<aside className={cnx("filersBlock-vertical__aside", "aside")}>
			<div className={cnx("aside__filter", "filter")}>
				<strong className={cnx("filter__title")}>Платформа:</strong>
				<ul>
					{currentPlatforms &&
						currentPlatforms.map((platform) => (
							<li key={platform.id}>
								<Checkbox
									caption={platform.platform_name}
									checked={selectedPlatforms.includes(
										platform.platform_url.toString(),
									)}
									onChange={() =>
										toggleItem(
											platform.platform_url.toString(),
											selectedPlatforms,
											setSelectedPlatforms,
										)
									}
								/>
							</li>
						))}
				</ul>
			</div>

			<div className={cnx("aside__filter", "filter")}>
				<strong className={cnx("filter__title")}>Тип контента:</strong>
				<ul>
					{currentTypes &&
						currentTypes.map((content) => (
							<li key={content.id}>
								<Checkbox
									caption={content.type_name}
									checked={selectedTypes.includes(content.type_url.toString())}
									onChange={() =>
										toggleItem(
											content.type_url.toString(),
											selectedTypes,
											setSelectedTypes,
										)
									}
								/>
							</li>
						))}
				</ul>
			</div>

			<div className={cnx("filter__actions")}>
				<Button onClick={resetFilters} white size="medium">
					Сбросить фильтры
				</Button>
			</div>
		</aside>
	);
}
