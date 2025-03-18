import { toast } from "sonner";

export const catchError = (error: unknown) => {
	const message = error instanceof Error ? error.message : error;

	console.error("error", message);
	toast.error("An error occurred. Please try again later.", {
		description: message as string,
	});
};
