import Select from "../select";

interface FilterSelectProps {
	setSelectValue: React.Dispatch<React.SetStateAction<string>>;
	selectValue: string;
	values: {
		value: string;
		label: string;
	}[];
}

export function FilterSelect({
	setSelectValue,
	selectValue,
	values,
}: FilterSelectProps) {
	return (
		<Select
			onChange={(newValue) => setSelectValue(newValue)}
			value={selectValue}
			options={values}
		/>
	);
}
