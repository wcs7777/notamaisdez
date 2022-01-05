import { fieldElements } from '../utils/elementFunctions.js';
import { student } from './students.js';
import Student from '../models/student.js';
import Valid from '../models/Valid.js';
import { inputFeedback } from './form.js';

const inputs = {
	'new-password': newPasswordInput,
	'confirm-password': confirmPasswordInput
};

export default {
	form: resetPasswordForm,
	inputs
};

let newPassword = '';

function resetPasswordForm(form, event) {
	return Valid.all(
		Object.keys(inputs).map(inputName => {
			return inputs[inputName](fieldElements(inputName, form));
		})
	).yes(() => {
		student.changePassword(fieldElements('new-password', form).input.value);
		window.location.href = form.action;
		return false;
	});
}

function newPasswordInput(field) {
	newPassword = field.input.value;
	return inputFeedback(
		Student.validNewPassword(newPassword, 'nova senha'),
		field
	);
}

function confirmPasswordInput(field) {
	return inputFeedback(
		Student.validConfirmPassword(newPassword, field.input.value),
		field
	);
}
