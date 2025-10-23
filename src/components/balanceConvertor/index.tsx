import { useEffect, useMemo, useState } from "react";
import InputField from "../inputField";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { usePrice } from "../../pages/product/context";
import { ProductData } from "../../hooks/types";
import { SelectCustom } from "../selectCustom";

const cnx = classNames.bind(styles);

interface BalanceConvertorProps {
	prices_unit: string;
	product: ProductData;
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
	unit_fixed?: number[];
}

function isPricesUnit(obj: any): obj is PricesUnit {
	return obj && typeof obj === "object";
}

export function BalanceConvertor({
	prices_unit,
	product,
}: BalanceConvertorProps) {
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

	const hasFixedValues = !!info?.unit_fixed?.length;
	const fixedValues = info?.unit_fixed || [];

	// курс рассчитываем по логике:
	// - если есть fixed, то по первому элементу
	// - иначе стандартно
	const curs = useMemo(() => {
		if (!info) return 1;
		if (hasFixedValues) {
			const base = fixedValues[0];
			if (base > 0) return Number(product.price) / base;
		}
		if (info.unit_cnt === 0) return 1;
		return Number(product.price) / info.unit_cnt;
	}, [info, hasFixedValues, fixedValues, product]);

	const minCount = info?.unit_cnt_min || 1;
	const maxCount = info?.unit_cnt_max || 1;
	const { setTotalPrice, setCnt } = usePrice();

	const [valueIWillPay, setValueIWillPay] = useState<number>(
		hasFixedValues ? fixedValues[0] : minCount,
	);
	const [valueIWillReceive, setValueIWillReceive] = useState<number>(
		Math.ceil((hasFixedValues ? fixedValues[0] : minCount) * curs),
	);

	const warningMessage = hasFixedValues
		? "Выберите сумму пополнения из списка"
		: `Мин. сумма: ${minCount} ${info?.unit_name}, Макс. сумма: ${maxCount} ${info?.unit_name}`;

	useEffect(() => {
		setTotalPrice(Math.round(valueIWillReceive));
	}, [valueIWillReceive, setTotalPrice]);

	useEffect(() => {
		setCnt(valueIWillPay);
	}, [valueIWillPay, setCnt]);

	// Обработчик для кастомного Select
	const handleSelectChange = (val: string) => {
		const num = Number(val);
		setValueIWillPay(num);
		setValueIWillReceive(Math.ceil(num * curs));
	};

	// Обработчик ручного ввода (если unit_fixed нет)
	const handlePayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value.replace(/[^0-9.]/g, "");
		const num = Number(raw);
		if (!isNaN(num)) {
			const clamped = Math.min(Math.max(num, minCount), maxCount);
			setValueIWillPay(clamped);
			setValueIWillReceive(Math.ceil(clamped * curs));
		}
	};

	if (hasFixedValues) {
		return (
			<div>
				<div className={cnx("container")}>
					<div className={cnx("container__item")}>
						<div className={cnx("container__text")}>
							Получу, {info?.unit_name}
						</div>

						<div className={cnx("container__field")}>
							<SelectCustom
								value={valueIWillPay.toString()}
								options={fixedValues.map((v) => ({
									value: v.toString(),
									label: v.toString(),
								}))}
								onChange={handleSelectChange}
							/>
						</div>
					</div>
					<img
						className={cnx("container__arrow")}
						src="/iconsFolder/common/Arrow_Right_LG.svg"
						alt="Arrow"
					/>

					<div className={cnx("container__item")}>
						<div className={cnx("container__text")}>Заплачу, руб.</div>
						<div className={cnx("container__field")}>
							<InputField
								value={Math.round(valueIWillReceive).toString()}
								onChange={() => {}}
								readOnly
								placeholder=""
								id="valueIWillReceive"
							/>
						</div>
					</div>
				</div>

				<div className={cnx("container__warning")}>{warningMessage}</div>
			</div>
		);
	}

	return (
		<div>
			<div className={cnx("container")}>
				<div className={cnx("container__item")}>
					<div className={cnx("container__text")}>Заплачу, руб.</div>
					<div className={cnx("container__field")}>
						<InputField
							value={Math.round(valueIWillReceive).toString()}
							onChange={() => {}}
							readOnly
							placeholder=""
							id="valueIWillReceive"
						/>
					</div>
				</div>

				<img
					className={cnx("container__arrow")}
					src="/iconsFolder/common/Arrow_Right_LG.svg"
					alt="Arrow"
				/>

				<div className={cnx("container__item")}>
					<div className={cnx("container__text")}>
						Получу, {info?.unit_name}
					</div>

					<div className={cnx("container__field")}>
						<InputField
							value={valueIWillPay.toString()}
							onChange={handlePayChange}
							placeholder="Введите сумму"
							id="valueIWillPay"
						/>
					</div>
				</div>
			</div>

			<div className={cnx("container__warning")}>{warningMessage}</div>
		</div>
	);
}

export default BalanceConvertor;
