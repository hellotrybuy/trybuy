import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

type DeviceType = "iphone" | "android" | "desktop" | null;

export default function DownloadBanner() {
	const [deviceType, setDeviceType] = useState<DeviceType>(null);
	const [isVisible, setIsVisible] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isPWA, setIsPWA] = useState(false);

	useEffect(() => {
		const ua = navigator.userAgent || navigator.vendor;

		if (/iPhone/i.test(ua)) {
			setDeviceType("iphone");
		} else if (/Android/i.test(ua)) {
			setDeviceType("android");
		} else {
			setDeviceType("desktop");
		}

		const standaloneIos = (window.navigator as any).standalone === true;
		const standaloneAndroid = window.matchMedia(
			"(display-mode: standalone)",
		).matches;
		setIsPWA(standaloneIos || standaloneAndroid);
	}, []);

	const handleCloseBanner = () => {
		setIsVisible(false);
	};

	const handleBannerClick = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

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

			{/* Модальное окно */}
			{isModalOpen && (
				<div className={cnx("modalOverlay")} onClick={handleCloseModal}>
					{deviceType == "iphone" && (
						<div
							className={cnx("modalContent")}
							onClick={(e) => e.stopPropagation()}
						>
							<h2>
								Добавьте web-приложение на экран вашего iPhone для быстрого
								доступа
							</h2>
							<div className={cnx("ios__instr")}>
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
					{deviceType == "android" && (
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
									<img
										className={cnx("container__arrow")}
										src="/iconsFolder/common/apk.svg"
										alt="Закрыть"
									/>
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
