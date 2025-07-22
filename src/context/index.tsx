import { createContext, useContext, useState } from "react";

interface SearchContext {
	searchInput: string;
	setSearchInput: (it: string) => void;
}

const SearchContexnt = createContext<SearchContext | undefined>(undefined);

export function SeacrchProvider({ children }: { children: React.ReactNode }) {
	const [searchInput, setSearchInput] = useState("");

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
