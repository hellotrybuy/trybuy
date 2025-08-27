import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.getRegistrations().then((registrations) => {
		for (const registration of registrations) {
			registration.update(); // ⚡ проверяет новые версии SW
		}
	});
}

const rootEl = document.getElementById("root");
if (!location.pathname.startsWith("/admin") && rootEl) {
	createRoot(rootEl).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
