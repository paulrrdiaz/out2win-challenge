"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/schemas/product";
import { useCartStore } from "@/store";
import { ChevronLeft, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type ProductDetailsProps = {
	product: Product;
};

const ProductDetails = (props: ProductDetailsProps) => {
	const { product } = props;
	const router = useRouter();
	const [activeImage, setActiveImage] = useState(0);
	const items = useCartStore((state) => state.items);
	const quantity = items[product.id]?.quantity ?? 0;
	const addItem = useCartStore((state) => state.addItem);

	return (
		<div className="container mx-auto px-8 mb-4">
			<div className="py-4">
				<Button variant="ghost" onClick={() => router.back()}>
					<ChevronLeft className="mr-2 h-4 w-4" /> Back to Products
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<div className="relative aspect-square overflow-hidden rounded-lg border">
						<Image
							src={product.images[activeImage] || "/placeholder.svg"}
							alt={product.title}
							fill
							className="object-cover"
							priority
						/>
					</div>
					<div className="flex gap-2 mt-4 overflow-x-auto justify-center pb-2">
						{product.images.map((image, index) => (
							<button
								key={image}
								className={`relative h-20 w-20 overflow-hidden rounded-md border ${
									activeImage === index ? "ring-2 ring-primary" : ""
								}`}
								onClick={() => setActiveImage(index)}
							>
								<Image
									src={image || "/placeholder.svg"}
									alt={`${product.title} ${index + 1}`}
									fill
									className="object-cover"
								/>
							</button>
						))}
					</div>
				</div>

				<div className="space-y-4">
					<div className="flex justify-between items-start">
						<div>
							<h1 className="text-3xl font-bold">{product.title}</h1>
							<div className="flex items-center gap-2 mt-2">
								<div className="flex">
									{Array.from({ length: 5 }).map((_, i) => (
										<Star
											key={i}
											className={`h-5 w-5 ${
												i < Math.round(product.rating)
													? "fill-primary text-primary"
													: "fill-muted text-muted-foreground"
											}`}
										/>
									))}
								</div>
								<span className="text-sm text-muted-foreground">
									({product.rating})
								</span>
							</div>
						</div>
						<Badge>{product.category}</Badge>
					</div>

					<div className="flex items-baseline gap-2">
						<span className="text-3xl font-bold">${product.price}</span>
						{product.discountPercentage > 0 && (
							<>
								<span className="text-lg text-muted-foreground line-through">
									$
									{Math.round(
										product.price / (1 - product.discountPercentage / 100),
									)}
								</span>
								<Badge variant="destructive" className="ml-2">
									{Math.round(product.discountPercentage)}% OFF
								</Badge>
							</>
						)}
					</div>

					<p className="text-muted-foreground">{product.description}</p>

					<div className="pt-4">
						<div className="flex items-center gap-2 text-sm mb-2">
							<span
								className={
									product.stock > 0 ? "text-green-600" : "text-red-600"
								}
							>
								{product.stock > 0
									? `In Stock (${product.stock})`
									: "Out of Stock"}
							</span>
						</div>
						<div className="relative inline-block w-full md:w-auto">
							<Button
								size="lg"
								className="w-full md:w-auto"
								disabled={product.stock <= 0}
								onClick={() => {
									addItem(product);
								}}
							>
								Add to Cart
							</Button>

							{quantity > 0 && (
								<span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-stone-500 text-xs text-primary-foreground">
									{quantity}
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
