import styles from "./index.module.scss";
import classNames from "classnames/bind";
import HomeMain from "./templates/main";
import { CONTAINER } from "../../constants/classnames";
import HomeGenries from "./templates/genries";
import HomeLeaders from "./templates/leaders";

const cnx = classNames.bind(styles);

export function Home() {
  return (
    <div className={cnx("home")}>
      <div className={CONTAINER}>
        <div className={cnx("home__inner")}>
          <HomeMain />
          <HomeGenries />
          <HomeLeaders />
        </div>
      </div>
    </div>
  );
}
export default Home;
