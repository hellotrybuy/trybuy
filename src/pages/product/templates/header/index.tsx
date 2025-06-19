import { useSearchParams } from "react-router";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

import { PayType } from "../../../../types";
import { PAY_TYPE } from "../../../../constants/searchParams";
import ProductReplenishment from "./templates/replenishment";
import ProductActivation from "./templates/activation";

const cnx = classNames.bind(styles);

export function ProductHeader() {
  const [searchParams] = useSearchParams();
  const searchPayType = searchParams.get(PAY_TYPE) as PayType;

  const getCaptionText = () => {
    switch (searchPayType) {
      case "offline":
        return "Оффлайн аккаунт";
      case "activation":
        return "Активация";
      case "replenishment":
        return "Пополнение";

      default:
        return "Оффлайн аккаунт";
    }
  };

  const captionClasses = cnx({
    top__caption: true,
    _offline: searchPayType === "offline",
    _activation: searchPayType === "activation",
    _replenishment: searchPayType === "replenishment",
  });

  return (
    <div className={cnx("header")}>
      <div className={cnx("header__top", "top")}>
        <div className={captionClasses}>{getCaptionText()}</div>
        <div className={cnx("top__info")}>
          <div className={cnx("top__info-block")}>
            <div className={cnx("top__info-reviews")}>
              <div className={cnx("top__info-star")}>
                <img src="icons/common/star.svg" alt="" />
                <span>5,0</span>
              </div>
              <span>123 отзыва</span>
            </div>
          </div>
          <div className={cnx("top__info-block")}>200 продано</div>
        </div>
      </div>
      <div className={cnx("header__main", "main")}>
        <div className={cnx("main")}>
          <div className={cnx("main__top")}>
            <h1 className={cnx("main__title")}>
              Купить Оффлайн аккаунт Warhammer 40,000: Space Marine 2 - ULTRA
              EDITION STEAM
            </h1>
            <img src="mock/product.png" alt="" />
          </div>
          <div className={cnx("main__bottom")}>
            {!searchPayType && (
              <div className={cnx("main__offline-text")}>
                <ul>
                  <li>Симулятор</li>
                  <li>• Новинка</li>
                  <li>• Поддерживаемые языки 10</li>
                  <li>• Не требует интернет подключения</li>
                  <li>• Гарантия 30 дней</li>
                </ul>
              </div>
            )}
            {searchPayType === "offline" && (
              <div className={cnx("main__offline-text")}>
                <ul>
                  <li>Симулятор</li>
                  <li>• Новинка</li>
                  <li>• Поддерживаемые языки 10</li>
                  <li>• Не требует интернет подключения</li>
                  <li>• Гарантия 30 дней</li>
                </ul>
              </div>
            )}
            {searchPayType === "activation" && <ProductActivation />}
            {searchPayType === "replenishment" && <ProductReplenishment />}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductHeader;
