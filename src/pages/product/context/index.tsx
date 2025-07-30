import { createContext, useContext, useState } from "react";

interface PriceContextType {
	totalPrice: number;
	setTotalPrice: (price: number) => void;
	cnt: number;
	setCnt: (price: number) => void;
	isValidForm: boolean;
	setIsValidForm: (is: boolean) => void;
	form: Record<string, string | boolean | Record<string, boolean>>;
	setForm: React.Dispatch<
		React.SetStateAction<
			Record<string, string | boolean | Record<string, boolean>>
		>
	>;
}

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export function PriceProvider({ children }: { children: React.ReactNode }) {
	const [totalPrice, setTotalPrice] = useState(0);
	const [form, setForm] = useState({});
	const [cnt, setCnt] = useState(1);
	const [isValidForm, setIsValidForm] = useState(false);

	return (
		<PriceContext.Provider
			value={{
				totalPrice,
				setTotalPrice,
				form,
				setForm,
				cnt,
				setCnt,
				isValidForm,
				setIsValidForm,
			}}
		>
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
