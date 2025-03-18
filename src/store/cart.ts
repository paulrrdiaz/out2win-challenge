import type { CartState } from "@/schemas/cart";
import type { Product } from "@/schemas/product";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create<CartState>()(
	persist(
		(set) => ({
			items: {},
			addItem: (product: Product, quantity = 1) => {
				set((state) => {
					const existingItem = state.items[product.id];

					if (existingItem) {
						return {
							items: {
								...state.items,
								[product.id]: {
									...existingItem,
									quantity: existingItem.quantity + quantity,
								},
							},
						};
					}

					return {
						items: {
							...state.items,
							[product.id]: {
								productId: product.id,
								price: product.price,
								title: product.title,
								thumbnail: product.thumbnail,
								brand: product.brand,
								category: product.category,
								quantity,
							},
						},
					};
				});
			},
			removeItem: (productId: number) => {
				set((state) => ({
					items: Object.fromEntries(
						Object.entries(state.items).filter(([id]) => +id !== productId),
					),
				}));
			},
			updateQuantity: (productId: number, quantity: number) => {
				set((state) => ({
					items: Object.fromEntries(
						Object.entries(state.items).map(([id, item]) => {
							if (+id === productId) {
								return [id, { ...item, quantity }];
							}
							return [id, item];
						}),
					),
				}));
			},
			clearCart: () => {
				set({ items: {} });
			},
		}),
		{
			name: "cart-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
