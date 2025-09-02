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
		title: "Игровые товары",
		items: [
			{
				name: "Пополнение Steam",
				href: "/catalog?main_category=151&search=&second_category=399",
			},
			{
				name: "Пополнение PSN",
				href: "/catalog?main_category=151&search=&second_category=426",
			},
			{
				name: "XBOX game pass",
				href: "/catalog?main_category=151&search=&second_category=401",
			},
			{ name: "Игровые ценности", href: "/catalog?main_category=367&search=" },
		],
	},
	{
		title: "Сервисы и соцсети",
		items: [
			{
				name: "Музыка",
				href: "/catalog?main_category=366&search=&second_category=382",
			},
			{
				name: "Для креаторов",
				href: "/catalog?main_category=366&search=&second_category=384",
			},
			{
				name: "Видеосервисы",
				href: "/catalog?main_category=366&search=&second_category=385",
			},
			{
				name: "Фото/видео стоки",
				href: "/catalog?main_category=366&search=&second_category=386",
			},
			{
				name: "Нейросети",
				href: "/catalog?main_category=366&search=&second_category=381",
			},
		],
	},
	{
		title: "Нейросети",
		items: [
			{
				name: "ChatGPT",
				href: "/catalog?content_type=&main_category=381&second_category=421",
			},
			{
				name: "Midjourney",
				href: "/catalog?content_type=&main_category=381&second_category=419",
			},
			{
				name: "Perplexity",
				href: "/catalog?content_type=&main_category=381&second_category=420",
			},
			{
				name: "Cursor",
				href: "/catalog?content_type=activation&main_category=381&second_category=511",
			},
		],
	},
	{
		title: "Програмное обеспечение",
		items: [
			{
				name: "Операционные системы",
				href: "/catalog?main_category=152&search=&second_category=369",
			},
			{
				name: "Офисные утилиты",
				href: "/catalog?main_category=152&search=&second_category=378",
			},
			{
				name: "Антивирусы",
				href: "/catalog?main_category=152&search=&second_category=370",
			},
			{
				name: "Фото/видео редакторы",
				href: "/catalog?main_category=152&search=&second_category=379",
			},
			{
				name: "Разработчикам",
				href: "/catalog?main_category=152&search=&second_category=380",
			},
		],
	},
];
