import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { CATALOG_SEARCH, CATALOG_SEARCH_ANON } from "../constants/searchParams";

interface SearchContext {
	searchInput: string;
	setSearchInput: (it: string) => void;
}

const SearchContexnt = createContext<SearchContext | undefined>(undefined);

export function SeacrchProvider({ children }: { children: React.ReactNode }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchFromUrl = searchParams.get(CATALOG_SEARCH);
	const searchFromUrlAnon = searchParams.get(CATALOG_SEARCH_ANON);

	const v = useMemo(() => {
		if (searchFromUrlAnon && searchFromUrl == searchFromUrlAnon) {
			return searchFromUrlAnon ?? "";
		}
		return searchFromUrl ?? "";
	}, [searchFromUrl, searchFromUrlAnon]);

	const [searchInput, setSearchInput] = useState(v);

	useEffect(() => {
		if (searchFromUrl && searchFromUrl != "") {
			const updated = new URLSearchParams(searchParams);
			updated.delete(CATALOG_SEARCH_ANON);
			setSearchParams(updated);
		}
		setSearchInput(v);
	}, [v, searchParams, searchFromUrl, setSearchParams]);

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
