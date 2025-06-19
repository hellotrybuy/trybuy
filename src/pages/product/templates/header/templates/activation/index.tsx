import styles from "./index.module.scss";
import classNames from "classnames/bind";

import Radio from "../../../../../../components/radio";

const cnx = classNames.bind(styles);

export function ProductActivation() {
  return (
    <div className={cnx("activation")}>
      <div className={cnx("activation__inner")}>
        <div className={cnx("activation__block")}>
          <h3 className={cnx("activation__title")}>Сумма</h3>
          <div className={cnx("activation__options", "_row")}>
            <Radio caption="10 VP" name="amount" />
            <Radio caption="25 VP" name="amount" />
            <Radio caption="50 VP" name="amount" />
            <Radio caption="75 VP" name="amount" />
            <Radio caption="100 VP" name="amount" />
            <Radio caption="200 VP" name="amount" />
            <Radio caption="500 VP" name="amount" />
            <Radio caption="10 VP" name="amount" />
            <Radio caption="25 VP" name="amount" />
            <Radio caption="50 VP" name="amount" />
            <Radio caption="75 VP" name="amount" />
            <Radio caption="100 VP" name="amount" />
            <Radio caption="200 VP" name="amount" />
            <Radio caption="500 VP" name="amount" />
          </div>
        </div>
        <div className={cnx("activation__block")}>
          <h3 className={cnx("activation__title")}>Оставить чаевые</h3>
          <div className={cnx("activation__options")}>
            <Radio caption="Без чаевых" name="donate" />
            <Radio caption="20 RUB" name="donate" />
            <Radio caption="50 RUB" name="donate" />
            <Radio caption="70 RUB" name="donate" />
            <Radio caption="90 RUB" name="donate" />
            <Radio caption="100 RUB" name="donate" />
            <Radio caption="20 RUB" name="donate" />
            <Radio caption="50 RUB" name="donate" />
            <Radio caption="70 RUB" name="donate" />
            <Radio caption="90 RUB" name="donate" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductActivation;
