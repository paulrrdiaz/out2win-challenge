"use client";

import { Button } from "@/components/ui/button";
import type { Product } from "@/schemas/product";
import type { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Actions from "./Actions";

export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: "thumbnail",
		header: "",
		cell: (props) => (
			<Image
				src={props.row.original.thumbnail}
				alt={props.row.original.title}
				width={320}
				height={320}
			/>
		),
		enableSorting: false,
	},
	{
		accessorKey: "details",
		header: "Details",
		cell: (props) => (
			<div>
				<h3 className="font-mono">
					{[props.row.original.category, props.row.original.brand].join(" / ")}
				</h3>
				<Button variant="link" className="text-primary px-0" asChild>
					<Link href={`/products/${props.row.original.id}`} prefetch>
						<h2 className="font-bold text-lg">{props.row.original.title}</h2>
					</Link>
				</Button>
				<p className="whitespace-break-spaces">
					{props.row.original.description}
				</p>
			</div>
		),
		enableSorting: false,
	},
	{
		accessorKey: "price",
		header: "Price",
		cell: ({ row }) => (
			<div className="text-right font-medium">${row.original.price}</div>
		),
	},
	{
		accessorKey: "rating",
		header: "Rating",
		cell: ({ row }) => (
			<div className="flex items-center justify-end">
				<span className="mr-1">{row.original.rating}</span>
				<Star className="h-4 w-4 fill-primary text-primary" />
			</div>
		),
	},
	{
		accessorKey: "id",
		header: "Actions",
		cell: (props) => <Actions {...props.row.original} />,
		enableSorting: false,
	},
];
