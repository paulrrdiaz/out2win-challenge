import { Toaster } from "@/components/ui/sonner";
import React, { type PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Providers from "./Providers";

const MainLayout = (props: PropsWithChildren) => {
	const { children } = props;

	return (
		<Providers>
			<div className="pt-16">
				<Navbar />
				{children}
			</div>
			<Toaster />
		</Providers>
	);
};

export default MainLayout;
