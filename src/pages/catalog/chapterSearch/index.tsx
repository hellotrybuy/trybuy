import classNames from "classnames/bind";
import styles from "./index.module.scss";
import { FilterSelect } from "../../../components/filterSelect";

const cnx = classNames.bind(styles);

interface ChapterSearchProps {
	setSelectValue: React.Dispatch<React.SetStateAction<string>>;
	selectValue: string;
	values: {
		value: string;
		label: string;
	}[];
}

export function ChapterSearch({
	setSelectValue,
	selectValue,
	values,
}: ChapterSearchProps) {
	return (
		<div className={cnx("search")}>
			<div className={cnx("filters")}>
				<FilterSelect
					setSelectValue={setSelectValue}
					selectValue={selectValue}
					values={values}
				/>
			</div>
		</div>
	);
}
