import { useEffect, useState } from "react";
import Button from "../../../../../../../../components/button";
import Radio from "../../../../../../../../components/radio";
import { OptionItem } from "../../../../../../../../hooks/types";
import { useIsMobile } from "../../../../../../../../hooks/useIsMobile";
import DeliveryInfo from "../../../../../../utils/DeliveryInfo";
import styles from "../../index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

interface Props {
	option: OptionItem;
	isExpanded: boolean;
	toggleExpand: (name: string) => void;
	formValue: string;
	onChange: (name: string, value: string) => void;
}

export default function RadioOptionGroup({
	option,
	isExpanded,
	toggleExpand,
	formValue,
	onChange,
}: Props) {
	const VISIBLE_COUNT = 5;
	const visibleRadios = option.variants?.slice(0, VISIBLE_COUNT) || [];
	const hiddenRadios = option.variants?.slice(VISIBLE_COUNT) || [];
	const radioCount = option.variants?.length || 0;

	const { isMobile } = useIsMobile();
	const [isTwoColumn, setIsTwoColumn] = useState(false);

	useEffect(() => {
		if (option?.variants?.some((v) => v.text.length > 40)) {
			setIsTwoColumn(false);
		} else {
			setIsTwoColumn(true);
		}
	}, [option]);

	return (
		<div className={cnx("activation__block")}>
			<h3 className={cnx("activation__title")}>{option.label}</h3>
			<h4 className={cnx("activation__title__mini")}>
				<DeliveryInfo rawHtml={option.comment} />
			</h4>
			{isMobile ? (
				<div className={cnx("activation__options")}>
					{visibleRadios.map((elem) => (
						<Radio
							key={elem.value}
							caption={elem.text}
							name={option.name}
							value={elem.value}
							onValueChange={(val) => onChange(option.name, val)}
							checked={formValue === elem.value}
						/>
					))}
					{isExpanded &&
						hiddenRadios.map((elem) => (
							<Radio
								key={elem.value}
								caption={elem.text}
								name={option.name}
								value={elem.value}
								onValueChange={(val) => onChange(option.name, val)}
								checked={formValue === elem.value}
							/>
						))}
				</div>
			) : (
				<div
					className={cnx("activation__options", {
						"activation__options--two": isTwoColumn,
					})}
				>
					{option.variants.map((elem) => (
						<Radio
							key={elem.value}
							caption={elem.text}
							name={option.name}
							value={elem.value}
							onValueChange={(val) => onChange(option.name, val)}
							checked={formValue === elem.value}
						/>
					))}
				</div>
			)}

			{radioCount > VISIBLE_COUNT && isMobile && (
				<Button
					className={cnx("showMoreBtn")}
					onClick={() => toggleExpand(option.name)}
					white
				>
					<img
						src="/iconsFolder/common/arrow.svg"
						className={cnx("showMoreBtn__icon", {
							"showMoreBtn__icon--rotated": isExpanded,
						})}
					/>
					<div>{isExpanded ? "Скрыть" : "Показать всё"}</div>
				</Button>
			)}
		</div>
	);
}
