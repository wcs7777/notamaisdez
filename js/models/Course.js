import Section from './Section.js';
import Subject from './Subject.js';
import infos from './infosType.js';

export default class Course extends Section {
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
			infos.course,
			Subject,
			contents,
			createdIn,
			modifiedIn
		);
	}

	allContentDetails() {
		let lessonsTotal = 0;
		let notesTotal = 0;
		for (const subject of this.contents) {
			lessonsTotal += subject.contents.length;
			for (const lesson of subject.contents) {
				notesTotal += lesson.contents.length;
			}
		}
		return [
			this.contentDetail(),
			infos.subject.quantityFormat(lessonsTotal),
			infos.lesson.quantityFormat(notesTotal)
		];
	}
}
