import { useMemo, useState } from "react";
import classNames from "classnames/bind";
import Checkbox from "./checkbox";
import styles from "./index.module.scss";
import Button from "../button";
import { Platform } from "../../hooks/types";

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

const contentTypes = [
	"Ключи",
	"Гифты",
	"Аккаунты",
	"Аренда аккаунтов",
	"Активация",
];

interface Props {
	platforms: [] | Platform[];
	setSelectedPlatforms: (ids: string[]) => void;
	selectedPlatforms: string[];
}

export function Filers({
	platforms,
	setSelectedPlatforms,
	selectedPlatforms,
}: Props) {
	const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>(
		[],
	);

	console.log(platforms);

	const currentPlatforms = useMemo(() => {
		if (!platforms || platforms.length == 0) {
			return platforms_mock;
		} else {
			return platforms;
		}
	}, [platforms]);

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
		setSelectedContentTypes([]);
	};

	return (
		<aside className={cnx("filersBlock-vertical__aside", "aside")}>
			<div className={cnx("aside__filter", "filter")}>
				<strong className={cnx("filter__title")}>Платформа:</strong>
				<ul>
					{currentPlatforms.map((platform) => (
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
					{contentTypes.map((content) => (
						<li key={content}>
							<Checkbox
								caption={content}
								checked={selectedContentTypes.includes(content)}
								onChange={() =>
									toggleItem(
										content,
										selectedContentTypes,
										setSelectedContentTypes,
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
