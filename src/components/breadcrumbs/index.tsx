import styles from "./index.module.scss";
import classNames from "classnames/bind";
import { CONTAINER } from "../../constants/classnames";

const cnx = classNames.bind(styles);

export type Crumb = {
	label: string;
	href?: string;
	isActive?: boolean;
};

interface Props {
	crumbs?: Crumb[];
}

const defaultCrumbs: Crumb[] = [
	{ label: "Главная", href: "/" },
	{ label: "Каталог", href: "/catalog" },
	{
		label:
			"Купить Оффлайн аккаунт Warhammer 40,000: Space Marine 2 - ULTRA EDITION STEAM",
		isActive: true,
	},
];

export function Breadcrumbs({ crumbs = defaultCrumbs }: Props) {
	return (
		<div className={CONTAINER}>
			<nav className={cnx("breadcrumbs")}>
				<ul>
					{crumbs.map((crumb, index) => (
						<li key={index} className={cnx({ _active: crumb.isActive })}>
							{crumb.href && !crumb.isActive ? (
								<a href={crumb.href}>
									{crumb.label}
									{index < crumbs.length - 1 && " >"}
								</a>
							) : (
								<a href={crumb.href}>{crumb.label}</a>
							)}
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}

export default Breadcrumbs;
