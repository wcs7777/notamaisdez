export default async function interval(stopCondition, ms) {
	return await new Promise(resolve => {
		const intervalNumber = setInterval(() => {
			if (stopCondition()) {
				resolve();
				clearInterval(intervalNumber);
			}
		}, ms);
	});
}
