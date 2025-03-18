import CartDrawer from "@/components/features/cart/CartDrawer";
import Link from "next/link";
import React from "react";

const Navbar = () => {
	return (
		<header className="border-b fixed top-0 left-0 right-0 z-10 bg-white shadow-xs">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<Link href="/" className="flex items-center gap-2">
					<span className="text-xl font-bold">out2win challenge</span>
				</Link>

				<CartDrawer />
			</div>
		</header>
	);
};

export default Navbar;
