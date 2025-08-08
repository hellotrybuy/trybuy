import { FC, useEffect, useRef, useState } from "react";
import { useCheckSecure } from "../../hooks/useCheckSecure";
import styles from "./secure.module.scss";
import classNames from "classnames/bind";
import { useIsMobile } from "../../hooks/useIsMobile";

const cn = classNames.bind(styles);

const DEV_UNLOCK_CODE = "533529";
const STORAGE_KEY = "secureAccessToken";
const EXPIRES_HOURS = 2;
const CODE_LENGTH = 6;

const isTokenValid = () => {
	const tokenData = localStorage.getItem(STORAGE_KEY);
	if (!tokenData) return false;

	try {
		const { code, expiresAt } = JSON.parse(tokenData);
		if (code !== DEV_UNLOCK_CODE) return false;
		return Date.now() < expiresAt;
	} catch {
		return false;
	}
};

export const SecurePage: FC = () => {
	const { isStopSite, loading } = useCheckSecure();
	const [authorized, setAuthorized] = useState(false);
	const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
	const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

	useEffect(() => {
		if (isTokenValid()) {
			setAuthorized(true);
		}
	}, []);

	const focusNext = (index: number) => {
		if (index < CODE_LENGTH - 1) {
			inputsRef.current[index + 1]?.focus();
		}
	};

	const focusPrev = (index: number) => {
		if (index > 0) {
			inputsRef.current[index - 1]?.focus();
		}
	};

	const handleSubmit = (fullCode: string) => {
		if (fullCode === DEV_UNLOCK_CODE) {
			const expiresAt = Date.now() + EXPIRES_HOURS * 60 * 60 * 1000;
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({ code: fullCode, expiresAt }),
			);
			setAuthorized(true);
			window.location.reload();
		} else {
			alert("Неверный код");
			setCode(Array(CODE_LENGTH).fill(""));
			inputsRef.current[0]?.focus();
		}
	};

	const handleChange = (value: string, index: number) => {
		if (!/^[0-9]?$/.test(value)) return;

		const newCode = [...code];
		newCode[index] = value;
		setCode(newCode);

		if (value && index < CODE_LENGTH - 1) {
			focusNext(index);
		}

		const fullCode = newCode.join("");
		if (fullCode.length === CODE_LENGTH && !newCode.includes("")) {
			handleSubmit(fullCode);
		}
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number,
	) => {
		if (e.key === "Backspace") {
			if (!code[index] && index > 0) {
				focusPrev(index);
			}
		}
	};

	const { isMobile } = useIsMobile();

	if (loading) return null;
	if (isStopSite !== 1 || authorized) return null;

	if (isMobile) {
		<div className={cn("secure-wrapper")}>
			<div className={cn("secure-box")}>
				<img
					className={cn("logo")}
					src="/iconsFolder/common/logo.svg"
					alt="TryBuy"
				/>
				<h1 className={cn("title")}>Мы временно на техническом обслуживании</h1>
				<div className={cn("description")}>
					<p>Наша площадка сейчас проходит плановое обновление.</p>
					<p>
						Мы улучшаем платформу, чтобы сделать покупки и продажи ещё удобнее,
						быстрее и безопаснее. Благодарим за понимание и терпение 🙏
					</p>
					<p>Скоро снова увидимся!</p>
				</div>

				<div className={cn("field")}>
					<div>Вход для администраторов</div>
					<div className={cn("inp")}>
						{code.map((char, idx) => (
							<input
								key={idx}
								type="text"
								inputMode="numeric"
								maxLength={1}
								value={char}
								onChange={(e) => handleChange(e.target.value, idx)}
								onKeyDown={(e) => handleKeyDown(e, idx)}
								ref={(el) => {
									inputsRef.current[idx] = el;
								}}
								className={cn("code-input")}
								autoComplete="off"
								spellCheck={false}
							/>
						))}
					</div>
				</div>
			</div>
		</div>;
	}

	return (
		<div className={cn("secure-wrapper")}>
			<div className={cn("secure-box")}>
				<img
					className={cn("logo")}
					src="/iconsFolder/common/logo.svg"
					alt="TryBuy"
				/>
				<h1 className={cn("title")}>Мы временно на техническом обслуживании</h1>
				<div className={cn("description")}>
					<p>Наша площадка сейчас проходит плановое обновление.</p>
					<p>
						Мы улучшаем платформу, чтобы сделать покупки и продажи ещё удобнее,
						быстрее и безопаснее. Благодарим за понимание и терпение 🙏
					</p>
					<p>Скоро снова увидимся!</p>
				</div>
			</div>

			<div className={cn("field")}>
				<div>Вход для администраторов</div>
				<div className={cn("inp")}>
					{code.map((char, idx) => (
						<input
							key={idx}
							type="text"
							inputMode="numeric"
							maxLength={1}
							value={char}
							onChange={(e) => handleChange(e.target.value, idx)}
							onKeyDown={(e) => handleKeyDown(e, idx)}
							ref={(el) => {
								inputsRef.current[idx] = el;
							}}
							className={cn("code-input")}
							autoComplete="off"
							spellCheck={false}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
