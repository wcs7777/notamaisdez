export default {
	container: infos('Curso', 'cursos', 'o'),
	course: infos('Matéria', 'matérias', 'a'),
	subject: infos('Aula', 'aulas', 'a'),
	lesson: infos('Anotação', 'anotações', 'a'),
	note: infos('Palavra', 'palavras', 'a')
};

function infos(
	singular,
	plural,
	article
) {
	return {
		singular,
		plural,
		article,
		quantityFormat(quantity) {
			let name = (quantity > 1)? plural : singular;
			name = name.toLocaleLowerCase();
			return `${quantity} ${name}`;
		}
	};
}
