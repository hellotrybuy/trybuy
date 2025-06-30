import Button from "../../../../components/button";
import { usePrice } from "../../context";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

export function ProductPay() {
	const { totalPrice } = usePrice();

	return (
		<div className={cnx("pay")}>
			<div className={cnx("pay__price")}>
				<b>{totalPrice} ₽</b>
			</div>
			<a href="#">У меня есть промокод</a>
			<Button className={cnx("pay__btn")} size="large">
				Купить
			</Button>
		</div>
	);
}
export default ProductPay;
