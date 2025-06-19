import { useEffect } from "react";

export function usePreventZoom() {
  useEffect(() => {
    document.addEventListener("touchstart", (e) => {
      e.preventDefault();
    });
  });
}
