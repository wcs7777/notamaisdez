export { formatDate };

function formatDate(date) {
	const [year, month, day] = date.toISOString().slice(0, 10).split('-');
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	return `${day}/${month}/${year} - ${hours}:${minutes}`;
}
