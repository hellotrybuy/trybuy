import Button from "../../../../components/button";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

export function ProductPay() {
  return (
    <div className={cnx("pay")}>
      <div className={cnx("pay__price")}>
        <b>499 ₽</b>
      </div>
      <a href="#">У меня есть промокод</a>
      <Button className={cnx("pay__btn")} size="large">
        Купить
      </Button>
    </div>
  );
}
export default ProductPay;
