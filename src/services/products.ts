import { catchError } from "@/lib/error";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { GetProductsResponse } from "../schemas/product";
import http from "./http";

type GetProductsOptions = {
	page: number;
	perPage: number;
	sorting: string;
};

export const getProducts = async (options: GetProductsOptions) => {
	try {
		const { page, perPage, sorting } = options;
		const { id: sortBy = "id", desc = false } =
			(sorting as unknown as { id: string; desc: boolean }[])[0] ?? {};

		const response = await http.get<GetProductsResponse>(
			`/products?limit=${perPage}&skip=${(page - 1) * perPage}&sortBy=${sortBy}&order=${desc ? "desc" : "asc"}`,
		);

		return response.data;
	} catch (error) {
		catchError(error);
	}
};

export const useGetProducts = (options: GetProductsOptions) => {
	const { page, perPage, sorting } = options;

	return useQuery({
		queryKey: ["products", page, perPage, sorting],
		queryFn: () => getProducts(options),
		placeholderData: keepPreviousData,
	});
};

export const getProductById = async (id: string) => {
	try {
		const response = await http.get(`/products/${id}`);
		console.log("response", response.data);
		return response.data;
	} catch (error) {
		catchError(error);
	}
};

export const useGetProductById = (id: string) => {
	return useQuery({
		queryKey: ["products", id],
		queryFn: () => getProductById(id),
	});
};
