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

function App() {
	usePreventZoom();
	return (
		<BrowserRouter>
			<SeacrchProvider>
				<div className="wrapper">
					<Header />
					<main className="main">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/nav" element={<Navigation />} />
							<Route path="/product" element={<ProductPage />} />
							<Route path="/catalog" element={<CatalogPage />} />
							<Route path="/seller" element={<SellerPage />} />
							<Route path="/product/:id" element={<ProductPage />} />
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
			</SeacrchProvider>
		</BrowserRouter>
	);
}

export default App;
