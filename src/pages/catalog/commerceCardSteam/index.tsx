import classNames from "classnames/bind";
import styles from "./index.module.scss";
import InputField from "../../../components/inputField";
import { OptionItem, ProductData } from "../../../hooks/types";
import { usePrice } from "../../product/context";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TextOptionField from "../../product/templates/header/templates/activation/blocks/TextOptionField";
import { ProductPayComm } from "./pay";
import { useCurrency } from "../../../hooks/useRate";
import SelectCustom from "./selectCustom";
import { useClickOutside } from "../../../hooks/useClickOutside";

const cnx = classNames.bind(styles);

const enum COURSES {
	"rub",
	"dollar",
	"tenge",
}

const course = [
	{
		value: COURSES.rub,
		label: "₽",
	},
	{
		value: COURSES.dollar,
		label: "$",
	},
	{
		value: COURSES.tenge,
		label: "₸",
	},
];

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

const getPriceUnit = (data: string) => {
	try {
		const parsed = JSON.parse(data);
		if (isPricesUnit(parsed)) {
			return parsed;
		} else {
			return null;
		}
	} catch (e) {
		return null;
	}
};

function findLoginField(options) {
	if (typeof options === "string") {
		try {
			options = JSON.parse(options);
		} catch {
			return null;
		}
	}
	return (
		options.find((opt) => {
			const label = opt.label?.toLowerCase() || "";
			return label.includes("логин") || label.includes("login");
		}) || null
	);
}

function removeEmojis(text: string): string {
	return text
		.replace(
			/([\p{Emoji_Presentation}]|[\p{Extended_Pictographic}]|[\u2600-\u27BF])/gu,
			" ",
		)
		.replace(/\s+/g, " ")
		.trim();
}

function hasPriceModifier(options: OptionItem[] | ""): boolean {
	if (options == "") return false;
	if (options == undefined) return false;
	return options.some((opt) => {
		if (opt.modify_value !== undefined && opt.modify_type !== undefined)
			return true;
		if (Array.isArray(opt.variants)) {
			return opt.variants.some(
				(v) => v.modify_value !== undefined && v.modify_type !== undefined,
			);
		}
		return false;
	});
}

export const CommerceCardSteam = ({
	prices_unit,
	product,
}: BalanceConvertorProps) => {
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

	const { rate: rubToUsd } = useCurrency("rub", "usd");
	const { rate: rubToKzt } = useCurrency("rub", "kzt");
	const { rate: kztToRub } = useCurrency("kzt", "rub");

	const options = useMemo(() => {
		if (product.options == undefined) return "";
		return JSON.parse(product.options) as OptionItem[];
	}, [product]);

	const price = useMemo(() => {
		if (product.options != "" || product.prices_unit != "null") {
			const isModify = hasPriceModifier(options);
			if (isModify || product.prices_unit != "null") {
				const data = getPriceUnit(product?.prices_unit);
				if (data) {
					const roundDown2 = (val: number) =>
						(Math.floor(val * 100) / 100).toFixed(2);
					if (data?.unit_fixed && data?.unit_fixed[0]) {
						return roundDown2(data.unit_amount / data?.unit_fixed[0]);
					}
					const devl =
						Number(product.price) / data.unit_cnt > 100
							? data.unit_amount
							: data.unit_cnt;
					return roundDown2(Number(product.price) / devl);
				}
			}
		}
		return `${product.price} RUB`;
	}, [product, options]);

	const mainCour = useMemo(() => {
		if (Number(price) < 0.5) {
			return COURSES.tenge;
		} else {
			return COURSES.rub;
		}
	}, [price]);

	const [valueIWillPayS, setValueIWillPayS] = useState<COURSES>(mainCour);
	const [inputPayValue, setInputPayValue] = useState<string>("");

	const convert = (value: number, from: COURSES, to: COURSES) => {
		if (from === to) return value;

		// Из рублей
		if (from === COURSES.rub && to === COURSES.dollar) return value * rubToUsd;
		if (from === COURSES.rub && to === COURSES.tenge) return value * rubToKzt;

		// Из доллара
		if (from === COURSES.dollar && to === COURSES.rub) return value / rubToUsd;
		if (from === COURSES.dollar && to === COURSES.tenge)
			return (value / rubToUsd) * rubToKzt;

		// Из тенге
		if (from === COURSES.tenge && to === COURSES.rub) return value / rubToKzt;
		if (from === COURSES.tenge && to === COURSES.dollar)
			return (value / rubToKzt) * rubToUsd;

		return value;
	};

	// Смена валюты
	const resultCourse = useCallback(
		(newCourse: COURSES) => {
			const amount = Number(inputPayValue) || 0;
			setValueIWillPayS(newCourse);
			if (!amount) return;
			// Переводим текущее отображаемое значение в новую валюту
			const newValue = convert(amount, valueIWillPayS, newCourse);
			setInputPayValue(newValue.toFixed(2));
		},
		[inputPayValue, valueIWillPayS, rubToUsd, rubToKzt, kztToRub],
	);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 990);

	useEffect(() => {
		function handleResize() {
			setIsMobile(window.innerWidth <= 990);
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const hasFixedValues = !!info?.unit_fixed?.length;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fixedValues = info?.unit_fixed || [];

	const [formState, setFormState] = useState<
		Record<string, string | boolean | Record<string, boolean>>
	>({});

	const curs = useMemo(() => {
		if (!info) return 1;
		if (hasFixedValues && fixedValues.length > 0) {
			const base = fixedValues[0];
			if (base > 0) return info.unit_amount / base;
		}
		const baseCnt =
			info.unit_cnt_min && info.unit_cnt_min > 0
				? info.unit_cnt_min
				: info.unit_cnt;
		if (baseCnt === 0) return 1;
		if (info.unit_amount / baseCnt < Number(product.price) / baseCnt) {
			return Number(product.price) / baseCnt;
		}
		return info.unit_amount / baseCnt;
	}, [info, hasFixedValues, fixedValues, product]);

	const minCount = info?.unit_cnt_min || 1;
	const maxCount = info?.unit_cnt_max || Infinity;

	const { setTotalPrice, setForm, setCnt } = usePrice();

	const loginItem = useMemo(() => {
		return findLoginField(product.options);
	}, [product]);

	const [valueInRub, setValueInRub] = useState<number>(minCount);
	const [valueIWillPay, setValueIWillPay] = useState<COURSES>(COURSES.rub);
	const [valueIWillReceive, setValueIWillReceive] = useState<number>(
		Math.ceil((hasFixedValues ? fixedValues[0] : minCount) * curs),
	);

	const warningMessage = hasFixedValues
		? "Выберите сумму пополнения из списка"
		: `Минимальная сумма: ${minCount} ${info?.unit_name}`;

	useEffect(() => {
		setTotalPrice(Math.round(valueIWillReceive));
	}, [valueIWillReceive, setTotalPrice]);

	useEffect(() => {
		setCnt(valueIWillPay);
	}, [valueIWillPay, setCnt]);

	console.log(product, "product");

	const handlePayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value.replace(/[^0-9.]/g, "");
		setInputPayValue(raw);

		if (raw === "") {
			setValueIWillPay(0);
			setValueIWillReceive(0);
			return;
		}

		let num = Number(raw);
		if (isNaN(num)) return;

		// Ограничиваем ввод только в текущей валюте
		let numLimited = num;
		if (valueIWillPayS === COURSES.rub) numLimited = Math.min(num, maxCount);
		// для других валют можно добавлять лимиты при необходимости

		// Конвертируем для отображения получаемого значения
		const amountInRub = convert(numLimited, valueIWillPayS, COURSES.rub);
		setValueIWillPay(amountInRub);
		setValueIWillReceive(Math.ceil(amountInRub * curs));
	};

	const handlePayBlur = () => {
		if (inputPayValue === "") {
			const defaultValue = minCount;
			setValueIWillPay(defaultValue);
			setValueIWillReceive(Math.ceil(defaultValue * curs));
			setInputPayValue(
				convert(defaultValue, COURSES.rub, valueIWillPayS).toFixed(2),
			);
			return;
		}

		let num = Number(inputPayValue);
		if (isNaN(num)) num = minCount;

		// Ограничиваем в рублях
		let amountInRub = convert(num, valueIWillPayS, COURSES.rub);
		amountInRub = Math.max(minCount, Math.min(amountInRub, maxCount));

		setValueIWillPay(amountInRub);
		setValueIWillReceive(Math.ceil(amountInRub * curs));

		// Обновляем поле в выбранной валюте
		setInputPayValue(
			convert(amountInRub, COURSES.rub, valueIWillPayS).toFixed(2),
		);
	};

	console.log(loginItem, "loginItem");

	useEffect(() => {
		setForm((prev) => ({ ...prev, ...formState }));
	}, [formState, setForm]);

	const imagePreviewSrc = useMemo(() => {
		if (product?.preview) {
			return `https://admin.trybuy.pro/${product?.preview}`;
		} else {
			return product?.id_product
				? `https://graph.digiseller.ru/img.ashx?id_d=${product?.id_product}&w=200&h=200&crop=true`
				: `https://graph.digiseller.ru/img.ashx?id_d=${product?.product_id}&w=200&h=200&crop=true`;
		}
	}, [product]);
	const totalReviews =
		Number(product.good_reviews) + Number(product.bad_reviews);
	const rating =
		totalReviews === 0 ? 0 : (Number(product.good_reviews) / totalReviews) * 5;

	const [isOpenModal, setIsOpenModal] = useState(false);
	const refDesc = useRef(null);

	useClickOutside([refDesc], () => setIsOpenModal(false));

	if (isMobile) {
		return (
			<div className={cnx("main__box", "box", "_desktop")}>
				<img
					className={cnx("box__img")}
					src={imagePreviewSrc || ""}
					alt={product.platform_name || "Platform"}
				/>
				<div className={cnx("box__main")}>
					<div className={cnx("box__top")}>
						<div className={cnx("header_mob")}>
							<div className={cnx("pr__type")}>
								<span>{removeEmojis(product.name)}</span>
							</div>
							<div className={cnx("headerss")}>
								<div className={cnx("box__top-block")}>
									{/* SVG иконка */}
									<svg
										width="8"
										height="13"
										viewBox="0 0 8 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M2.84266 7.3729L2.38269 7.10733C1.16294 6.40311 0.553072 6.051 0.528428 5.50384C0.503784 4.95667 1.07953 4.55116 2.23103 3.74014L5.91355 1.14649C6.64173 0.633619 7.00582 0.377185 7.15415 0.512727C7.30247 0.648269 7.07981 1.03394 6.63448 1.80527L5.02363 4.59535C4.90578 4.79947 4.84685 4.90153 4.87365 5.00156C4.90045 5.10158 5.00252 5.16051 5.20664 5.27836L5.66661 5.54393C6.88635 6.24814 7.49622 6.60025 7.52087 7.14742C7.54551 7.69459 6.96976 8.1001 5.81826 8.91112L2.13574 11.5048C1.40757 12.0176 1.04348 12.2741 0.895149 12.1385C0.746822 12.003 0.969487 11.6173 1.41482 10.846L3.02567 8.05591C3.14352 7.85179 3.20245 7.74972 3.17564 7.6497C3.14884 7.54967 3.04678 7.49075 2.84266 7.3729Z"
											fill="url(#paint0_linear_743_10719)"
										/>
										<defs>
											<linearGradient
												id="paint0_linear_743_10719"
												x1="7.76954"
												y1="-0.160715"
												x2="0.279755"
												y2="12.812"
												gradientUnits="userSpaceOnUse"
											>
												<stop stopColor="#FEFEFE" />
												<stop offset="1" stopColor="#DADADA" />
											</linearGradient>
										</defs>
									</svg>
									<span>{product.seller_name || ""}</span>
								</div>
								{rating ? (
									<div className={cnx("box__top-block")}>
										<img src="/iconsFolder/common/star.svg" alt="Star" />
										<span>{rating.toFixed(1)}</span>
									</div>
								) : (
									<></>
								)}
							</div>
						</div>
					</div>
					<div className={cnx("box__actions")}>
						<div style={{ width: "100%" }}>
							<div className={cnx("container")}>
								<div className={cnx("container__field")}>
									<InputField
										value={inputPayValue}
										onChange={handlePayChange}
										onBlur={handlePayBlur}
										placeholder="Получу"
										id="valueIWillPay"
									/>
									<SelectCustom
										value={valueIWillPayS.toString()}
										options={course.map((v) => ({
											value: v.value.toString(),
											label: v.label.toString(),
										}))}
										onChange={(val) => resultCourse(Number(val))}
									/>
									<div>
										<div className={cnx("container__warning")}>
											<img src="/iconsFolder/common/faq.svg" />
											<div>{warningMessage}</div>
										</div>
									</div>
								</div>
								<div className={cnx("container__field")}>
									<TextOptionField
										placeholder="Логин Steam"
										isLabel={false}
										key={loginItem.name}
										option={loginItem}
										value={(formState[loginItem.name] as string) ?? ""}
										isComment={false}
										onChange={(name, value) =>
											setFormState((prev) => ({ ...prev, [name]: value }))
										}
									/>
									<div>
										<div className={cnx("container__warning")}>
											<img src="/iconsFolder/common/faq.svg" />
											<div style={{ textDecoration: "underline" }}>
												Как узнать логин Steam
											</div>
										</div>
									</div>
								</div>
								<div className={cnx("container__item")}>
									<ProductPayComm product={product} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={cnx("main__box", "box", "_desktop")}>
			{isOpenModal && (
				<div className={cnx("modalBcgr")}>
					<div className={cnx("modalCon")} ref={refDesc}>
						<button
							className={cnx("modalCon__close")}
							onClick={() => setIsOpenModal(false)}
						>
							<img
								className={cnx("modalCon__arrow")}
								src="/iconsFolder/common/close.svg"
								alt="Закрыть"
							/>
						</button>
						<h2>Как узнать логин Steam?</h2>
						<img
							className={cnx("modalCon__image")}
							src="/iconsFolder/common/checklogin.png"
							alt=""
						/>
						<p>
							Ваш логин — это имя, под которым вы входите в Steam.{" "}
							<span>Не путайте его с ником в профиле или e-mail!</span>
						</p>
						<div className={cnx("modalCon__linkblock")}>
							Как узнать свой логин можно{" "}
							<a href="https://store.steampowered.com/account/" target="_blank">
								по ссылке
							</a>{" "}
							или:
							<ol>
								<li>Откройте клиент Steam.</li>
								<li>
									В разделе настроек вашего профиля откройте раздел
									“Безопасность”.
								</li>
							</ol>
						</div>
						<div className={cnx("modalCon__warn")}>
							<div className={cnx("modalCon__warn__top")}>
								<img src="/iconsFolder/common/warn.svg" alt="" />
								<div>Проверьте перед оплатой!</div>
							</div>
							<div>
								Если указать e-mail или ник, пополнение может не зачислиться, а
								возврат средств будет невозможен.
							</div>
						</div>
					</div>
				</div>
			)}
			<img
				className={cnx("box__img")}
				src={imagePreviewSrc || ""}
				alt={product.platform_name || "Platform"}
			/>
			<div className={cnx("box__main")}>
				<div className={cnx("box__top")}>
					<div className={cnx("box__top-block")}>
						{/* SVG иконка */}
						<svg
							width="8"
							height="13"
							viewBox="0 0 8 13"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2.84266 7.3729L2.38269 7.10733C1.16294 6.40311 0.553072 6.051 0.528428 5.50384C0.503784 4.95667 1.07953 4.55116 2.23103 3.74014L5.91355 1.14649C6.64173 0.633619 7.00582 0.377185 7.15415 0.512727C7.30247 0.648269 7.07981 1.03394 6.63448 1.80527L5.02363 4.59535C4.90578 4.79947 4.84685 4.90153 4.87365 5.00156C4.90045 5.10158 5.00252 5.16051 5.20664 5.27836L5.66661 5.54393C6.88635 6.24814 7.49622 6.60025 7.52087 7.14742C7.54551 7.69459 6.96976 8.1001 5.81826 8.91112L2.13574 11.5048C1.40757 12.0176 1.04348 12.2741 0.895149 12.1385C0.746822 12.003 0.969487 11.6173 1.41482 10.846L3.02567 8.05591C3.14352 7.85179 3.20245 7.74972 3.17564 7.6497C3.14884 7.54967 3.04678 7.49075 2.84266 7.3729Z"
								fill="url(#paint0_linear_743_10719)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_743_10719"
									x1="7.76954"
									y1="-0.160715"
									x2="0.279755"
									y2="12.812"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="#FEFEFE" />
									<stop offset="1" stopColor="#DADADA" />
								</linearGradient>
							</defs>
						</svg>
						<span>{product.seller_name || ""}</span>
					</div>
					{rating ? (
						<div className={cnx("box__top-block")}>
							<img src="/iconsFolder/common/star.svg" alt="Star" />
							<span>{rating.toFixed(1)}</span>
						</div>
					) : (
						<></>
					)}
					<div className={cnx("pr__type")}>
						<span>{product.type_name}</span>
					</div>
				</div>
				<b className={cnx("box__title")}>{removeEmojis(product.name)}</b>
				<div className={cnx("box__actions")}>
					<div>
						<div className={cnx("container")}>
							<div className={cnx("container__item")}>
								<div className={cnx("container__text")}></div>
								<div className={cnx("container__field")}>
									<InputField
										value={inputPayValue}
										onChange={handlePayChange}
										onBlur={handlePayBlur}
										placeholder="Получу"
										id="valueIWillPay"
									/>
									<SelectCustom
										value={valueIWillPayS.toString()}
										options={course.map((v) => ({
											value: v.value.toString(),
											label: v.label.toString(),
										}))}
										onChange={(val) => resultCourse(Number(val))}
									/>
									<div>
										<div className={cnx("container__warning")}>
											<img src="/iconsFolder/common/faq.svg" />
											<div>{warningMessage}</div>
										</div>
									</div>
								</div>
							</div>
							<div className={cnx("container__field")}>
								<TextOptionField
									placeholder="Логин Steam"
									isLabel={false}
									key={loginItem.name}
									option={loginItem}
									value={(formState[loginItem.name] as string) ?? ""}
									isComment={false}
									onChange={(name, value) =>
										setFormState((prev) => ({ ...prev, [name]: value }))
									}
								/>
								<div>
									<div className={cnx("container__warning")}>
										<img src="/iconsFolder/common/faq.svg" />
										<div
											style={{ textDecoration: "underline" }}
											onClick={() => setIsOpenModal(true)}
										>
											Как узнать логин Steam
										</div>
									</div>
								</div>
							</div>
							<div className={cnx("container__item")}>
								<ProductPayComm product={product} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
