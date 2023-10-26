export const groupTickers = (groupBy, data) => {
	return data.reduce((acc, curr) => {
		if (!acc[curr[groupBy]]) {
			acc[curr[groupBy]] = [];
		}
		acc[curr[groupBy]].push(curr);
		return acc;
	}, {});
};
