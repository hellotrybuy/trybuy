import Button from "../../../../components/button";
import { Rating } from "../../../../components/raitng";
import { ReviewsCount } from "../../../../components/reviewsCount";
import { SquareBlock } from "../squareBlock";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
const cnx = classNames.bind(styles);

export function SellerHeader() {
	return (
		<>
			<div className={cnx("wrapper")}>
				<div className={cnx("sellerHeader")}>
					<div className={cnx("sellerHeader__left")}>
						<div className={cnx("sellerHeader__mainInfo")}>
							<div className={cnx("sellerHeader__mainInfo__logo")}>
								<img src="/iconsFolder/seller/Shop.svg" />
							</div>
							<div className={cnx("sellerHeader__mainInfo__text")}>
								<h2 className={cnx("sellerHeader__mainInfo__name")}>
									BAZAAR-STORE
								</h2>
								<div
									className={cnx("sellerHeader__mainInfo__raitingContainer")}
								>
									<Rating rating="5.0" />
									<ReviewsCount count="10.000" />
								</div>
							</div>
						</div>
						<div className={cnx("sellerHeader__buttonChat")}>
							<Button size="medium" white>
								Чат с продавцом
							</Button>
						</div>
					</div>
					<div className={cnx("sellerHeader__left")}>
						<SquareBlock name="Продаж">
							<div className={cnx("sellerHeader__left__sales")}>333 764</div>
						</SquareBlock>
						<SquareBlock name="Возвратов">
							<div className={cnx("sellerHeader__left__sales")}>14</div>
						</SquareBlock>
						<SquareBlock name="Контакты">
							<div className={cnx("sellerHeader__left__contacts")}>
								<div>
									<img src="/iconsFolder/seller/Mail.svg" />
								</div>
								<div>
									<img src="/iconsFolder/seller/Telegram.svg" />
								</div>
							</div>
						</SquareBlock>
					</div>
				</div>

				{/* mobile */}
				<div className={cnx("sellerHeaderMobile")}>
					<div className={cnx("sellerHeaderMobile__mainInfo")}>
						<div className={cnx("sellerHeader__mainInfo__logo")}>
							<img src="/iconsFolder/seller/Shop.svg" />
						</div>
						<div className={cnx("sellerHeader__mainInfo__text")}>
							<h2 className={cnx("sellerHeader__mainInfo__name")}>
								BAZAAR-STORE
							</h2>
							<div className={cnx("sellerHeader__mainInfo__raitingContainer")}>
								<Rating rating="5.0" />
								<ReviewsCount count="10.000" />
							</div>
						</div>
					</div>

					<div className={cnx("sellerHeaderMobile__sales")}>
						<SquareBlock name="Продаж" isFullWidth>
							<div className={cnx("sellerHeader__left__sales")}>333 764</div>
						</SquareBlock>
						<SquareBlock name="Возвратов" isFullWidth>
							<div className={cnx("sellerHeader__left__sales")}>14</div>
						</SquareBlock>
					</div>

					<div className={cnx("sellerHeader__buttonChat")}>
						<Button
							size="medium"
							white
							className={cnx("sellerHeaderMobile__buttonChat")}
						>
							Чат с продавцом
						</Button>
					</div>

					<SquareBlock name="Контакты" isSpaceBetweenMobile>
						<div className={cnx("sellerHeader__left__contacts")}>
							<div>
								<img src="/iconsFolder/seller/Mail.svg" />
							</div>
							<div>
								<img src="/iconsFolder/seller/Telegram.svg" />
							</div>
						</div>
					</SquareBlock>
				</div>
				<div className={cnx("sellerHeader__footer")}>
					<div className={cnx("sellerHeader__footer__item")}>
						<div>Товары этого продавца</div>
						<div className={cnx("container-count")}>82</div>
					</div>
				</div>
			</div>
		</>
	);
}
