import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	server: {
		proxy: {
			"/api": {
				target: "https://demotest.sbserver.ru",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			workbox: {
				globPatterns: ["**/*{html,css,js,ico,png,svg}"],
			},
			manifest: {
				name: "TryBuy",
				short_name: "TryBuy",
				start_url: "/",
				theme_color: "#1b1a21",
				background_color: "#1b1a21",
				orientation: "any",
				display: "standalone",
				lang: "ru-RU",
				icons: [
					{
						src: "/icons/pwa/icon_192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any maskable",
					},
					{
						src: "/icons/pwa/icon_512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable",
					},
				],
			},
		}),
	],
});
