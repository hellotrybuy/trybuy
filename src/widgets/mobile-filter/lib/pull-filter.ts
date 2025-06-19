import { unlockBody } from "../../../lib/unlock-body";

export const LEFT_EDGE = 10;
export const TRANSITION_DISABLE_TIMEOUT = 400;
export const DEFAULT_FILTER_POSITION = "100%";
export const DEFAULT_BTN_POSITION = "0px";

interface IMoveFilter {
	xStart: number;
	e: TouchEvent;
	btnEl: HTMLElement;
	filterEl: HTMLElement;
	setLastPosition: (x: number, time: number) => void;
}

export function moveFilter({
	xStart,
	e,
	btnEl,
	filterEl,
	setLastPosition,
}: IMoveFilter) {
	const clientWidth = window.innerWidth;
	const currentX = e.targetTouches[0].clientX;
	let translateX = currentX - xStart;

	translateX = Math.min(0, Math.max(-clientWidth + LEFT_EDGE, translateX));

	btnEl.style.transition = "";
	filterEl.style.transition = "";

	btnEl.style.transform = `translateX(${translateX}px)`;
	filterEl.style.transform = `translateX(${translateX}px)`;

	setLastPosition(translateX, performance.now());
}

interface IFinishFilterMovement {
	e: TouchEvent;
	btnEl: HTMLElement;
	filterEl: HTMLElement;
	lastPosition: { x: number; time: number } | null;
	prevPosition: { x: number; time: number } | null;
	setCurrentTranslateX: (x: number) => void;
	setIsOpen: (open: boolean) => void;
}

export function finishFilterMovement({
	btnEl,
	filterEl,
	lastPosition,
	prevPosition,
	setCurrentTranslateX,
	setIsOpen,
	isOpen,
}: IFinishFilterMovement & { isOpen: boolean }) {
	const clientWidth = window.innerWidth;
	const fullOpenPosition = -(clientWidth - LEFT_EDGE);
	const halfwayPosition = fullOpenPosition / 2;

	btnEl.style.transition = "transform 0.4s ease-out";
	filterEl.style.transition = "transform 0.4s ease-out";

	const currentTranslateX = lastPosition?.x ?? 0;

	let velocity = 0;
	if (lastPosition && prevPosition) {
		const deltaX = lastPosition.x - prevPosition.x;
		const deltaTime = (lastPosition.time - prevPosition.time) / 1000;
		velocity = deltaTime > 0 ? deltaX / deltaTime : 0;
	}

	const velocityThreshold = 300;
	const velocityAbs = Math.abs(velocity);

	if (isOpen && velocity > 0) {
		btnEl.style.transform = "translateX(0)";
		filterEl.style.transform = "translateX(0)";
		setCurrentTranslateX(0);
		setIsOpen(false);
	} else {
		let shouldClose = false;

		if (velocityAbs > velocityThreshold) {
			shouldClose = velocity > 0;
		} else {
			shouldClose = currentTranslateX > halfwayPosition;
		}

		if (shouldClose) {
			btnEl.style.transform = "translateX(0)";
			filterEl.style.transform = "translateX(0)";
			setCurrentTranslateX(0);
			setIsOpen(false);
		} else {
			btnEl.style.transform = `translateX(${fullOpenPosition}px)`;
			filterEl.style.transform = `translateX(${fullOpenPosition}px)`;
			setCurrentTranslateX(fullOpenPosition);
			setIsOpen(true);
		}
	}

	unlockBody();

	setTimeout(() => {
		btnEl.style.transition = "";
		filterEl.style.transition = "";
	}, TRANSITION_DISABLE_TIMEOUT);
}
