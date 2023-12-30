const fuzzySearch = <T extends Record<string, any>>(items: T[], query: string): T[] => {

		let search = query.toLowerCase().split(' ');

	return items.reduce((found: T[], item: T) => {
		let matches = 0;
		search.forEach((s) => {
			let props = 0;
			for (const prop in item) {
				// Ensure propValue is a string and avoid calling indexOf on undefined
				let propValue = item[prop]?.toString().toLowerCase() ?? "";
				if (propValue.indexOf(s) > -1) {
					props++;
				}
			}
			if (props >= 1) {
				matches++;
			}
		});
		if (matches === search.length) {
			found.push(item);
		}
		return found;
	}, []);
};

export default fuzzySearch;
