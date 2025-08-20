import { BrowserRouter, Routes, Route } from "react-router";
import "./scss/global.scss";

import Footer from "./widgets/footer";
import Header from "./widgets/header";
import Home from "./pages/home";
import ProductPage from "./pages/product";
import CatalogPage from "./pages/catalog";
import MobileNavigation from "./components/mobile-navigation";
import Navigation from "./pages/navigation";
import { usePreventZoom } from "./hooks/usePreventZoom";
import { SellerPage } from "./pages/seller";
import { SeacrchProvider } from "./context";
import { useCheckSecure } from "./hooks/useCheckSecure";
import { SecurePage } from "./pages/secure";
import DownloadBanner from "./widgets/downloadBanner";
import NotFoundPage from "./pages/not_found";
import TextPage from "./pages/textPage";

const DEV_UNLOCK_CODE = "533529";
const STORAGE_KEY = "secureAccessToken";

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

function App() {
	usePreventZoom();

	const { isStopSite } = useCheckSecure();

	if (isStopSite === 1 && !isTokenValid()) {
		return <SecurePage />;
	}

	return (
		<BrowserRouter>
			<SeacrchProvider>
				<div className="wrapper">
					<Header />
					<DownloadBanner />
					<main className="main">
						<Routes>
							<Route path="*" element={<NotFoundPage />} />
							<Route path="/" element={<Home />} />
							<Route path="/nav" element={<Navigation />} />
							<Route path="/product" element={<ProductPage />} />
							<Route path="/catalog" element={<CatalogPage />} />
							<Route path="/sellers/:id" element={<SellerPage />} />
							<Route path="/catalog/product/:id" element={<ProductPage />} />

							{/* Типовые странички */}
							<Route path="/rules" element={<TextPage />} />
							<Route path="/support" element={<TextPage />} />
							<Route path="/customer_oferta" element={<TextPage />} />
							<Route path="/seller_offerta" element={<TextPage />} />
							<Route path="/privacy" element={<TextPage />} />
						</Routes>
					</main>
					<MobileNavigation />
					<Footer />

					<div className="bg-elements">
						<div></div>
						<div></div>
					</div>
				</div>
			</SeacrchProvider>
		</BrowserRouter>
	);
}

export default App;
