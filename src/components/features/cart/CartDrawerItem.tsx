import { Button } from "@/components/ui/button";
import type { CartItem } from "@/schemas/cart";
import { useCartStore } from "@/store";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";

type CartDrawerItemProps = {
	item: CartItem;
};

const CartDrawerItem = (props: CartDrawerItemProps) => {
	const { item } = props;
	const updateQuantity = useCartStore((state) => state.updateQuantity);
	const removeItem = useCartStore((state) => state.removeItem);

	return (
		<div key={item.productId} className="flex gap-3">
			<div className="relative h-16 w-16 overflow-hidden rounded-md border flex-shrink-0">
				<Image
					src={item.thumbnail || "/placeholder.svg"}
					alt={item.title}
					fill
					className="object-cover"
				/>
			</div>
			<div className="flex-1 min-w-0">
				<Link
					href={`/products/${item.productId}`}
					className="font-medium text-sm hover:underline line-clamp-1"
				>
					{item.title}
				</Link>
				<div className="text-sm text-muted-foreground mt-1">
					${item.price} × {item.quantity}
				</div>
				<div className="flex items-center gap-2 mt-2">
					<Button
						variant="outline"
						size="icon"
						className="h-6 w-6"
						onClick={() =>
							updateQuantity(item.productId, Math.max(1, item.quantity - 1))
						}
						disabled={item.quantity <= 1}
					>
						<Minus className="h-3 w-3" />
					</Button>
					<span className="text-sm w-4 text-center">{item.quantity}</span>
					<Button
						variant="outline"
						size="icon"
						className="h-6 w-6"
						onClick={() => updateQuantity(item.productId, item.quantity + 1)}
					>
						<Plus className="h-3 w-3" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="h-6 w-6 ml-auto text-destructive"
						onClick={() => removeItem(item.productId)}
					>
						<Trash2 className="h-3 w-3" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default memo(CartDrawerItem);
