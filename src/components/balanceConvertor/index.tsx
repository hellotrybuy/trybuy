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
	unit_cnt_min: number;
	unit_cnt_max: number;
	unit_cnt_desc: string;
	unit_only_int?: number;
}

function isPricesUnit(obj: any): obj is PricesUnit {
	return (
		(obj &&
			typeof obj.unit_name === "string" &&
			typeof obj.unit_amount === "number" &&
			typeof obj.unit_amount_desc === "string" &&
			typeof obj.unit_currency === "string" &&
			typeof obj.unit_cnt === "number" &&
			typeof obj.unit_cnt_min === "number" &&
			typeof obj.unit_cnt_max === "number" &&
			typeof obj.unit_cnt_desc === "string" &&
			typeof obj.unit_only_int === "number") ||
		obj.unit_only_int === undefined
	);
}

export function BalanceConvertor({ prices_unit }: BalanceConvertorProps) {
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
	const onlyInt = true;
	const { setTotalPrice, setCnt } = usePrice();

	const [inputPay, setInputPay] = useState(String(minCount));
	const [valueIWillPay, setValueIWillPay] = useState(minCount);

	const [inputReceive, setInputReceive] = useState(
		onlyInt ? String(Math.round(minCount * curs)) : String(minCount * curs),
	);
	const [valueIWillReceive, setValueIWillReceive] = useState(
		onlyInt ? minCount * curs : minCount * curs,
	);

	function clampValue(value: number) {
		let v = value;
		if (onlyInt) v = Math.round(v);
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
			setValueIWillPay(clamped);

			let receive: number;
			if (onlyInt) {
				receive = Math.round(clamped * curs);
			} else {
				receive = parseFloat((clamped * curs).toFixed(2));
			}

			setValueIWillReceive(receive);
			setInputReceive(receive.toString());
		}
	};

	const handlePayBlur = () => {
		let num = Number(inputPay);
		if (isNaN(num) || num < minCount) num = minCount;
		if (num > maxCount) num = maxCount;

		const clamped = clampValue(num);
		setValueIWillPay(clamped);

		setInputPay(String(clamped));

		const receive = onlyInt ? Math.round(clamped * curs) : clamped * curs;
		setValueIWillReceive(receive);
		setInputReceive(String(receive));
	};

	const handleReceiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value;
		const sanitized = raw.replace(/[^0-9.]/g, "");
		setInputReceive(sanitized);

		const num = Number(sanitized);
		if (!isNaN(num)) {
			const pay = onlyInt ? Math.round(num / curs) : num / curs;
			const clampedPay = clampValue(pay);

			setValueIWillPay(clampedPay);
			setValueIWillReceive(num);
		}
	};

	const handleReceiveBlur = () => {
		let num = Number(inputReceive);
		if (isNaN(num) || num < minCount * curs) num = minCount * curs;
		if (num > maxCount * curs) num = maxCount * curs;

		if (onlyInt) num = Math.round(num);

		setValueIWillReceive(num);
		setInputReceive(String(num));

		const pay = onlyInt ? Math.round(num / curs) : num / curs;
		const clampedPay = clampValue(pay);

		setValueIWillPay(clampedPay);
		setInputPay(String(clampedPay));
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
