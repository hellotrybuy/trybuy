import Button from "../../components/button";
import { CONTAINER } from "../../constants/classnames";
import { Routes } from "../../routes";
import {
	CONTACT_INFO,
	LEGAL_LINKS,
	PRODUCTS,
	SOCIAL_LINKS,
	USER_LINKS,
} from "./data";

import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

function CopyrightBlock({ isMobile = false }: { isMobile?: boolean }) {
	return (
		<div
			className={cnx(
				"footer__column",
				"copyright",
				isMobile ? "_mobile" : "_desktop",
			)}
		>
			<div className={cnx("copyright__main")}>
				<span>(c) GameMart 2024</span>
				{LEGAL_LINKS.map((link) => (
					<a key={link.label} href={link.href}>
						{link.label}
					</a>
				))}
			</div>
			<Button className={cnx("copyright__btn")}>Стать продавцом</Button>
		</div>
	);
}

export function Footer() {
	return (
		<footer className={cnx("footer")}>
			<div className={CONTAINER}>
				<div className={cnx("footer__inner")}>
					<div className={cnx("footer__column")}>
						<div className={cnx("footer__logo")}>
							<a href={Routes.HOME}>
								<img src="/iconsFolder/common/logo.svg" alt="GameMart" />
							</a>
						</div>
						<CopyrightBlock />
					</div>

					<div className={cnx("footer__column")}>
						<h3 className={cnx("footer__title")}>Продукты</h3>
						<ul>
							{PRODUCTS.map((product) => (
								<li key={product}>
									<a href="#">{product}</a>
								</li>
							))}
						</ul>
					</div>

					<div className={cnx("footer__column")}>
						<h3 className={cnx("footer__title")}>Пользователям</h3>
						<ul>
							{USER_LINKS.map((link) => (
								<li key={link.label}>
									<a href={link.href}>{link.label}</a>
								</li>
							))}
						</ul>
					</div>

					<div className={cnx("footer__column")}>
						<h3 className={cnx("footer__title")}>Контакты</h3>
						<div className={cnx("footer__contacts", "contacts")}>
							{CONTACT_INFO.map(({ label, email, hasTelegram }) => (
								<div className={cnx("contacts__block")} key={email}>
									<span>{label}</span>
									<a href={`mailto:${email}`}>{email}</a>
									{hasTelegram && (
										<a href="#" aria-label="Поддержка в Telegram">
											<img
												src="/iconsFolder/social/telegram-extended.svg"
												alt="Поддержка"
											/>
										</a>
									)}
								</div>
							))}
							<div className={cnx("contacts__block")}>
								<span>А также социалочки</span>
								<div className={cnx("contacts__socials")}>
									{SOCIAL_LINKS.map((social) => (
										<a
											key={social.alt}
											href={social.href}
											target="_blank"
											rel="noopener noreferrer"
										>
											<img src={social.src} alt={social.alt} />
										</a>
									))}
								</div>
							</div>
						</div>
					</div>

					<CopyrightBlock isMobile />
				</div>
			</div>
		</footer>
	);
}

export default Footer;
