import Valid from './Valid.js';
import { formatDate } from '../utils/date.js';

const min = 1;
const max = 40;
const rangeMessage = `O nome deve ter entre ${min} à ${max} caracteres!`;
const repeatedMessage = 'Esse nome já está sendo usado, informe outro!';
const notFound = ' não foi encontrado!';

function range(name) {
	return (min <= name.length && name.length <= max);
}

function unique(section, name) {
	return !section.findContent(name);
}

function equals(leftStr, rightStr) {
	return (leftStr.toLocaleLowerCase() === rightStr.toLocaleLowerCase());
}

export default class Section {
	constructor(
		name,
		recipient,
		infos,
		contentClass=Object,
		contents=[],
		createdIn=new Date(),
		modifiedIn=new Date()
	) {
		this.name = name;
		this.recipient = recipient;
		this.infos = infos;
		this.contentClass = contentClass;
		this.contents = contents;
		this.createdIn = createdIn;
		this.modifiedIn = modifiedIn;
	}

	validEditContent(index, newName) {
		return Valid.all([
			new Valid(range(newName)).no(() => rangeMessage),
			new Valid(
				equals(this.contents[index].name, newName) ||
				unique(this, newName)
			).no(() => repeatedMessage)
		]).yes(() => newName);
	}

	editContent(index, newName) {
		const content = this.contents[index];
		return this.modification(() => content.name = newName, content);
	}

	contentName() {
		return this.infos.singular;
	}

	validAddContent(content) {
		return Valid.all([
			new Valid(range(content.name)).no(() => rangeMessage),
			new Valid(unique(this, content.name)).no(() => repeatedMessage)
		]).yes(() => content)
	}

	addContent(content) {
		this.modification(() => this.contents.push(content));
		return content;
	}

	validCreateContent(name, contents=[]) {
		return this.validAddContent(
			new this.contentClass(name, this, contents)
		);
	}

	createContent(name, contents=[]) {
		return this.addContent(
			new this.contentClass(name, this, contents)
		);
	}

	validRemoveContent(index) {
		return new Valid(this.contents[index] !== 'undefined')
			.yes(() => index)
			.no(() => `${this.contentName()}${notFound}`);
	}

	removeContent(index) {
		return this.modification(() => this.contents.splice(index, 1));
	}

	modification(task, content=undefined) {
		if (content) {
			content.modifiedIn = new Date();
		}
		this.modifiedIn = new Date();
		return task();
	}

	findContent(name) {
		return this.contents.find(c => {
			return equals(c.name, name);
		});
	}

	details() {
		return [
			this.name,
			`Criado em: ${formatDate(this.createdIn)}`,
			`Modificado em: ${formatDate(this.modifiedIn)}`,
			...this.allContentDetails()
		];
	}

	contentDetail() {
		return this.infos.quantityFormat(this.contents.length);
	}

	/* override */
	allContentDetails() {
		return [this.contentDetail()];
	}

	isFirstSection() {
		return false;
	}

	isLastSection() {
		return false;
	}
}
