import { fieldElements } from '../utils/elementFunctions.js';
import { closeModal } from '../components/modal.js';
import { student } from './students.js';
import Student from '../models/Student.js';
import Valid from '../models/Valid.js';
import { inputFeedback } from './form.js';

const inputs = {
	'current-password': currentPasswordInput,
	'new-password': newPasswordInput,
	'confirm-password': confirmPasswordInput
};

export default {
	form: changePasswordForm,
	inputs
};

let newPassword = '';

function changePasswordForm(form, event) {
	return Valid.all(
		Object.keys(inputs).map(inputName => {
			const field = fieldElements(inputName, form);
			return inputFeedback(
				inputs[inputName](fieldElements(inputName, form)),
				field
			);
		})
	).yes(() => {
		student.changePassword(newPassword);
		closeModal();
		return 'password changed';
	});
}

function currentPasswordInput(field) {
	return student.validCurrentPassword(field.input.value);
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
