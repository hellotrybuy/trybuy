import { CONTAINER } from "../../constants/classnames";
import { Routes } from "../../routes";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

export function Navigation() {
  return (
    <div className={CONTAINER}>
      <ul className={cnx("navigation")}>
        <li>
          <a href={Routes.HOME}>Главная</a>
        </li>
        <li>
          <a href={Routes.CATALOG}>Каталог (все)</a>
        </li>
        <li>
          <a href={`${Routes.CATALOG}?category=games`}>Каталог (игры)</a>
        </li>
        <li>
          <a href={`${Routes.PRODUCT}?payType=activation`}>
            Продукт (активация)
          </a>
        </li>
        <li>
          <a href={`${Routes.PRODUCT}?payType=replenishment`}>
            Продукт (пополнение)
          </a>
        </li>
        <li>
          <a href={`${Routes.PRODUCT}?payType=offline`}>Продукт (оффлейн)</a>
        </li>
      </ul>
    </div>
  );
}
export default Navigation;
