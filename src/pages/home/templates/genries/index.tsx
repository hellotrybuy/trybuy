import styles from "./index.module.scss";
import classNames from "classnames/bind";
const cnx = classNames.bind(styles);

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";

import Title from "../../../../components/title";
import SwiperControl from "../../../../components/swiper-control";

export function HomeGenries() {
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const [, setSwiper] = useState<SwiperType>();

  return (
    <section className={cnx("genries")}>
      <div className={cnx("genries__inner")}>
        <div className={cnx("genries__top")}>
          <Title size="large" className={cnx("genries__title", "_desktop")}>
            Игровые жанры
          </Title>
          <SwiperControl prevBtn={prevBtnRef} nextBtn={nextBtnRef} />
        </div>
        {/* Mobile title */}
        <div className={cnx("genries__title", "_mobile")}>Жанры</div>

        {/* Swiper */}
        <div className={cnx("genries__swiper")}>
          <Swiper
            modules={[Navigation, FreeMode]}
            spaceBetween={20}
            slidesPerView={4}
            loop
            navigation={{
              prevEl: prevBtnRef.current,
              nextEl: nextBtnRef.current,
            }}
            grabCursor
            onInit={(swiper) => setSwiper(swiper)}
          >
            <SwiperSlide className={cnx("slide")}>
              <div
                className={cnx("genre")}
                style={{
                  background:
                    "radial-gradient(farthest-corner at 0 0, #222630, #28344a)",
                }}
              >
                <b className={cnx("genre__title")}>Симуляторы</b>
                <img
                  className={cnx("_left")}
                  src="mock/genries/1.png"
                  alt=""
                  style={{ width: 335, height: 162 }}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className={cnx("slide")}>
              <div
                className={cnx("genre")}
                style={{
                  background:
                    "radial-gradient(farthest-corner at 0 0, #222630, #284a48)",
                }}
              >
                <b className={cnx("genre__title")}>Шутеры</b>
                <img
                  src="mock/genries/2.png"
                  alt=""
                  style={{
                    width: 236,
                    height: 192,
                    transform: "rotateY(180deg)",
                  }}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className={cnx("slide")}>
              <div
                className={cnx("genre")}
                style={{
                  background:
                    "radial-gradient(farthest-corner at 0 0, #222630, #4a4728)",
                }}
              >
                <b className={cnx("genre__title")}>Soulslike</b>
                <img
                  src="mock/genries/3.png"
                  alt=""
                  style={{
                    width: 252,
                    height: 205,
                    transform: "rotateY(180deg)",
                  }}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className={cnx("slide")}>
              <div
                className={cnx("genre")}
                style={{
                  background:
                    "radial-gradient(farthest-corner at 0 0, #222630, #4a282a)",
                }}
              >
                <b className={cnx("genre__title")}>Инди и кооп</b>
                <img
                  src="mock/genries/4.png"
                  alt=""
                  style={{
                    width: 171,
                    height: 192,
                    transform: "rotateY(180deg)",
                  }}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className={cnx("slide")}>
              <div
                className={cnx("genre")}
                style={{
                  background:
                    "radial-gradient(farthest-corner at 0 0, #222630, #28344a)",
                }}
              >
                <b className={cnx("genre__title")}>Симуляторы</b>
                <img
                  className={cnx("_left")}
                  src="mock/genries/1.png"
                  alt=""
                  style={{ width: 335, height: 162 }}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className={cnx("slide")}>
              <div
                className={cnx("genre")}
                style={{
                  background:
                    "radial-gradient(farthest-corner at 0 0, #222630, #284a48)",
                }}
              >
                <b className={cnx("genre__title")}>Шутеры</b>
                <img
                  src="mock/genries/2.png"
                  alt=""
                  style={{
                    width: 236,
                    height: 192,
                    transform: "rotateY(180deg)",
                  }}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className={cnx("slide")}>
              <div
                className={cnx("genre")}
                style={{
                  background:
                    "radial-gradient(farthest-corner at 0 0, #222630, #4a4728)",
                }}
              >
                <b className={cnx("genre__title")}>Soulslike</b>
                <img
                  src="mock/genries/3.png"
                  alt=""
                  style={{
                    width: 252,
                    height: 205,
                    transform: "rotateY(180deg)",
                  }}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className={cnx("slide")}>
              <div
                className={cnx("genre")}
                style={{
                  background:
                    "radial-gradient(farthest-corner at 0 0, #222630, #4a282a)",
                }}
              >
                <b className={cnx("genre__title")}>Инди и кооп</b>
                <img
                  src="mock/genries/4.png"
                  alt=""
                  style={{
                    width: 171,
                    height: 192,
                    transform: "rotateY(180deg)",
                  }}
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className={cnx("genries__grid")}>
          <div
            className={cnx("genre")}
            style={{
              background:
                "radial-gradient(farthest-corner at 0 0, #222630, #28344a)",
            }}
          >
            <b className={cnx("genre__title")}>Симуляторы</b>
            <img
              className={cnx("_left")}
              src="mock/genries/1.png"
              alt=""
              style={{ width: 335, height: 162 }}
            />
          </div>
          <div
            className={cnx("genre")}
            style={{
              background:
                "radial-gradient(farthest-corner at 0 0, #222630, #284a48)",
            }}
          >
            <b className={cnx("genre__title")}>Шутеры</b>
            <img
              src="mock/genries/2.png"
              alt=""
              style={{
                width: 236,
                height: 192,
                transform: "rotateY(180deg)",
              }}
            />
          </div>
          <div
            className={cnx("genre")}
            style={{
              background:
                "radial-gradient(farthest-corner at 0 0, #222630, #4a4728)",
            }}
          >
            <b className={cnx("genre__title")}>Soulslike</b>
            <img
              src="mock/genries/3.png"
              alt=""
              style={{
                width: 252,
                height: 205,
                transform: "rotateY(180deg)",
              }}
            />
          </div>
          <div
            className={cnx("genre")}
            style={{
              background:
                "radial-gradient(farthest-corner at 0 0, #222630, #4a282a)",
            }}
          >
            <b className={cnx("genre__title")}>Инди и кооп</b>
            <img
              src="mock/genries/4.png"
              alt=""
              style={{
                width: 171,
                height: 192,
                transform: "rotateY(180deg)",
              }}
            />
          </div>
          <div
            className={cnx("genre")}
            style={{
              background:
                "radial-gradient(farthest-corner at 0 0, #222630, #28344a)",
            }}
          >
            <b className={cnx("genre__title")}>Симуляторы</b>
            <img
              className={cnx("_left")}
              src="mock/genries/1.png"
              alt=""
              style={{ width: 335, height: 162 }}
            />
          </div>
          <div
            className={cnx("genre")}
            style={{
              background:
                "radial-gradient(farthest-corner at 0 0, #222630, #284a48)",
            }}
          >
            <b className={cnx("genre__title")}>Шутеры</b>
            <img
              src="mock/genries/2.png"
              alt=""
              style={{
                width: 236,
                height: 192,
                transform: "rotateY(180deg)",
              }}
            />
          </div>
          <div
            className={cnx("genre")}
            style={{
              background:
                "radial-gradient(farthest-corner at 0 0, #222630, #4a4728)",
            }}
          >
            <b className={cnx("genre__title")}>Soulslike</b>
            <img
              src="mock/genries/3.png"
              alt=""
              style={{
                width: 252,
                height: 205,
                transform: "rotateY(180deg)",
              }}
            />
          </div>
          <div
            className={cnx("genre")}
            style={{
              background:
                "radial-gradient(farthest-corner at 0 0, #222630, #4a282a)",
            }}
          >
            <b className={cnx("genre__title")}>Инди и кооп</b>
            <img
              src="mock/genries/4.png"
              alt=""
              style={{
                width: 171,
                height: 192,
                transform: "rotateY(180deg)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeGenries;
