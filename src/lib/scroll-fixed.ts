const DIFFERENCE = 1600;

export function scrollFixed(onVisible: () => void, onHidden: () => void): void {
  const bodyHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  const y = window.scrollY;

  if (bodyHeight - y < DIFFERENCE) {
    return onHidden();
  } else {
    return onVisible();
  }
}
