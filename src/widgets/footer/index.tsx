import { Link } from "react-router";
import Button from "../../components/button";
import { CONTAINER } from "../../constants/classnames";
import { useMainScreenCategories } from "../../hooks/useMainScreenCategories";
import { Routes } from "../../routes";
import { CONTACT_INFO, LEGAL_LINKS, SOCIAL_LINKS, USER_LINKS } from "./data";

import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

const goHistory = () => {
	window.open("https://join.try-buy.ru/", "_blank");
};

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
				<span>(c) TRYBUY 2025</span>
				{LEGAL_LINKS.map((link) => (
					<a key={link.label} href={link.href}>
						{link.label}
					</a>
				))}
			</div>
			<Button className={cnx("copyright__btn")} onClick={goHistory}>
				Стать продавцом
			</Button>
		</div>
	);
}

export function Footer() {
	const { categories } = useMainScreenCategories();

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
							{categories &&
								categories.map((cat) => (
									<li key={cat.id}>
										<Link to={cat.collections_url}>{cat.collections_name}</Link>
									</li>
								))}
						</ul>
					</div>

					<div className={cnx("footer__column")}>
						<h3 className={cnx("footer__title")}>Пользователям</h3>
						<ul>
							{USER_LINKS.map((link) => (
								<li key={link.label}>
									<Link to={link.href}>{link.label}</Link>
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
										<a
											href="https://t.me/sup_trybuy"
											aria-label="Поддержка в Telegram"
										>
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
