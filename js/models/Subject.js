import Section from './Section.js';
import Lesson from './Lesson.js';
import infos from './infosType.js';

export default class Subject extends Section {
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
			infos.subject,
			Lesson,
			contents,
			createdIn,
			modifiedIn
		);
	}

	allContentDetails() {
		let notesTotal = 0;
		for (const lesson of this.contents) {
			notesTotal += lesson.contents.length;
		}
		return [
			this.contentDetail(),
			infos.lesson.quantityFormat(notesTotal)
		];
	}
}
