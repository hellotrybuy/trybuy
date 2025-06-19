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

function App() {
	usePreventZoom();
	return (
		<BrowserRouter>
			<div className="wrapper">
				<Header />
				<main className="main">
					<Routes>
						<Route path="/" element={<Navigation />} />
						<Route path="/home" element={<Home />} />
						<Route path="/product" element={<ProductPage />} />
						<Route path="/catalog" element={<CatalogPage />} />
						<Route path="/seller" element={<SellerPage />} />
					</Routes>
				</main>
				<MobileNavigation />
				<Footer />

				{/* Bg */}
				<div className="bg-elements">
					<div></div>
					<div></div>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
