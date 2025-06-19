import styles from "./index.module.scss";
import classNames from "classnames/bind";

import { InputHTMLAttributes } from "react";

const cnx = classNames.bind(styles);

interface IRadio extends InputHTMLAttributes<HTMLInputElement> {
  caption: string;
  className?: string;
}
export function Radio({ className, caption, ...atributes }: IRadio) {
  return (
    <label className={cnx("radio")}>
      <input {...atributes} type="radio" />
      <div className={cnx("radio__checkmark")}></div>
      <span className={cnx("radio__caption")}>{caption}</span>
    </label>
  );
}
export default Radio;
