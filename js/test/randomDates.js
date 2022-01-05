import randomInt from './randomInt.js';

export default function randomDates() {
	const first = randomInt(-5, -90);
	const second = randomInt(-5, first);
	const firstDate = new Date();
	const secondDate = new Date();
	firstDate.setDate(first);
	secondDate.setDate(second);
	return { firstDate, secondDate };
}
