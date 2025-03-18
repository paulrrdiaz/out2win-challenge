"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import React, { type PropsWithChildren } from "react";
// import ReactScan from "./ReactScan";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

const Providers = (props: PropsWithChildren) => {
	const { children } = props;

	return (
		<NuqsAdapter>
			<QueryClientProvider client={queryClient}>
				{/* <ReactScan /> */}
				{children}
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</NuqsAdapter>
	);
};

export default Providers;
