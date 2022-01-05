import Section from './Section.js';
import Valid from './Valid.js';
import infos from './infosType.js';

export default class Note extends Section {
	constructor(
		name,
		recipient,
		contents='',
		createdIn=new Date(),
		modifiedIn=new Date()
	) {
		super(
			name,
			recipient,
			infos.note,
			Object,
			contents,
			createdIn,
			modifiedIn
		);
	}

	static validText(text) {
		return new Valid(text.trim().length > 0).no(() => 'Faça alguma anotação');
	}

	addContent(text) {
		return this.modification(() => {
			this.contents = `${this.contents}${text}`;
		});
	}

	createContent(text) {
		return this.addContent(text);
	}

	removeContent(subStr) {
		return this.modification(() => {
			this.contents = this.contents.replaceAll(subStr, '');
		});
	}

	findContent(text) {
		return this.contents.search(text);
	}

	contentDetail() {
		if (this.contents.length <= 120) {
			return this.contents;
		} else {
			return `${this.contents.slice(0, 117)}...`;
		}
	}

	allContentDetails() {
		const lesson = this.recipient;
		const subject = lesson.recipient;
		const course = subject.recipient;
		return [
			`Curso: ${course.name}`,
			`Matéria: ${subject.name}`,
			`Aula: ${lesson.name}`,
		];
	}

	isLastSection() {
		return true;
	}
}
