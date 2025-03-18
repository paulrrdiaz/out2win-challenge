"use client";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store";
import { ShoppingCart, XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useShallow } from "zustand/react/shallow";
import CartDrawerItem from "./CartDrawerItem";

const CartDrawer = () => {
	const totalItems = useCartStore(
		useShallow((state) =>
			Object.values(state.items).reduce((acc, item) => acc + item.quantity, 0),
		),
	);
	const items = useCartStore(useShallow((state) => state.items));
	const subtotal = useCartStore(
		useShallow((state) =>
			Object.values(state.items).reduce(
				(acc, item) => acc + item.price * item.quantity,
				0,
			),
		),
	);
	const clearCart = useCartStore((state) => state.clearCart);

	return (
		<Drawer direction="right">
			<DrawerTrigger>
				<Button variant="outline" size="icon" className="relative">
					<ShoppingCart className="h-5 w-5" />

					<span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
						{totalItems ?? 0}
					</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent className="!max-w-none !w-[420px]">
				<DrawerClose>
					<Button
						variant="ghost"
						size="icon"
						className="absolute top-2 right-2 rounded-full"
					>
						<XIcon className="h-5 w-5" />
					</Button>
				</DrawerClose>
				<DrawerHeader>
					<DrawerTitle className="text-xl flex items-center">
						<ShoppingCart className="mr-2 h-5 w-5" />
						Cart
					</DrawerTitle>
					<DrawerDescription className="overflow-y-auto">
						<h3 className="text-lg font-medium">
							{totalItems} {totalItems === 1 ? "item" : "items"}
						</h3>
						<div>
							{Object.values(items).length === 0 ? (
								<div className="text-center py-6">
									<p className="text-muted-foreground">Your cart is empty</p>
								</div>
							) : (
								<ScrollArea className="h-full max-h-[calc(100vh-220px)] overflow-scroll pr-4">
									{Object.values(items).map((item) => (
										<CartDrawerItem key={item.productId} item={item} />
									))}
								</ScrollArea>
							)}
						</div>
					</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter>
					{Object.values(items).length > 0 && (
						<div className="flex-col">
							<Separator className="mb-3" />
							<div className="flex justify-between w-full mb-4">
								<span>Subtotal</span>
								<span className="font-medium">${subtotal.toFixed(2)}</span>
							</div>
							<div className="flex gap-2 w-full">
								<Button
									variant="outline"
									size="sm"
									className="flex-1"
									onClick={clearCart}
								>
									Clear
								</Button>
								<Button size="sm" className="flex-1" asChild>
									<DrawerClose asChild>
										<Link href="/cart">View Cart</Link>
									</DrawerClose>
								</Button>
							</div>
						</div>
					)}
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default CartDrawer;
