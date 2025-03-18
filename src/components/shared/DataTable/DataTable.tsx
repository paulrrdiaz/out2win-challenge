"use client";

import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import usePagination from "@/hooks/usePagination";
import useSorting from "@/hooks/useSorting";
import {
	type ColumnDef,
	type ColumnSort,
	type PaginationState,
	type SortingState,
	type Updater,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useCallback, useMemo } from "react";
import DataTablePagination from "./Pagination";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	total?: number;
	skip?: number;
	limit?: number;
	handleOnPaginationChange?: (pagination: PaginationState) => void;
}

function DataTable<TData, TValue>(
	props: Readonly<DataTableProps<TData, TValue>>,
) {
	const { columns, data, total } = props;
	const { page, perPage, setPage, setPerPage } = usePagination();
	const { sorting, setSorting } = useSorting();
	const pagination: PaginationState = useMemo(
		() => ({
			pageIndex: page - 1,
			pageSize: perPage,
		}),
		[page, perPage],
	);

	const onPaginationChange = useCallback(
		(updaterOrValue: Updater<PaginationState>) => {
			if (typeof updaterOrValue === "function") {
				const newPagination = updaterOrValue(pagination);

				setPage(newPagination.pageIndex + 1);
				setPerPage(newPagination.pageSize);
			} else {
				setPage(updaterOrValue.pageIndex + 1);
				setPerPage(updaterOrValue.pageSize);
			}
		},
		[pagination, setPage, setPerPage],
	);

	const onSortingChange = useCallback(
		(updaterOrValue: Updater<SortingState>) => {
			if (typeof updaterOrValue === "function") {
				const newSorting = updaterOrValue(sorting as unknown as ColumnSort[]);
				setSorting(JSON.stringify(newSorting) as unknown as string);
			} else {
				setSorting(updaterOrValue as unknown as string);
			}
		},
		[setSorting, sorting],
	);

	const table = useReactTable({
		data,
		columns,
		onSortingChange,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		manualSorting: true,
		rowCount: total,
		onPaginationChange,
		state: {
			sorting: sorting as unknown as ColumnSort[],
			pagination,
		},
	});

	return (
		<div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: (() => {
														const canSort = header.column.getCanSort();
														const sortingIcon = {
															asc: <ArrowUp />,
															desc: <ArrowDown />,
														}[header.column.getIsSorted() as string] ?? (
															<ArrowUpDown className="ml-0 h-4 w-4" />
														);

														return canSort ? (
															<Button
																variant="ghost"
																className={
																	canSort ? "cursor-pointer select-none" : ""
																}
																onClick={header.column.getToggleSortingHandler()}
															>
																{flexRender(
																	header.column.columnDef.header,
																	header.getContext(),
																)}
																{sortingIcon}
															</Button>
														) : (
															flexRender(
																header.column.columnDef.header,
																header.getContext(),
															)
														);
													})()}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<DataTablePagination table={table} />
		</div>
	);
}

export default DataTable;
