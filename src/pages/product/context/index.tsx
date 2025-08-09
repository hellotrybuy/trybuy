import React, { createContext, useContext, useState } from "react";
import { OptionItem } from "../../../hooks/types";

interface PriceContextType {
	totalPrice: number;
	setTotalPrice: (price: number) => void;

	cnt: number;
	setCnt: (cnt: number) => void;

	form: Record<string, string | boolean | Record<string, boolean>>;
	setForm: React.Dispatch<
		React.SetStateAction<
			Record<string, string | boolean | Record<string, boolean>>
		>
	>;

	invalidFields: Record<string, boolean>;
	formSubmitted: boolean;
	setFormSubmitted: (value: boolean) => void;

	validateForm: (options: OptionItem[]) => boolean;
}

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export function PriceProvider({ children }: { children: React.ReactNode }) {
	const [totalPrice, setTotalPrice] = useState(0);
	const [cnt, setCnt] = useState(1);
	const [form, setForm] = useState({});
	const [invalidFields, setInvalidFields] = useState<Record<string, boolean>>(
		{},
	);
	const [formSubmitted, setFormSubmitted] = useState(false);

	const validateForm = (options: OptionItem[]) => {
		if (!formSubmitted) {
			setInvalidFields({});
			return false;
		}

		const newInvalids: Record<string, boolean> = {};

		options.forEach((opt) => {
			const value = form[opt.name];

			if (opt.required === 1) {
				if (opt.type === "text" && (!value || !String(value).trim())) {
					newInvalids[opt.name] = true;
				} else if (opt.type === "radio" && (!value || value === "")) {
					newInvalids[opt.name] = true;
				} else if (opt.type === "checkbox") {
					if (typeof value === "boolean" && !value) {
						newInvalids[opt.name] = true;
					} else if (typeof value === "object") {
						const checkedCount = Object.values(value).filter(Boolean).length;
						if (checkedCount === 0) {
							newInvalids[opt.name] = true;
						}
					}
				}
			}
		});

		setInvalidFields(newInvalids);

		return Object.keys(newInvalids).length === 0;
	};

	return (
		<PriceContext.Provider
			value={{
				totalPrice,
				setTotalPrice,
				cnt,
				setCnt,
				form,
				setForm,
				invalidFields,
				formSubmitted,
				setFormSubmitted,
				validateForm,
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
