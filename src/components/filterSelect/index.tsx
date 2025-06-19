import { useState } from "react";
import Select from "../select";

const OPTIONS = [
	{ value: "По рекомендациям", label: "По рекомендациям" },
	{ value: "По кол-ву продаж", label: "По кол-ву продаж" },
	{ value: "Сначала дешевле", label: "Сначала дешевле" },
	{ value: "Сначала дороже", label: "Сначала дороже" },
];

export function FilterSelect() {
	const [selectValue, setSelectValue] = useState(OPTIONS[0].value);
	return (
		<Select
			onChange={(newValue) => setSelectValue(newValue)}
			value={selectValue}
			options={OPTIONS}
		/>
	);
}
