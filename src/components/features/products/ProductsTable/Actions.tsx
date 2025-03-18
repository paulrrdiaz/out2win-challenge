import { Button } from "@/components/ui/button";
import type { Product } from "@/schemas/product";
import { useCartStore } from "@/store";
import { ExternalLink, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

const Actions = (props: Product) => {
	const { id } = props;
	const addItem = useCartStore((state) => state.addItem);
	const quantity = useCartStore((state) => state.items[id]?.quantity ?? 0);

	return (
		<div className="space-x-2">
			<Button size="sm" asChild>
				<Link href={`/products/${id}`}>
					<ExternalLink />
				</Link>
			</Button>

			<Button size="sm" onClick={() => addItem(props)} className="relative">
				<ShoppingCart className="h-4 w-4" />

				<span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-stone-500 text-xs text-primary-foreground">
					{quantity ?? 0}
				</span>
			</Button>
		</div>
	);
};

export default Actions;
