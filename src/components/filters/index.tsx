import { useState } from "react";
import classNames from "classnames/bind";
import Checkbox from "./checkbox";
import styles from "./index.module.scss";
import Button from "../button";

const cnx = classNames.bind(styles);

const platforms = [
	"Steam",
	"PlayStation",
	"Xbox",
	"Epic Games Store",
	"Mobile",
	"Uplay",
	"Origin",
	"Nintendo Switch",
];

const contentTypes = [
	"Ключи",
	"Гифты",
	"Аккаунты",
	"Аренда аккаунтов",
	"Активация",
];

export function Filers() {
	const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
	const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>(
		[],
	);

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
					{platforms.map((platform) => (
						<li key={platform}>
							<Checkbox
								caption={platform}
								checked={selectedPlatforms.includes(platform)}
								onChange={() =>
									toggleItem(platform, selectedPlatforms, setSelectedPlatforms)
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
