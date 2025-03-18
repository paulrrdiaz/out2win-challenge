"use client";

import DataTable from "@/components/shared/DataTable";
import DataTableSkeleton from "@/components/shared/DataTable/Skeleton";
import usePagination from "@/hooks/usePagination";
import useSorting from "@/hooks/useSorting";
import { useGetProducts } from "@/services/products";
import React from "react";
import { columns } from "./columns";

const ProductTable = () => {
	const { page, perPage } = usePagination();
	const { sorting } = useSorting();
	const { data, isLoading } = useGetProducts({ page, perPage, sorting });

	if (isLoading) {
		return (
			<DataTableSkeleton
				columnCount={6}
				searchableColumnCount={1}
				filterableColumnCount={2}
				cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem", "8rem"]}
				shrinkZero
			/>
		);
	}

	return (
		<DataTable
			data={data?.products ?? []}
			columns={columns}
			total={data?.total ?? 0}
		/>
	);
};

export default ProductTable;
