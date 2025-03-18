"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/store";
import { Separator } from "@radix-ui/react-separator";
import { ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useReward } from "react-rewards";

const CartDetails = () => {
	const { reward } = useReward("checkout-button", "confetti");
	const items = useCartStore((state) => state.items);
	const cart = Object.values(items);
	const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
	const subtotal = cart.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);
	const tax = subtotal * 0.1;
	const shipping = subtotal > 0 ? 10 : 0;
	const total = subtotal + tax + shipping;
	const updateQuantity = useCartStore((state) => state.updateQuantity);
	const removeItem = useCartStore((state) => state.removeItem);
	const clearCart = useCartStore((state) => state.clearCart);

	if (cart.length === 0) {
		return (
			<div className="container mx-auto py-10 px-4">
				<h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
				<div className="flex flex-col items-center justify-center py-12">
					<ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
					<h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
					<p className="text-muted-foreground mb-6">
						Looks like you haven{"'"}t added anything to your cart yet.
					</p>
					<Button asChild>
						<Link href="/">Browse Products</Link>
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-10 px-4">
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-3xl font-bold">Shopping Cart</h1>
				<Button variant="ghost" asChild>
					<Link href="/" className="flex items-center">
						<ChevronLeft className="mr-2 h-4 w-4" />
						Continue Shopping
					</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					<Card>
						<CardHeader className="pb-3">
							<CardTitle>Cart Items ({totalItems})</CardTitle>
						</CardHeader>
						<CardContent>
							<ScrollArea className="h-full max-h-[600px] overflow-scroll pr-4">
								<div className="space-y-6">
									{cart.map((item) => (
										<div
											key={item.productId}
											className="flex flex-col sm:flex-row gap-4 pb-6 border-b"
										>
											<div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-md overflow-hidden flex-shrink-0">
												<Image
													src={item.thumbnail || "/placeholder.svg"}
													alt={item.title}
													fill
													className="object-cover"
												/>
											</div>
											<div className="flex-1 flex flex-col">
												<div className="flex flex-col sm:flex-row sm:justify-between gap-2">
													<div>
														<Link
															href={`/products/${item.productId}`}
															className="font-medium text-lg hover:underline line-clamp-1"
														>
															{item.title}
														</Link>
														<p className="text-sm text-muted-foreground mt-1">
															{item.brand}
														</p>
														<Badge className="mt-2">{item.category}</Badge>
													</div>
													<div className="text-lg font-semibold">
														${item.price}
													</div>
												</div>

												<div className="flex items-center justify-between mt-auto pt-4">
													<div className="flex items-center">
														<Button
															variant="outline"
															size="icon"
															className="h-8 w-8"
															onClick={() =>
																updateQuantity(
																	item.productId,
																	Math.max(1, item.quantity - 1),
																)
															}
															disabled={item.quantity <= 1}
														>
															<Minus className="h-4 w-4" />
														</Button>
														<Input
															type="number"
															min="1"
															value={item.quantity}
															onChange={(e) => {
																const value = Number.parseInt(e.target.value);
																if (!isNaN(value) && value > 0) {
																	updateQuantity(item.productId, value);
																}
															}}
															className="h-8 w-14 mx-2 text-center"
														/>
														<Button
															variant="outline"
															size="icon"
															className="h-8 w-8"
															onClick={() =>
																updateQuantity(
																	item.productId,
																	item.quantity + 1,
																)
															}
														>
															<Plus className="h-4 w-4" />
														</Button>
													</div>
													<div className="flex items-center gap-4">
														<div className="text-lg font-semibold">
															${(item.price * item.quantity).toFixed(2)}
														</div>
														<Button
															variant="ghost"
															size="icon"
															className="h-8 w-8 text-destructive"
															onClick={() => removeItem(item.productId)}
														>
															<Trash2 className="h-4 w-4" />
														</Button>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</ScrollArea>
						</CardContent>
						<CardFooter>
							<Button variant="outline" className="w-full" onClick={clearCart}>
								Clear Cart
							</Button>
						</CardFooter>
					</Card>
				</div>

				<div>
					<Card>
						<CardHeader>
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex justify-between">
									<span className="text-muted-foreground">Subtotal</span>
									<span>${subtotal.toFixed(2)}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Tax (10%)</span>
									<span>${tax.toFixed(2)}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Shipping</span>
									<span>${shipping.toFixed(2)}</span>
								</div>
								<Separator />
								<div className="flex justify-between font-semibold text-lg">
									<span>Total</span>
									<span>${total.toFixed(2)}</span>
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex flex-col gap-4">
							<Button
								onClick={reward}
								className="w-full"
								id="checkout-button"
								size="lg"
							>
								Proceed to Checkout
							</Button>
							<div className="text-sm text-center text-muted-foreground">
								Secure checkout powered by Stripe
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default CartDetails;
