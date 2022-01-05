import Section from './Section.js';
import Course from './Course.js';
import infos from './infosType.js';

export default class Container extends Section {
	constructor(
		recipient=undefined,
		contents=[],
		createdIn=new Date(),
		modifiedIn=new Date()
	) {
		super(
			'Cursos',
			recipient,
			infos.container,
			Course,
			contents,
			createdIn,
			modifiedIn
		);
	}

	isFirstSection() {
		return true;
	}
}
