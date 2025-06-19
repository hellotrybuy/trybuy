import ProductInfoCard from "../../widgets/info-card";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

export function ProductDescription() {
  return (
    <ProductInfoCard title="Описание товара" className={cnx("description")}>
      <p className={cnx("description__info")}>
        Горячая Линия Домашней Безопасности - это аналоговый хоррор про
        телефонного оператора, где вы отвечаете на вопросы звонящих о том, что
        находится в их доме. Ознакомьтесь с обширным каталогом распространенных
        вредителей и бытовых опасностей и сделайте все возможное, чтобы стать
        экспертом в области домашней безопасности. Вы будете нести
        ответственность за то, что произойдет. Новый хоррор-эксперимент от Ника
        Лайвза, создателя NiGHT SIGNAL и A Wonderful Day For Fishing. ВКЛЮЧЕН
        БОНУС DLC «Горячая линия домашней безопасности: Сезонный работник» На
        дворе 1996 год, и до Рождества осталось всего четыре дня. Ребекку,
        сезонного сотрудника ГЛДБ, вернули, чтобы она помогала отвечать на
        звонки по телефону доверия в это напряженное (и смертельно опасное)
        время года. Во время праздников появляется много новых странных бытовых
        опасностей, и некоторые из них могут означать конец всего, что находится
        над и под землей. Добро пожаловать обратно в ГЛДБ. Мы все рассчитываем
        на тебя, Ребекка.
      </p>
      <div className={cnx("description__bottom", "bottom")}>
        <div className={cnx("bottom__block")}>
          <strong className={cnx("bottom__block-title")}>ИЗДАТЕЛЬ</strong>
          <b className={cnx("bottom__block-value")}>Torture Star Video</b>
        </div>
        <div className={cnx("bottom__block")}>
          <strong className={cnx("bottom__block-title")}>Разработчик</strong>
          <b className={cnx("bottom__block-value")}>
            Night Signal Entertainment
          </b>
        </div>
        <div className={cnx("bottom__block")}>
          <strong className={cnx("bottom__block-title")}>Дата выпуска</strong>
          <b className={cnx("bottom__block-value")}>20.09.2024</b>
        </div>
      </div>
    </ProductInfoCard>
  );
}
export default ProductDescription;
