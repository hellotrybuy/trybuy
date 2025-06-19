import Title from "../../../../components/title";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

interface IProductInfoCard extends React.PropsWithChildren {
  title: string;
  className?: string;
}

export function ProductInfoCard({
  title,
  className,
  children,
}: IProductInfoCard) {
  return (
    <div className={cnx("card", className)}>
      <Title className={cnx("card__title")}>{title}</Title>
      {children}
    </div>
  );
}
export default ProductInfoCard;
