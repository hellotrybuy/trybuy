import ProductInfoCard from "../../widgets/info-card";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

export function ProductParams() {
  return (
    <ProductInfoCard title="Характеристики" className={cnx("params")}>
      <div className={cnx("params__inner")}>
        <div className={cnx("params__block")}>
          <strong className={cnx("params__title")}>Системные требования</strong>
          <div className={cnx("params__main", "main")}>
            <div className={cnx("main__row")}>
              <div className={cnx("main__label")}>ОС</div>
              <div className={cnx("main__value")}>
                <ul>
                  <li>Microsoft Windows</li>
                  <li>• macOS</li>
                </ul>
              </div>
            </div>
            <div className={cnx("main__row")}>
              <div className={cnx("main__label")}>Размер</div>
              <div className={cnx("main__value")}>345 МБ</div>
            </div>
            <div className={cnx("main__row")}>
              <div className={cnx("main__label")}>Процессор</div>
              <div className={cnx("main__value")}>
                Intel(R) Core (TM) i5 8th Generation
              </div>
            </div>
            <div className={cnx("main__row")}>
              <div className={cnx("main__label")}>Память</div>
              <div className={cnx("main__value")}>4 GB RAM</div>
            </div>
            <div className={cnx("main__row")}>
              <div className={cnx("main__label")}>Графика</div>
              <div className={cnx("main__value")}>
                Intel(R) Integrated Graphics
              </div>
            </div>
            <div className={cnx("main__row")}>
              <div className={cnx("main__label")}>Можно играть на</div>
              <div className={cnx("main__value")}>
                <ul>
                  <li>Xbox One</li>
                  <li>• Xbox Series XS</li>
                </ul>
              </div>
            </div>
            <div className={cnx("main__row")}>
              <div className={cnx("main__label")}>Возможности игры</div>
              <div className={cnx("main__value")}>
                <ul>
                  <li>Один игрок</li>
                  <li>• Интеллектуальная доставка</li>
                  <li>• Достижения</li>
                  <li>• Облачное хранилище</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={cnx("params__block")}>
          <strong className={cnx("params__title")}>ЯЗЫКИ</strong>
          <div className={cnx("params__main", "main")}>
            <div className={cnx("main__row")}>
              <div className={cnx("main__label")}>English</div>
              <div className={cnx("main__value")}>
                <span className={cnx("_grey", "_padding")}>
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.66657 6.66657L3.99993 3.99993M3.99993 3.99993L1.33325 1.33325M3.99993 3.99993L6.6666 1.33325M3.99993 3.99993L1.33325 6.6666"
                      stroke="white"
                      stroke-opacity="0.5"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>{" "}
                  озвучка
                </span>
                <span>
                  <svg
                    width="9"
                    height="7"
                    viewBox="0 0 9 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 3.50001L3.3335 6L8 1"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>{" "}
                  текст
                </span>
              </div>
            </div>
            <div className={cnx("main__row")}>
              <div className={cnx("main__label")}>Русский</div>
              <div className={cnx("main__value")}>
                <span className={cnx("_grey", "_padding")}>
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.66657 6.66657L3.99993 3.99993M3.99993 3.99993L1.33325 1.33325M3.99993 3.99993L6.6666 1.33325M3.99993 3.99993L1.33325 6.6666"
                      stroke="white"
                      stroke-opacity="0.5"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>{" "}
                  озвучка
                </span>
                <span>
                  <svg
                    width="9"
                    height="7"
                    viewBox="0 0 9 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 3.50001L3.3335 6L8 1"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>{" "}
                  текст
                </span>
              </div>
            </div>
            <div className={cnx("main__row")}>
              <div className={cnx("main__label")}>Deutsch</div>
              <div className={cnx("main__value")}>
                <span className={cnx("_grey", "_padding")}>
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.66657 6.66657L3.99993 3.99993M3.99993 3.99993L1.33325 1.33325M3.99993 3.99993L6.6666 1.33325M3.99993 3.99993L1.33325 6.6666"
                      stroke="white"
                      stroke-opacity="0.5"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>{" "}
                  озвучка
                </span>
                <span>
                  <svg
                    width="9"
                    height="7"
                    viewBox="0 0 9 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 3.50001L3.3335 6L8 1"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>{" "}
                  текст
                </span>
              </div>
            </div>
            <div className={cnx("main__row")}>
              <div className={cnx("main__label")}>中文(简体)</div>
              <div className={cnx("main__value")}>
                <span className={cnx("_grey", "_padding")}>
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.66657 6.66657L3.99993 3.99993M3.99993 3.99993L1.33325 1.33325M3.99993 3.99993L6.6666 1.33325M3.99993 3.99993L1.33325 6.6666"
                      stroke="white"
                      stroke-opacity="0.5"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>{" "}
                  озвучка
                </span>
                <span>
                  <svg
                    width="9"
                    height="7"
                    viewBox="0 0 9 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 3.50001L3.3335 6L8 1"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>{" "}
                  текст
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cnx("bg-green")}></div>
    </ProductInfoCard>
  );
}
export default ProductParams;
