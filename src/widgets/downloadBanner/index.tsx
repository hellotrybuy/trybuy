import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

type DeviceType = "iphone" | "android" | "desktop" | null;

const HIDE_BANNER_KEY = "hideDownloadBanner";
const HIDE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 дней в миллисекундах

// ✅ Надежная проверка PWA режима
function isStandaloneMode(): boolean {
	// 1. Android Chrome и десктопные PWA
	if (window.matchMedia("(display-mode: standalone)").matches) return true;

	// 2. iOS Safari PWA
	if ((window.navigator as any).standalone === true) return true;

	// 3. Дополнительная эвристика: отсутствие opener и реферера
	if (!document.referrer && !window.opener) return true;

	return false;
}

export default function DownloadBanner() {
	const [deviceType, setDeviceType] = useState<DeviceType>(null);
	const [isVisible, setIsVisible] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isPWA, setIsPWA] = useState(false);

	useEffect(() => {
		// ✅ Проверяем localStorage (скрыт ли баннер)
		const stored = localStorage.getItem(HIDE_BANNER_KEY);
		if (stored) {
			try {
				const { expiresAt } = JSON.parse(stored);
				if (Date.now() < expiresAt) {
					setIsVisible(false);
					return;
				}
			} catch (e) {
				console.warn("Ошибка парсинга localStorage:", e);
			}
		}

		// ✅ Определяем устройство
		const ua = navigator.userAgent || navigator.vendor;

		if (/iPhone/i.test(ua)) {
			setDeviceType("iphone");
		} else if (/Android/i.test(ua)) {
			setDeviceType("android");
		} else {
			setDeviceType("desktop");
		}

		// ✅ Проверяем, PWA ли это
		setIsPWA(isStandaloneMode());
	}, []);

	const handleCloseBanner = () => {
		setIsVisible(false);
		// ✅ Сохраняем дату истечения на 7 дней вперед
		localStorage.setItem(
			HIDE_BANNER_KEY,
			JSON.stringify({ expiresAt: Date.now() + HIDE_DURATION }),
		);
	};

	const handleBannerClick = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	// ✅ Если баннер не нужен — ничего не рендерим
	if (!isVisible || deviceType === "desktop" || deviceType === null || isPWA)
		return null;

	return (
		<>
			{isVisible && (
				<div
					className={cnx("banner", {
						banner_hidden: isModalOpen,
					})}
				>
					<img
						className={cnx("container__arrow")}
						src="/iconsFolder/common/logo_144x144.svg"
						alt="Оценка"
						onClick={handleBannerClick}
					/>
					<div
						className={cnx("banner__content__text")}
						onClick={handleBannerClick}
					>
						<div className={cnx("banner__content__text__tag")}>
							С приложением удобнее!
						</div>
						<div className={cnx("banner__content__text__desk")}>
							Быстрые покупки, уведомления о скидках, максимум удобства.
						</div>
					</div>
					<button className={cnx("banner__close")} onClick={handleCloseBanner}>
						<img
							className={cnx("container__arrow")}
							src="/iconsFolder/common/close.svg"
							alt="Закрыть"
						/>
					</button>
				</div>
			)}

			{/* ✅ Модальное окно */}
			{isModalOpen && (
				<div className={cnx("modalOverlay")} onClick={handleCloseModal}>
					{deviceType === "iphone" && (
						<div
							className={cnx("modalContent")}
							onClick={(e) => e.stopPropagation()}
						>
							<h2>
								Добавьте web-приложение на экран вашего iPhone для быстрого
								доступа
							</h2>
							<div className={cnx("ios__instr")}>
								{/* Шаги */}
								<div className={cnx("ios__instr__item")}>
									<div className={cnx("ios__instr__item__num")}>
										<p>1</p>
									</div>
									<div className={cnx("ios__instr__item__text")}>
										<p>В браузере Safari откройте</p>
										<div className={cnx("ios__instr__item__text__flex")}>
											<p>страницу</p>
											<a href="https://try-buy.ru/">try-buy.ru</a>
										</div>
									</div>
								</div>
								<div className={cnx("ios__instr__item")}>
									<div className={cnx("ios__instr__item__num")}>
										<p>2</p>
									</div>
									<div className={cnx("ios__instr__item__text", "flex")}>
										<p>Нажмите на кнопку</p>
										<div
											className={cnx("ios__instr__item__text__flex", "icon")}
										>
											<img src="/iconsFolder/common/shar.svg" alt="Закрыть" />
										</div>
									</div>
								</div>
								<div className={cnx("ios__instr__item")}>
									<div className={cnx("ios__instr__item__num")}>
										<p>3</p>
									</div>
									<div className={cnx("ios__instr__item__text", "flexHome")}>
										<p>Выберите</p>
										<div className={cnx("ios__instr__item__goHome")}>
											“На экран домой”
										</div>
									</div>
								</div>
							</div>
							<button
								className={cnx("banner__close")}
								onClick={handleCloseModal}
							>
								<img
									className={cnx("container__arrow")}
									src="/iconsFolder/common/close.svg"
									alt="Закрыть"
								/>
							</button>
						</div>
					)}
					{deviceType === "android" && (
						<div
							className={cnx("modalContent")}
							onClick={(e) => e.stopPropagation()}
						>
							<h2>Скачайте приложение для вашего Android смартфона</h2>
							<div>
								<div className={cnx("downTypes")}>
									<img
										className={cnx("container__arrow")}
										src="/iconsFolder/common/rustore.svg"
										alt="Закрыть"
									/>
									<a href="/files/trybuy.apk" download>
										<img
											className={cnx("container__arrow")}
											src="/iconsFolder/common/apk.svg"
											alt="Закрыть"
										/>
									</a>
								</div>
							</div>
							<button
								className={cnx("banner__close")}
								onClick={handleCloseModal}
							>
								<img
									className={cnx("container__arrow")}
									src="/iconsFolder/common/close.svg"
									alt="Закрыть"
								/>
							</button>
						</div>
					)}
				</div>
			)}
		</>
	);
}
