import { config } from "$lib/config";

const formatDate = (date: string | number | Date): string => {
	return new Date(date).toLocaleDateString(config.locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
};

export default formatDate;
