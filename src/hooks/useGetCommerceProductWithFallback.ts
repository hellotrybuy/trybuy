import { useEffect, useState } from "react";
import { useGetCommerceProduct, ProductDataCAT } from "./useGetCommerceProduct";

export function useGetCommerceProductWithFallback(
	categoryId: string,
	secondCategoryId: string | null,
): { product: ProductDataCAT | null; loading: boolean; error: Error | null } {
	const {
		products: productsSecond,
		loading: loadingSecond,
		error: errorSecond,
	} = useGetCommerceProduct(secondCategoryId ?? "");

	const {
		products: productsMain,
		loading: loadingMain,
		error: errorMain,
	} = useGetCommerceProduct(categoryId);

	const [product, setProduct] = useState<ProductDataCAT | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		// Пока идет загрузка — показываем loading
		if (loadingSecond || loadingMain) {
			setLoading(true);
			return;
		}

		// Если есть ошибки — можно отдать первую ошибку (или комбинировать по логике)
		if (errorSecond) {
			setError(errorSecond);
		} else if (errorMain) {
			setError(errorMain);
		} else {
			setError(null);
		}

		// Логика fallback:
		// Сначала смотрим есть ли продукты по secondCategory
		if (secondCategoryId && productsSecond && productsSecond.length > 0) {
			setProduct(productsSecond[0]);
		} else if (productsMain && productsMain.length > 0) {
			// fallback на основную категорию
			setProduct(productsMain[0]);
		} else {
			setProduct(null);
		}

		setLoading(false);
	}, [
		loadingSecond,
		loadingMain,
		productsSecond,
		productsMain,
		errorSecond,
		errorMain,
		secondCategoryId,
	]);

	return { product, loading, error };
}
