import { FC } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { CONTAINER } from "../../constants/classnames";
import Button from "../../components/button";
import { Link } from "react-router";

const cnx = classNames.bind(styles);

export const NotFoundPage: FC = () => {
	return (
		<div className={cnx("page")}>
			<div className={CONTAINER}>
				<div className={cnx("container")}>
					<img
						className={cnx("gradient")}
						src="/iconsFolder/common/404.svg"
						alt="Loading"
					/>
					<div className={cnx("content")}>
						<h1 className={cnx("h1")}>404</h1>
						<h2 className={cnx("h2")}>Упс! Страница ушла в отпуск</h2>
						<div className={cnx("text")}>
							Похоже, вы попали в цифровую пустошь. Такой страницы здесь нет —
							или она хорошо маскируется.
						</div>
						<div className={cnx("text")}>
							Совет: если вы продавец — проверьте, не удалили ли вы свой товар.
							Если покупатель — не волнуйтесь, тут есть много других ништяков =)
						</div>
						<Link to={"/"} className={cnx("button")}>
							На главную
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
