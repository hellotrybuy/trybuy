import { createContext, useContext, useState } from "react";

interface PriceContextType {
	totalPrice: number;
	setTotalPrice: (price: number) => void;
}

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export function PriceProvider({ children }: { children: React.ReactNode }) {
	const [totalPrice, setTotalPrice] = useState(0);

	return (
		<PriceContext.Provider value={{ totalPrice, setTotalPrice }}>
			{children}
		</PriceContext.Provider>
	);
}

export function usePrice() {
	const ctx = useContext(PriceContext);
	if (!ctx) {
		throw new Error("usePrice must be used within a PriceProvider");
	}
	return ctx;
}
