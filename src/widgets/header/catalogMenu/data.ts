export interface CategoryItem {
	name: string;
	href: string;
}

export interface Category {
	title: string;
	items: CategoryItem[];
}

export const catalogData: Category[] = [
	{
		title: "Игры",
		items: [
			{ name: "Ключи", href: "#" },
			{ name: "Аккаунты", href: "#" },
			{ name: "Мобильный гейминг", href: "#" },
			{ name: "Игровая валюта", href: "#" },
			{ name: "Боевой пропуск", href: "#" },
		],
	},
	{
		title: "Пополнение баланса",
		items: [
			{ name: "Steam Wallet", href: "#" },
			{ name: "Playstaion Wallet", href: "#" },
			{ name: "Xbox", href: "#" },
			{ name: "Nintendo eShop", href: "#" },
			{ name: "Discord Nitro", href: "#" },
		],
	},
	{
		title: "Подписки",
		items: [
			{ name: "Playstaion Network", href: "#" },
			{ name: "Xbox Game Pass", href: "#" },
			{ name: "Discord Nitro", href: "#" },
			{ name: "Spotify", href: "#" },
		],
	},
	{
		title: "Програмное обеспечение",
		items: [
			{ name: "Microsoft", href: "#" },
			{ name: "Антивирусы", href: "#" },
			{ name: "Adobe", href: "#" },
			{ name: "Midjourney", href: "#" },
			{ name: "Chat GPT", href: "#" },
		],
	},
];
