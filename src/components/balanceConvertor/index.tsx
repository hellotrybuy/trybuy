import { useEffect, useMemo, useState } from "react";
import InputField from "../inputField";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { usePrice } from "../../pages/product/context";

const cnx = classNames.bind(styles);

interface BalanceConvertorProps {
	prices_unit: string;
}

export interface PricesUnit {
	unit_name: string;
	unit_amount: number;
	unit_amount_desc: string;
	unit_currency: string;
	unit_cnt: number;
	unit_cnt_min?: number;
	unit_cnt_max: number;
	unit_cnt_desc: string;
	unit_only_int?: number;
}

function isPricesUnit(obj: any): obj is PricesUnit {
	return obj && typeof obj === "object";
}

export function BalanceConvertor({ prices_unit }: BalanceConvertorProps) {
	console.log("тут конвертор баланса");
	const info = useMemo<PricesUnit | null>(() => {
		try {
			const parsed = JSON.parse(prices_unit);
			if (isPricesUnit(parsed)) {
				return parsed;
			} else {
				console.warn("Invalid prices_unit format");
				return null;
			}
		} catch (e) {
			console.error("Failed to parse prices_unit:", e);
			return null;
		}
	}, [prices_unit]);

	const curs = useMemo(() => {
		if (!info || info.unit_cnt === 0) return 1;
		return info.unit_amount / info.unit_cnt;
	}, [info]);

	const minCount = info?.unit_cnt_min || 1;
	const maxCount = info?.unit_cnt_max || 1;
	const { setTotalPrice, setCnt } = usePrice();

	const [inputPay, setInputPay] = useState(String(Math.floor(minCount)));
	const [valueIWillPay, setValueIWillPay] = useState(minCount);

	const [inputReceive, setInputReceive] = useState(
		String(Math.ceil(minCount * curs)),
	);
	const [valueIWillReceive, setValueIWillReceive] = useState(minCount * curs);

	function clampValue(value: number) {
		let v = value;
		if (v < minCount) v = minCount;
		if (v > maxCount) v = maxCount;
		return v;
	}

	const handlePayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value;
		const sanitized = raw.replace(/[^0-9.]/g, "");
		setInputPay(sanitized);
		const num = Number(sanitized);
		if (!isNaN(num)) {
			const clamped = clampValue(num);
			const floored = Math.floor(clamped);
			setValueIWillPay(floored);

			const receive = Math.ceil(floored * curs);
			setValueIWillReceive(receive);
			setInputReceive(receive.toString());
		}
	};

	const handlePayBlur = () => {
		let num = Number(inputPay);
		if (isNaN(num) || num < minCount) num = minCount;
		if (num > maxCount) num = maxCount;

		const clamped = clampValue(num);
		const floored = Math.floor(clamped);
		setValueIWillPay(floored);
		setInputPay(String(floored));

		const receive = Math.ceil(floored * curs);
		setValueIWillReceive(receive);
		setInputReceive(receive.toString());
	};

	const handleReceiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value;
		const sanitized = raw.replace(/[^0-9.]/g, "");
		setInputReceive(sanitized);

		const num = Number(sanitized);
		if (!isNaN(num)) {
			const pay = num / curs;
			const clampedPay = clampValue(pay);
			const flooredPay = Math.floor(clampedPay);
			setValueIWillPay(flooredPay);
			setValueIWillReceive(Math.ceil(num));
		}
	};

	const handleReceiveBlur = () => {
		let num = Number(inputReceive);
		if (isNaN(num) || num < minCount * curs) num = minCount * curs;
		if (num > maxCount * curs) num = maxCount * curs;

		const ceiled = Math.ceil(num);
		setValueIWillReceive(ceiled);
		setInputReceive(ceiled.toString());

		const pay = ceiled / curs;
		const clampedPay = clampValue(pay);
		const flooredPay = Math.floor(clampedPay);
		setValueIWillPay(flooredPay);
		setInputPay(flooredPay.toString());
	};

	const warningMessage = `Мин. сумма пополнения: ${minCount} ${info?.unit_name}, Макс. сумма — ${maxCount} ${info?.unit_name}`;

	useEffect(() => {
		setTotalPrice(Math.round(valueIWillReceive));
	}, [valueIWillReceive, setTotalPrice]);

	useEffect(() => {
		setCnt(valueIWillPay);
	}, [valueIWillPay, setCnt]);

	return (
		<div>
			<div className={cnx("container")}>
				<div className={cnx("container__item")}>
					<div className={cnx("container__text")}>Заплачу, руб.</div>
					<div className={cnx("container__field")}>
						<InputField
							value={inputReceive}
							onChange={handleReceiveChange}
							onBlur={handleReceiveBlur}
							placeholder={""}
							id={"valueIWillReceive"}
						/>
					</div>
				</div>

				<img
					className={cnx("container__arrow")}
					src="/iconsFolder/common/Arrow_Right_LG.svg"
					alt="Оценка"
				/>

				<div className={cnx("container__item")}>
					<div className={cnx("container__text")}>
						Получу, {info?.unit_name}
					</div>
					<div className={cnx("container__field")}>
						<InputField
							value={inputPay}
							onChange={handlePayChange}
							onBlur={handlePayBlur}
							placeholder={"Введите сумму"}
							id={"valueIWillPay"}
						/>
					</div>
				</div>
			</div>

			<div className={cnx("container__warning")}>{warningMessage}</div>
		</div>
	);
}

export default BalanceConvertor;
