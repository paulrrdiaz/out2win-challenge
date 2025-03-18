import { type UseQueryStateOptions, parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";

const useSorting = () => {
	const queryStateOptions = useMemo<
		Omit<UseQueryStateOptions<string>, "parse">
	>(() => {
		return {
			history: "replace",
			scroll: false,
			shallow: true,
		};
	}, []);
	const [sorting, setSorting] = useQueryState(
		"sorting",
		parseAsString.withOptions(queryStateOptions).withDefault("[]"),
	);

	return { sorting: JSON.parse(sorting), setSorting };
};

export default useSorting;
