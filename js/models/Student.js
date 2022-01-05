import Valid from './Valid.js';

const min = 6;
const max = 20;
const rangeMessage = `A senha deve ter entre ${min} à ${max} caracteres!`;

function range(password) {
	return (min <= password.length && password.length <= max);
}

function filled(field) {
	return (field.length > 0);
}

function same(left, right) {
	return (left === right);
}

export default class Student {
	constructor(email, password, container) {
		this.email = email;
		this.password = password;
		this.container = container;
	}

	validChangePassword(current, newPassword, confirm) {
		return Valid.all([
			this.validCurrentPassword(current),
			Student.validNewPassword(newPassword, 'nova senha'),
			Student.validConfirmPassword(newPassword, confirm)
		]).yes(() => newPassword);
	}

	validCurrentPassword(current) {
		return Valid.all([
			new Valid(filled(current)).no(() => 'Informe a senha!'),
			new Valid(same(current, this.password)).no(() => 'Senha incorreta!')
		]);
	}

	static validNewPassword(newPassword, end='senha') {
		return Valid.all([
			new Valid(filled(newPassword)).no(() => `Informe a ${end}!`),
			new Valid(range(newPassword)).no(() => rangeMessage)
		]);
	}

	static validConfirmPassword(newPassword, confirm) {
		return Valid.all([
			new Valid(filled(confirm)).no(() => 'Confirme a nova senha!'),
			new Valid(same(newPassword, confirm))
				.no(() => 'As senhas não correspondem')
		]);
	}

	changePassword(newPassword) {
		this.password = newPassword;
		return this.password;
	}
}
