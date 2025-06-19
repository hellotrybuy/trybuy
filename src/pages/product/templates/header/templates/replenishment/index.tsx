import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

export function ProductReplenishment() {
  return (
    <div className={cnx("replenishment")}>
      <div className={cnx("replenishment__inner")}>
        <div className={cnx("replenishment__top")}>
          <div className={cnx("replenishment__block")}>
            <input type="text" placeholder="Введите сумму" />
            <span>Заплачу, ₽ </span>
          </div>
          <svg
            width="20"
            height="12"
            viewBox="0 0 20 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 6L14 1M19 6L14 11M19 6H1"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div className={cnx("replenishment__block")}>
            <input type="text" value={"124 567"} />
            <span>Получу, STEAM RUB </span>
          </div>
          <small className={cnx("replenishment__caption")}>
            Мин. сумма пополнения: 100 STEAM RUB, Макс. сумма пополнения —
            1000000 STEAM RUB
          </small>
        </div>
        <div className={cnx("replenishment__bottom")}>
          <div className={cnx("replenishment__block")}>
            <input type="text" placeholder="*Введите ваш логин STEAM" />
          </div>
          <small className={cnx("replenishment__caption")}>
            Обратите внимание, что нужен именно логин, не ник и не ссылка
          </small>
        </div>
      </div>
    </div>
  );
}
export default ProductReplenishment;
