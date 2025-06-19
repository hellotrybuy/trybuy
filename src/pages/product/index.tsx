import styles from "./index.module.scss";
import classNames from "classnames/bind";

import { useEffect, useState } from "react";

import { CONTAINER } from "../../constants/classnames";
import ProductHeader from "./templates/header";
import Breadcrumbs from "../../components/breadcrumbs";
import ProductPay from "./templates/pay";
import ProductDescription from "./templates/description";
import ProductParams from "./templates/params";
import ProductExtraInfo from "./templates/extra-info";
import ProductRewies from "./templates/reviews";
import Button from "../../components/button";
import OtherProducts from "./templates/other-products";

const cnx = classNames.bind(styles);

let bodyHeight = window.innerHeight;

export function ProductPage() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const computeScroll = () => {
      const y = window.scrollY;

      if (bodyHeight * 2.5 - y < 100) {
        setIsHidden(true);
      } else if (isHidden == true) {
        setIsHidden(false);
      }
    };
    window.addEventListener("scroll", computeScroll);

    () => {
      window.removeEventListener("scroll", computeScroll);
    };
  }, [isHidden]);
  return (
    <div className={cnx("product")}>
      <Breadcrumbs />
      <div className={CONTAINER}>
        <div className={cnx("product__inner")}>
          <div className={cnx("product__main")}>
            <ProductHeader />
            <ProductPay />
            <ProductDescription />
            <ProductParams />
            <ProductExtraInfo />
            <ProductRewies />
          </div>
          <aside className={cnx("product__aside", "aside")}>
            <img className={cnx("aside__img")} src="mock/product.png" alt="" />
            <div className={cnx("aside__block", "seller")}>
              <span className={cnx("seller__caption")}>продавец</span>
              <div className={cnx("seller__top")}>
                <strong>Palmdale Shop</strong>
                <div className={cnx("seller__star")}>
                  <img src="icons/common/star.svg" alt="Оценка" />
                  <span>5,0</span>
                </div>
              </div>
              <p className={cnx("seller__info")}>
                Если вы уже приобрели товар — напишите продавцу на
                сайтеoplata.infoна странице заказа.
                <br />
                <br />
                Аттестат продавца
              </p>
              <Button className={cnx("seller__btn")} white>
                Написать продавцу
              </Button>
            </div>
            <div className={cnx("aside__block", "payment")}>
              <strong className={cnx("payment__title")}>Способы оплаты</strong>
              <div className={cnx("payment__grid")}>
                <img src="/mock/apple-pay.png" alt="Apple pay" />
                <img src="/mock/unionpay.png" alt="Union pay" />
                <img src="/mock/wepay.png" alt="Wepay" />
                <img src="/mock/apple-pay.png" alt="Apple pay" />
                <img src="/mock/unionpay.png" alt="Union pay" />
                <img src="/mock/wepay.png" alt="Wepay" />
                <img src="/mock/apple-pay.png" alt="Apple pay" />
                <img src="/mock/unionpay.png" alt="Union pay" />
                <img src="/mock/wepay.png" alt="Wepay" />
                <img src="/mock/apple-pay.png" alt="Apple pay" />
                <img src="/mock/unionpay.png" alt="Union pay" />
                <img src="/mock/wepay.png" alt="Wepay" />
                <img src="/mock/apple-pay.png" alt="Apple pay" />
                <img src="/mock/unionpay.png" alt="Union pay" />
                <img src="/mock/wepay.png" alt="Wepay" />
              </div>
            </div>
          </aside>
        </div>
        <OtherProducts />
      </div>

      {/* Mobile but button */}
      <div className={cnx("product__buy", isHidden && "_hidden")}>
        <Button className={cnx("product__buy-btn")}>499 ₽ КУПИТЬ</Button>
      </div>
    </div>
  );
}
export default ProductPage;
