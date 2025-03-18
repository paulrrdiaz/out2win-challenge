import { type UseQueryStateOptions, parseAsInteger, useQueryState } from "nuqs";
import { useMemo } from "react";

const usePagination = () => {
	const queryStateOptions = useMemo<
		Omit<UseQueryStateOptions<string>, "parse">
	>(() => {
		return {
			history: "replace",
			scroll: false,
			shallow: true,
		};
	}, []);
	const [page, setPage] = useQueryState(
		"page",
		parseAsInteger.withOptions(queryStateOptions).withDefault(1),
	);
	const [perPage, setPerPage] = useQueryState(
		"perPage",
		parseAsInteger.withOptions(queryStateOptions).withDefault(5),
	);

	return { page, setPage, perPage, setPerPage };
};

export default usePagination;
