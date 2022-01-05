import randomInt from '../utils/randomInt.js';
import Student from './Student.js';
import Container from './Container.js';
import Valid from './Valid.js';

const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const invalidEmailMessage = 'Informe um e-mail válido!';
const emailUnfilledMessage = 'Informe o e-mail!';
const invalidLoginMessage = 'E-mail e/ou senha inválidos!';

function filled(field) {
	return (field.length > 0);
}

function isInEmailFormat(email) {
	return regexEmail.test(String(email).toLowerCase());
}

function unique(students, email) {
	return !students.find(email);
}

function exists(students, email) {
	return !unique(students, email);
}

export default class Students {
	constructor(studentsArray=[]) {
		this.array = studentsArray;
		this.confirmCode = '';
	}

	validRegister(email, password) {
		return Valid.all([
			this.validNewEmail(email), Student.validNewPassword(password)
		]).yes(() => [email, password]);
	}

	validNewEmail(newEmail) {
		const email = newEmail.toLowerCase();
		return Valid.all([
			new Valid(filled(email)).no(() => emailUnfilledMessage),
			new Valid(isInEmailFormat(email)).no(() => invalidEmailMessage),
			new Valid(unique(this, email))
				.no(() => 'Este e-mail já está cadastrado!')
		]).yes(() => email);
	}

	register(email, password) {
		return this.add(
			new Student(email.toLowerCase(), password), new Container()
		);
	}

	add(student) {
		this.array.push(student);
		return student;
	}

	validLogin(email, password) {
		let student = undefined;
		return Valid.all([
			new Valid(student = this.find(email.toLowerCase())),
			(student)? student.validCurrentPassword(password) : new Valid(false)
		]).no(() => invalidLoginMessage);
	}

	validEmailLogin(email) {
		const e = email.toLowerCase();
		return Valid.all([
			new Valid(filled(e)).no(() => emailUnfilledMessage),
			new Valid(isInEmailFormat(email)).no(() => invalidEmailMessage),
		]).yes(() => e);
	}

	validEmailRecoveryPassword(email) {
		const e = email.toLowerCase();
		return Valid.all([
			this.validEmailLogin(e),
			new Valid(exists(this, e)).no(() => 'Este e-mail não está cadastrado!')
		]);
	}

	validPasswordLogin(password) {
		return new Valid(filled(password)).no(() => 'Informe a senha!');
	}

	find(email) {
		const e = email.toLowerCase();
		return this.array.find(i => i.email === e);
	}

	validConfirmCode(code) {
		return Valid.all([
			new Valid(code.length === this.confirmCode.length)
				.no(() => 'Informe o código!'),
			new Valid(code === this.confirmCode).no(() => 'Código inválido!')
		]);
	}

	generateConfirmCode(n=4) {
		const codes = [];
		for (let i = 0; i < n; i++) {
			codes.push(randomInt(0, 9));
		}
		this.confirmCode = codes.join('');
		console.log(this.confirmCode);
	}
}
