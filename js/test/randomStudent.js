import Student from '../models/Student.js';
import randomContainer from './randomContainer.js';

export default function randomStudent() {
	return new Student(
		'estudante@email.com', 'senhadificil', randomContainer()
	);
}
