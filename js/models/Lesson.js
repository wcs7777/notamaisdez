import infos from './infosType.js';
import Section from './Section.js';
import Note from './Note.js';

export default class Lesson extends Section {
	constructor(
		name,
		recipient,
		contents=[],
		createdIn=new Date(),
		modifiedIn=new Date()
	) {
		super(
			name,
			recipient,
			infos.lesson,
			Note,
			contents,
			createdIn,
			modifiedIn
		);
	}

	createContent(name, text='') {
		return super.createContent(name, text.trim());
	}

	editContent(index, newName, text='') {
		this.contents[index].contents = text;
		return super.editContent(index, newName);
	}
}
