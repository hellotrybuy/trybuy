import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

interface ITitle extends React.PropsWithChildren {
  size?: "meduim" | "large";
  className?: string;
}

export function Title({ className, size = "meduim", children }: ITitle) {
  const titleClasses = cnx({
    title: true,
    _large: size == "large",
  });
  return <h2 className={cnx(titleClasses, className)}>{children}</h2>;
}
export default Title;
