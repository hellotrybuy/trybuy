import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cnx = classNames.bind(styles);

const GradientSpinner = () => {
	return (
		<div className={cnx("spinnerWrapper")}>
			<div className={cnx("spinner")}>
				<div className={cnx("spinnerRing")}></div>
				<img
					className={cnx("centerImage")}
					src="/iconsFolder/common/logo-short.svg"
					alt="Loading"
				/>
			</div>
		</div>
	);
};

export default GradientSpinner;
