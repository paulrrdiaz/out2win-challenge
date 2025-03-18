import ProductDetails from "@/components/features/products/ProductDetails";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/services/products";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import React from "react";

const ProductDetailPage = async ({
	params,
}: {
	params: Promise<{ productId: string }>;
}) => {
	const { productId } = await params;
	const getCachedProduct = unstable_cache(
		async (id) => getProductById(id),
		[productId],
		{
			tags: ["products"],
			revalidate: 60,
		},
	);

	const product = await getCachedProduct(productId);

	if (!product) {
		return (
			<div className="container mx-auto py-10">
				<h1 className="text-2xl font-bold">Product not found</h1>
				<Button asChild className="mt-4">
					<Link href="/">Back to Products</Link>
				</Button>
			</div>
		);
	}

	return <ProductDetails product={product} />;
};

export default ProductDetailPage;
