import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { CATALOG_SEARCH } from "../constants/searchParams";

interface SearchContext {
	searchInput: string;
	setSearchInput: (it: string) => void;
}

const SearchContexnt = createContext<SearchContext | undefined>(undefined);

export function SeacrchProvider({ children }: { children: React.ReactNode }) {
	const [searchParams] = useSearchParams();

	const searchFromUrl = searchParams.get(CATALOG_SEARCH);

	const [searchInput, setSearchInput] = useState(searchFromUrl ?? "");

	useEffect(() => {
		const searchFromUrl = searchParams.get(CATALOG_SEARCH) ?? "";
		setSearchInput(searchFromUrl);
	}, [searchParams]);

	return (
		<SearchContexnt.Provider value={{ searchInput, setSearchInput }}>
			{children}
		</SearchContexnt.Provider>
	);
}

export function useSearchContext() {
	const ctx = useContext(SearchContexnt);
	if (!ctx) {
		throw new Error("usePrice must be used within a SeacrchProvider");
	}
	return ctx;
}
