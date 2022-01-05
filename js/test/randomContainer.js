import Container from '../models/Container.js';
import Course from '../models/Course.js';
import Subject from '../models/Subject.js';
import Lesson from '../models/Lesson.js';
import Note from '../models/Note.js';
import randomInt from './randomInt.js';
import randomText from './randomText.js';
import randomDates from './randomDates.js';

export default function randomContainer() {
	const nm = 'ABCDEFGHIJKLMNOP ';
	const { firstDate, secondDate } = randomDates();
	const courses = [];
	const container = new Container(undefined, courses, firstDate, secondDate);
	for (let i = 0; i < randomInt(4, 10); i++) {
		const subjects = [];
		const { firstDate, secondDate } = randomDates();
		courses.push(
			new Course(
				`Curso ${nm[i]}`,
				container,
				subjects,
				firstDate,
				secondDate
			)
		);
		for (let j = 0; j < randomInt(4, 9); j++) {
			const lessons = [];
			const { firstDate, secondDate } = randomDates();
			subjects.push(
				new Subject(
					`Matéria ${nm[i]}${nm[j]}`,
					courses[i],
					lessons,
					firstDate,
					secondDate
				)
			);
			for (let k = 0; k < randomInt(8, 13); k++) {
				const notes = [];
				const { firstDate, secondDate } = randomDates();
				lessons.push(
					new Lesson(
						`Aula ${nm[i]}${nm[j]}${nm[k]}`,
						subjects[j],
						notes,
						firstDate,
						secondDate
					)
				);
				for (let l = 0; l < randomInt(2, 5); l++) {
					const { firstDate, secondDate } = randomDates();
					notes.push(
						new Note(
							`Anotação ${nm[i]}${nm[j]}${nm[k]}${nm[l]}`,
							lessons[k],
							randomText(),
							firstDate,
							secondDate
						)
					);
				}
			}
		}
	}
	return container;
}
