import ProductsTable from "@/components/features/products/ProductsTable";
import { Suspense } from "react";

export default async function Home() {
	return (
		<div className="max-w-5xl mx-auto p-4">
			<Suspense fallback={<div>Loading...</div>}>
				<ProductsTable />
			</Suspense>
		</div>
	);
}
