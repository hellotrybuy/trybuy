import { FC } from "react";
import { useLocation } from "react-router";
import { useGetPages, PageData } from "../../hooks/useGetPages";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import GradientSpinner from "../../components/loader";
import { CONTAINER } from "../../constants/classnames";

const cnx = classNames.bind(styles);

export const TextPage: FC = () => {
	const location = useLocation();
	const { pages, loading, error } = useGetPages();

	if (loading)
		return (
			<div>
				<GradientSpinner />
			</div>
		);
	if (error) return <div>Ошибка: {error.message}</div>;
	if (!pages || pages.length === 0) return <div>Данные не найдены</div>;

	const page: PageData = pages[0];

	const path = location.pathname.toLowerCase();

	let contentHtml = "";

	switch (path) {
		case "/rules":
			contentHtml = page.rules;
			break;
		case "/support":
			contentHtml = page.support;
			break;
		case "/customer_oferta":
			contentHtml = page.oferta;
			break;
		case "/seller_offerta":
			contentHtml = page.oferta_1;
			break;
		case "/privacy":
			contentHtml = page.license;
			break;
		default:
			contentHtml = "<p>Страница не найдена</p>";
	}

	return (
		<div className={cnx("page")}>
			<div className={cnx(CONTAINER)}>
				<div dangerouslySetInnerHTML={{ __html: contentHtml }} />
			</div>
		</div>
	);
};

export default TextPage;
