import type { Product } from "./product";

export type CartItem = Pick<
	Product,
	"price" | "title" | "thumbnail" | "brand" | "category"
> & {
	productId: number;
	quantity: number;
};

export interface CartState {
	items: Record<number, CartItem>;
	addItem: (product: Product, quantity?: number) => void;
	removeItem: (productId: number) => void;
	updateQuantity: (productId: number, quantity: number) => void;
	clearCart: () => void;
}
