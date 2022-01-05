import randomStudent from '../test/randomStudent.js';
import Students from '../models/Students.js';

export { students, student };

const random = randomStudent();
const students = new Students([random]);
const student = random;
