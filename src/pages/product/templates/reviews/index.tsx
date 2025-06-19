import { useState } from "react";
import Button from "../../../../components/button";
import Title from "../../../../components/title";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

export function ProductRewies() {
  const [IsFilterDown, setIsFilterDown] = useState(false);

  return (
    <div className={cnx("reviews")}>
      <div className={cnx("reviews__top")}>
        <Title>Отзывы (123)</Title>
        <div className={cnx("reviews__star")}>
          <img src="icons/common/star.svg" alt="Оценка" />
          <span>5,0</span>
        </div>
        <button
          onClick={() => {
            setIsFilterDown(!IsFilterDown);
          }}
          className={cnx("reviews__filter", IsFilterDown && "_down")}
        >
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.75 6L6 0.75L11.25 6"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>сначала положительные</span>
        </button>
      </div>
      <div className={cnx("reviews__body")}>
        <div className={cnx("reviews__review", "review")}>
          <img src="icons/common/like.svg" alt="Лайк" />
          <div className={cnx("review__info")}>
            <span className={cnx("review__name")}>Иван</span>
            <time className={cnx("review__time")} dateTime="2001-05-15 19:00">
              20/09/2024
            </time>
            <p className={cnx("review__comment")}>
              Все прошло успешно и быстро в течении 20 минут все было готово!
            </p>
          </div>
        </div>
        <div className={cnx("reviews__review", "review")}>
          <img src="icons/common/like.svg" alt="Лайк" />
          <div className={cnx("review__info")}>
            <span className={cnx("review__name")}>Иван</span>
            <time className={cnx("review__time")} dateTime="2001-05-15 19:00">
              20/09/2024
            </time>
            <p className={cnx("review__comment")}>
              Все прошло успешно и быстро в течении 20 минут все было готово!
            </p>
          </div>
        </div>
        <div className={cnx("reviews__review", "review")}>
          <img src="icons/common/like.svg" alt="Лайк" />
          <div className={cnx("review__info")}>
            <span className={cnx("review__name")}>Иван</span>
            <time className={cnx("review__time")} dateTime="2001-05-15 19:00">
              20/09/2024
            </time>
            <p className={cnx("review__comment")}>
              Все прошло успешно и быстро в течении 20 минут все было готово!
            </p>
          </div>
        </div>
        <div className={cnx("reviews__review", "review")}>
          <img src="icons/common/like.svg" alt="Лайк" />
          <div className={cnx("review__info")}>
            <span className={cnx("review__name")}>Иван</span>
            <time className={cnx("review__time")} dateTime="2001-05-15 19:00">
              20/09/2024
            </time>
            <p className={cnx("review__comment")}>
              Все прошло успешно и быстро в течении 20 минут все было готово!
            </p>
          </div>
        </div>
        <div className={cnx("reviews__review", "review")}>
          <img src="icons/common/like.svg" alt="Лайк" />
          <div className={cnx("review__info")}>
            <span className={cnx("review__name")}>Иван</span>
            <time className={cnx("review__time")} dateTime="2001-05-15 19:00">
              20/09/2024
            </time>
            <p className={cnx("review__comment")}>
              Все прошло успешно и быстро в течении 20 минут все было готово!
            </p>
          </div>
        </div>
        <div className={cnx("reviews__review", "review")}>
          <img src="icons/common/like.svg" alt="Лайк" />
          <div className={cnx("review__info")}>
            <span className={cnx("review__name")}>Иван</span>
            <time className={cnx("review__time")} dateTime="2001-05-15 19:00">
              20/09/2024
            </time>
            <p className={cnx("review__comment")}>
              Все прошло успешно и быстро в течении 20 минут все было готово!
            </p>
          </div>
        </div>
      </div>
      <Button className={cnx("reviews__btn")} white>
        Загрузить ещё
      </Button>
    </div>
  );
}
export default ProductRewies;
