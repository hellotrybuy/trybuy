import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

interface Props extends React.PropsWithChildren {
	name: string;
	isSpaceBetweenMobile?: boolean;
	isFullWidth?: boolean;
}

export function SquareBlock({
	name,
	children,
	isSpaceBetweenMobile = false,
	isFullWidth = false,
}: Props) {
	return (
		<div
			className={cnx("squareBlock", {
				"space-between-mobile": isSpaceBetweenMobile,
				"full-width": isFullWidth,
			})}
		>
			<div>{children}</div>
			<div
				className={cnx("squareBlock__name", {
					"space-between-mobile-name": isSpaceBetweenMobile,
				})}
			>
				{name}
			</div>
		</div>
	);
}
