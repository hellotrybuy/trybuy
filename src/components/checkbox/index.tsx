import styles from "./index.module.scss";
import classNames from "classnames/bind";

import { InputHTMLAttributes } from "react";

const cnx = classNames.bind(styles);

interface ICheckbox extends InputHTMLAttributes<HTMLInputElement> {
  caption: string;
  className?: string;
}
export function Checkbox({ className, caption, ...atributes }: ICheckbox) {
  return (
    <label className={cnx("checkbox")}>
      <input {...atributes} type="checkbox" />
      <div className={cnx("checkbox__checkmark")}></div>
      <span className={cnx("checkbox__caption")}>{caption}</span>
    </label>
  );
}
export default Checkbox;
